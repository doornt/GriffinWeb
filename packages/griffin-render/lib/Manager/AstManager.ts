import {IPugBlock, IPugNode, IPugConditional, IPugText} from "../Interface/INode"
import { ComponentManager } from "./ComponentManager";
// import {BaseComponent} from "../Components/BaseComponent"
// import {RenderComponent} from "../Runtime/VDOM/RenderComponent"
// import { TextComponent } from "../Runtime/VDOM/TextComponent";

export class AstManager{

    private $ast:IPugBlock


    private $inputData = {}

    constructor(ast:IPugBlock){
        this.$ast = ast
    }

    compile(data){
        this.$inputData = data || {}

        // let root:RenderComponent = null

        let children = []
        for(let node of this.$ast.nodes){
            children.push(this.$visitNode(node))
        }

        return children
        
    }

    private $visitNode(node:IPugNode|IPugConditional|IPugBlock|IPugText){
        let view = null
        switch(node.type){
            case "block":
                view = this.$visitBlock(node as IPugBlock)
            break
            case "Text":
                view = this.$visitText(node as IPugText)
            break
            default:
                view = this.$visitTag(node as IPugNode)
                let block = (<IPugNode>node).block
                if(block){
                    let children = new AstManager(block).compile(this.$inputData)
                    for(let child of children){
                        view.addChild(child)
                    }
                }
            break
        }
        return view
    }

    private $visitBlock(node:IPugBlock){

    }

    private $visitText(node:IPugText){
        node.attrs = node.attrs || []
        node.attrs.push({name:"text",val:node.val})
        return ComponentManager.instance.createViewByTag("text",node.attrs)
    }

    private $visitTag(node:IPugNode){
        let view = null
        switch(node.name){
            default:
                view = ComponentManager.instance.createViewByTag(node.name,node.attrs)
            break
        }
        return view
    }
}