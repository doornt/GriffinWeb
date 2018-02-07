const nodeTemplate = {
    "name": "string",
    "attributes": "array",
    "children": "array",
    "id": 'number',
    "parentId": "number"
}

var detect = require('acorn-globals');
var acorn = require('acorn');
var walk = require('acorn/dist/walk');

class Generate {


    bufferChildren(parentId) {
        this.buf.push(`if(${!!parentId} && pug_idMap[${parentId}]){`)
        this.buf.push(`pug_idMap[${parentId}].children = pug_idMap[${parentId}].children || []`)
        this.buf.push(`pug_idMap[${parentId}].children.push(n)`)
        this.buf.push(`n.parentId = ${parentId}`)
        this.buf.push(`}`)
    }

    visit(node, parentId = null) {
        if (!node) {
            return console.error("node empty")
        }

        if (!this['visit' + node.type]) {
            return console.error("type unresolved!")
        }

        this.visitNode(node, parentId)

    }

    visitNode(node, parentId) {
        this['visit' + node.type](node, parentId)
    }


    constructor(ast) {
        this.ast = ast
        this.buf = []
    }

    nextId(){
        this.id = this.id? (this.id + 1) : 1000
        return this.id
    }

    compile() {

        let exclude = ["Object", "pug_idMap", "n", 'pug_interp']
        this.visit(this.ast)
        this.resetText()
        
        this.buf.push(`let res = Object.keys(pug_idMap).map(key=>pug_idMap[key]).filter(obj=>!obj.parentId);\nreturn res;
        `)
        let js = this.buf.join(';\n')

        var vars = detect(js).map(function (global) {
                return global.name;
            })
            .filter(function (v) {
                return exclude.indexOf(v) === -1 &&
                    v !== 'undefined' &&
                    v !== 'this'
            })
        
        let runtimeJs = `function template({${vars.join(',')}}) {var n = "",attrs=[],pug_interp, pug_idMap = {};` + js + ";}";

        return runtimeJs
    }

    resetText(){
        this.buf.push(`Object.keys(pug_idMap).map(k=>{
            if(!pug_idMap[k]){
                return;
            }
            let children = (pug_idMap[k].children || []);
            let texts = children.filter(o=>o.name == 'text')
            if(texts.length == children.length){
                let val = texts.map(t=>t.val).join('')
                pug_idMap[k].val = val;
                pug_idMap[k].name = 'label';
                pug_idMap[k].children = [];
                texts.map(text=>{
                    text.parentId = null;
                    delete pug_idMap[text.id];
                })
            }
        })`)
    }

    visitBlock(block, parentId) {
        for (var i = 0; i < block.nodes.length; ++i) {
            this.visit(block.nodes[i], parentId);
        }
    }

    visitTag(tag, parentId) {
        if (tag.name == "style") {
            return
        }
        var node = {
            name: tag.name,
            id: this.nextId()
        }
        let attributes = []
        node.attributes = attributes
        this.buf.push(`n = ${JSON.stringify(node)}`)
        this.buf.push("attrs=[]")
        for (let attr of tag.attrs) {
            this.buf.push(`attrs.push({name: "${attr.name}",val: ${attr.val}})`)
        }
        this.buf.push(`n.attributes = attrs`)
        this.buf.push(`pug_idMap[${node.id}] = n `)
        parentId && this.bufferChildren(parentId)
        if (!tag.selfClosing) {
            this.visit(tag.block, node.id);
        }
    }

    visitText(text, parentId) {
        var node = {
            name: "text",
            val: text.val,
            id: this.nextId()
        }
        this.buf.push(`n = ${JSON.stringify(node)}`)
        // get attributes from parent exclude layout attributes
        this.buf.push(`n.attributes = pug_idMap[${parentId}].attributes`)

        this.bufferChildren(parentId)

        // remove parent node... maybe has bug here
        // check this in parent's visit!!
        // this.buf.push(`var parent_node = pug_idMap["${parentId}"]`)
        // this.buf.push(`if(parent_node.parentId && pug_idMap[parent_node.parentId]){`)
        // this.buf.push(`pug_idMap[parent_node.parentId].children = pug_idMap[parent_node.parentId].children.filter((child)=>{
        //     return child.id !== "${parentId}"
        // })`)
        // this.buf.push(`pug_idMap[parent_node.parentId].children.push(n)`)
        // this.buf.push(`} else {`)
        // this.buf.push(`pug_idMap["${node.id}"] = n`)
        // this.buf.push(`}`)
        // this.buf.push(`n.parentId = parent_node.parentId`)
        // this.buf.push(`delete pug_idMap["${parentId}"]`)
    }

    visitConditional(cond, parentId) {
        var test = cond.test;
        this.buf.push('if (' + test + ') {');
        this.visit(cond.consequent, parentId);
        this.buf.push('}')
        if (cond.alternate) {
            if (cond.alternate.type === 'Conditional') {
                this.buf.push('else')
                this.visitConditional(cond.alternate, parentId);
            } else {
                this.buf.push('else {');
                this.visit(cond.alternate, parentId);
                this.buf.push('}');
            }
        }
    }

    visitEach(each, parentId) {
        var indexVarName = each.key || 'pug_index' + this.eachCount;
        this.eachCount++;

        this.buf.push('' +
            '// iterate ' + each.obj + '\n' +
            ';(function(){\n' +
            '  var $$obj = ' + each.obj + ';\n' +
            '  if (\'number\' == typeof $$obj.length) {');

        if (each.alternate) {
            this.buf.push('    if ($$obj.length) {');
        }

        this.buf.push('' +
            '      for (var ' + indexVarName + ' = 0, $$l = $$obj.length; ' + indexVarName + ' < $$l; ' + indexVarName + '++) {\n' +
            '        var ' + each.val + ' = $$obj[' + indexVarName + '];');

        this.visit(each.block, parentId);

        this.buf.push('      }');

        if (each.alternate) {
            this.buf.push('    } else {');
            this.visit(each.alternate, parentId);
            this.buf.push('    }');
        }

        this.buf.push('' +
            '  } else {\n' +
            '    var $$l = 0;\n' +
            '    for (var ' + indexVarName + ' in $$obj) {\n' +
            '      $$l++;\n' +
            '      var ' + each.val + ' = $$obj[' + indexVarName + '];');

        this.visit(each.block, parentId);

        this.buf.push('    }');
        if (each.alternate) {
            this.buf.push('    if ($$l === 0) {');
            this.visit(each.alternate, parentId);
            this.buf.push('    }');
        }
        this.buf.push('  }\n}).call(this);\n');
    }

    visitAttributes(attrs, attributeBlocks) {
        if (attrs.length) {
            // this.attrs(attrs);
        }
    }

    // attrs(attrs, buffer) {
    //     var res = compileAttrs(attrs, {
    //         terse: true,
    //         format: buffer ? 'html' : 'object',
    //         runtime: this.runtime.bind(this)
    //     });
    //     if (buffer) {
    //         this.bufferExpression(res);
    //     }
    //     return res;
    // }

    visitCode(code, parentId) {

        var node = {
            name: "text",
            id: this.nextId()
        }

        this.buf.push(`n = ${JSON.stringify(node)};n.val = ${code.val.trim()};pug_idMap[n.id] = n;`)
        parentId && this.bufferChildren(parentId)

    }


}


module.exports = ast => {
    let cmp = new Generate(ast)
    return cmp.compile()
}