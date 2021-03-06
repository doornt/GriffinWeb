const nodeTemplate = {
    "name": "string",
    "attributes": "array",
    "children": "array",
    "id": 'number',
    "hasParent": "number"
}

var detect = require('acorn-globals');
var acorn = require('acorn');
var walk = require('acorn/dist/walk');

class Generate {


    bufferChildren(parentVar, nodeVar) {
        this.buf.push(`${parentVar}.children = ${parentVar}.children || []`)
        this.buf.push(`${parentVar}.children.push(${nodeVar})`)
    }

    visit(node) {
        if (!node) {
            return console.error("node empty")
        }

        if (!this['visit' + node.type]) {
            return console.error("type unresolved!")
        }

        this.visitNode(node)

    }

    visitNode(node) {
        this['visit' + node.type](node)
    }


    constructor(ast) {
        this.ast = ast
        this.buf = []
        this.eachCount = 0
        this.varCount = 0
        this.nodeValStack = []
        this.rootVals = []
        this.allNodes = []
        this.exclude = ["Object", 'pug_interp']
    }

    nextId() {
        this.id = this.id ? (this.id + 1) : 1000
        return this.id
    }

    nextVarName() {
        this.varName = '$$_' + this.varCount++
        return this.varName
    }

    getParentAndPush(nodeVar) {
        this.allNodes.push(nodeVar)
        let parentVar = this.nodeValStack.length ? this.nodeValStack[this.nodeValStack.length - 1] : null
        this.nodeValStack.push(nodeVar)
        return parentVar
    }

    compile() {


        this.visit(this.ast)
        this.resetText()

        this.buf.push(`let res = [${this.rootVals.join(',')}];\nreturn res;
        `)
        let js = this.buf.join('\n')

        var that = this
        var vars = detect(js).map(function (global) {
            return global.name;
        })
            .filter(function (v) {
                return that.exclude.indexOf(v) === -1 && v.indexOf('$$_') === -1 &&
                    v !== 'undefined' &&
                    v !== 'this'
            })

        let runtimeJs = `function template({${vars.join(',')}}) {var attrs=[],pug_interp, pug_idMap = {};` + js + ";}";

        return runtimeJs
    }

    resetText() {
        //这里得重写
        this.buf.push(`
            let $$_roots = [${this.rootVals.join(',')}];
            function $$_visitText(node){
                if(!node.children){
                    return
                }
                if(node.children.length && node.children.filter(n=>n.name == 'text').length == node.children.length){
                    node.val = node.children.map(n => n.val).join('')
                    node.name = 'text'
                    node.children = []
                }else{
                    node.children.map(n=>$$_visitText(n))
                }
            }
            $$_roots.map(r=>$$_visitText(r))
        `)
    }

    visitBlock(block) {
        for (var i = 0; i < block.nodes.length; ++i) {
            this.visit(block.nodes[i]);
        }
    }

    visitTag(tag) {
        if (tag.name == "style") {
            return
        }
        var node = {
            name: tag.name
        }
        let attributes = []
        node.attributes = attributes

        let nodeVar = this.nextVarName()
        let parentVar = this.getParentAndPush(nodeVar)

        this.buf.push(`var ${nodeVar} = ${JSON.stringify(node)}`)
        this.buf.push("attrs=[]")
        for (let attr of tag.attrs) {
            this.buf.push(`attrs.push({name: "${attr.name}",val: ${attr.val}})`)
        }
        this.buf.push(`${nodeVar}.attributes = attrs`)
        // this.buf.push(`pug_idMap[${node.id}] = ${nodeVar} `)
        parentVar && this.bufferChildren(parentVar, nodeVar)

        // handle for listview
        if (tag.name === "listView") {
            if (tag.selfClosing) {
                console.log("listview cannot be selfClosing")
            } else {
                if (tag.block.nodes.length != 1 || tag.block.nodes[0].type !== "Each") {
                    console.log("listview should followed by each loop")
                } else {
                    if (tag.block.nodes[0].selfClosing) {
                        console.log("listview each cannot be selfClosing")
                    } else {
                        // this.buf.push(`var list = ${JSON.stringify(tag.block.nodes[0].obj)}`)
                        this.buf.push(`attrs.push({name: "listData",val: ${tag.block.nodes[0].obj}})`)
                        this.buf.push(`attrs.push({name: "listItem",val: ${JSON.stringify(tag.block.nodes[0].val)}})`)

                        for (var i = 0; i < tag.block.nodes[0].block.nodes.length; ++i) {
                            if (tag.block.nodes[0].block.nodes[i].name === "row") {
                                this.visit(tag.block.nodes[0].block.nodes[i]);
                            }
                        }
                    }
                }
            }

        } else {
            if (!tag.selfClosing) {
                this.visit(tag.block);
            }
        }

        this.nodeValStack.pop()

        if (!parentVar) {
            this.rootVals.push(nodeVar)
        }
    }

    visitText(text) {
        var node = {
            name: "text",
            val: text.val
        }

        let nodeVar = this.nextVarName()
        let parentVar = this.getParentAndPush(nodeVar)

        this.buf.push(`let ${nodeVar} = ${JSON.stringify(node)}`)

        parentVar && this.bufferChildren(parentVar, nodeVar)

        this.nodeValStack.pop()

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

    visitEach(each) {
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
            '      for (var ' + indexVarName + ' = 0,$$l = $$obj.length; ' + indexVarName + ' < $$l; ' + indexVarName + '++) {\n' +
            '        var ' + each.val + ' = $$obj[' + indexVarName + '];');

        this.visit(each.block);

        // this.buf.push('debugger;n.id = ' + parentIdName + '+ "_" +' + indexVarName)

        this.buf.push('      }');

        if (each.alternate) {
            this.buf.push('    } else {');
            this.visit(each.alternate);
            this.buf.push('    }');
        }

        this.buf.push('' +
            '  } else {\n' +
            '    var $$l = 0;\n' +
            '    for (var ' + indexVarName + ' in $$obj) {\n' +
            '      $$l++;\n' +
            '      var ' + each.val + ' = $$obj[' + indexVarName + '];');

        this.visit(each.block);

        this.buf.push('    }');
        if (each.alternate) {
            this.buf.push('    if ($$l === 0) {');
            this.visit(each.alternate);
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

    visitCode(code) {
        if (code.buffer) {
            var node = {
                name: "text"
            }
            let nvar = this.nextVarName()
            let parentVar = this.getParentAndPush(nvar)

            this.buf.push(`let ${nvar} = ${JSON.stringify(node)};${nvar}.val = "${code.val.trim()}";`)

            parentVar && this.bufferChildren(parentVar, nvar)

            this.nodeValStack.pop()
        } else {
            this.buf.push(code.val);
        }

        if (code.block) {
            if (!code.buffer) this.buf.push('{');
            this.visit(code.block);
            if (!code.buffer) this.buf.push('}');
        }
    }


}


module.exports = ast => {
    let cmp = new Generate(ast)
    return cmp.compile()
}