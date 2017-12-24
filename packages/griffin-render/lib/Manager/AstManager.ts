import {IPugBlock, IPugNode, IPugConditional, IPugText} from "../Interface/INode"
import {BaseComponent} from "../Components/BaseComponent"
import {RenderComponent} from "../Components/RenderComponent"
import { NativeManager } from "../Native/index";
import { TextComponent } from "../Components/TextComponent";

export class AstManager{

    private $ast:IPugBlock


    private $inputData = {}

    constructor(ast:IPugBlock){
        this.$ast = ast
    }

    compile(data){
        this.$inputData = data || {}

        let root:RenderComponent = null

        let children = []
        for(let node of this.$ast.nodes){
            children.push(this.$visitNode(node))
        }

        if(children.length > 1){
            root = new RenderComponent(null)
            for(let child of children){
                root.addChild(child)
            }
        }else{
            root = children[0]
        }
        
      
        return root
        
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
                block && view.addChild(new AstManager(block).compile(this.$inputData))
            break
        }
        return view
    }

    private $visitBlock(node:IPugBlock){

    }

    private $visitText(node:IPugText){
        node.attrs = node.attrs || []
        node.attrs.push({name:"text",val:node.val})
        return new TextComponent(node.attrs)
    }

    private $visitTag(node:IPugNode){
        let view = null
        switch(node.name){
            default:
                view = new RenderComponent(node.attrs)
            break
        }
        return view
    }
}