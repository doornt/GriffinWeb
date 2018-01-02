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
        this.buffer.push(`if(${!!parentId} && idMap["${parentId}"]){`)
        this.buffer.push(`idMap["${parentId}"].children = idMap["${parentId}"].children || []`)
        this.buffer.push(`idMap["${parentId}"].children.push(n)`)
        this.buffer.push(`n.parentId = "${parentId}"`)
        this.buffer.push(`}`)
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
        this.buffer = []
    }

    compile() {

        let exclude = ["Object","idMap","n"]
        this.visit(this.ast)
        this.buffer.push(`let res = Object.keys(idMap).map(key=>idMap[key]).filter(obj=>!obj.parentId);\nreturn res;
        `)
        let js = this.buffer.join(';\n')

        var vars = detect(js).map(function (global) { return global.name; })
        .filter(function (v) {
          return exclude.indexOf(v) === -1
            && v !== 'undefined'
            && v !== 'this'
        })

        let runtimeJs = `function template({${vars.join(',')}}) {var n = "", idMap = {};` + js + ";}";

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
        for (let attr of tag.attrs) {
            attributes.push({
                name: attr.name,
                val: attr.val.replace(/\"/g, "").replace(/\'/g, "")
            })
        }
        node.attributes = attributes
        this.buffer.push(`n = ${JSON.stringify(node)}`)
        this.buffer.push(`idMap["${node.id}"] = n `)
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
        this.buffer.push(`n = ${JSON.stringify(node)}`)
        this.bufferChildren(parentId)
    }

    visitConditional(cond,parentId) {
        var test = cond.test;
        this.buffer.push('if (' + test + ') {');
        this.visit(cond.consequent, parentId);
        this.buffer.push('}')
        if (cond.alternate) {
            if (cond.alternate.type === 'Conditional') {
                this.buffer.push('else')
                this.visitConditional(cond.alternate);
            } else {
                this.buffer.push('else {');
                this.visit(cond.alternate, parentId);
                this.buffer.push('}');
            }
        }
    }

}


module.exports = ast => {
    let cmp = new Generate(ast)
    return cmp.compile()
}