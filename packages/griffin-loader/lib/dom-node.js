class DOMNode{
    constructor(node){
        this.tag = node.name || node.type
        for(let attr of node.attrs || [] ){
            switch(attr.name){
                case "class":{
                    this["class"] = attr.val
                    break
                }
                case "@click":{
                    this.clickHandler = attr.val
                    break
                }
            }
        }
        this.children = []
        if(node.block && node.block.nodes){
            for(let child of node.block.nodes){
                this.children.push(new DOMNode(child))
            }
        }
    }
}

exports.createNodes = function(ast){
    let list =  []
    if(ast.type == "Block"){
        for(let node of ast.nodes){
            list.push(new DOMNode(node))
        }
    }
    else{
        list = [new DOMNode(ast)]
    }
    return list
}