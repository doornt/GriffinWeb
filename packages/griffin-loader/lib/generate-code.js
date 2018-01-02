const nodeTemplate = {
    "name": "string",
    "attributes": "array",
    "children": "array",
    "id": "uuid",
    "parentId": "uuid"
}

const uuid = require('uuid/v4')
var detect = require('acorn-globals');
var acorn = require('acorn');
var walk = require('acorn/dist/walk');

class Generate {


    bufferChildren(parentId) {
        this.buf.push(`if(${!!parentId} && idMap["${parentId}"]){`)
        this.buf.push(`idMap["${parentId}"].children = idMap["${parentId}"].children || []`)
        this.buf.push(`idMap["${parentId}"].children.push(n)`)
        this.buf.push(`n.parentId = "${parentId}"`)
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

    compile() {

        let exclude = ["Object", "idMap", "n"]
        this.visit(this.ast)
        this.buf.push(`let res = Object.keys(idMap).map(key=>idMap[key]).filter(obj=>!obj.parentId);\nreturn res;
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

        let runtimeJs = `function template({${vars.join(',')}}) {var n = "",attrs=[], idMap = {};` + js + ";}";

        return runtimeJs
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
            id: `${uuid()}`
        }
        let attributes = []
        node.attributes = attributes
        this.buf.push(`n = ${JSON.stringify(node)}`)
        this.buf.push("attrs=[]")
        for (let attr of tag.attrs) {
            this.buf.push(`attrs.push({name: "${attr.name}",val: ${attr.val}})`)
        }
        this.buf.push(`n.attributes = attrs`)
        this.buf.push(`idMap["${node.id}"] = n `)
        this.bufferChildren(parentId)
        if (!tag.selfClosing) {
            this.visit(tag.block, node.id);
        }
    }

    visitText(text, parentId) {
        var node = {
            name: "text",
            val: text.val,
            id: `${uuid()}`
        }
        this.buf.push(`n = ${JSON.stringify(node)}`)
        this.bufferChildren(parentId)
    }

    visitConditional(cond, parentId) {
        var test = cond.test;
        this.buf.push('if (' + test + ') {');
        this.visit(cond.consequent, parentId);
        this.buf.push('}')
        if (cond.alternate) {
            if (cond.alternate.type === 'Conditional') {
                this.buf.push('else')
                this.visitConditional(cond.alternate,parentId);
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

    visitAttributes(attrs,attributeBlocks){
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


}


module.exports = ast => {
    let cmp = new Generate(ast)
    return cmp.compile()
}