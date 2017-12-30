import {IPugBlock, IPugNode, IPugConditional, IPugText, IStyle} from "../Interface/INode"
import { ComponentManager } from "./ComponentManager";

export class DOMAstManager{

    private $ast:IPugBlock
    private $inputData = {}
    private $styles:Array<IStyle>

    constructor(ast:IPugBlock,styles:any){
        this.$ast = ast
        this.$styles = styles
    }

    compile(data){
        this.$inputData = data || {}

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
                    let children = new DOMAstManager(block,this.$styles).compile(this.$inputData)
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
        return ComponentManager.instance.createViewByTag("text",node.attrs,{})
    }

    private $visitTag(node:IPugNode){
        let view = null
        let styles = {}
        node.attrs = node.attrs.map(attr=>{
            return {
                name:attr.name,
                val:attr.val.replace(/\"/g,"").replace(/\'/g,"")
            }
        })
        let list = node.attrs.filter(o=>o.name == "class")
        for(let l of list){
            let ss  = this.$styles.filter(s=>s.selector == "." + l.val)
            for(let s of ss){
                styles = Object.assign(styles,s.attrs)
            }
        }
        switch(node.name){
            default:
                view = ComponentManager.instance.createViewByTag(node.name,node.attrs,styles)
            break
        }
        return view
    }
}