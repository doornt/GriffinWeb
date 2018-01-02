import {IDOMNode, IStyle} from "../Interface/INode"
import { ComponentManager } from "./ComponentManager";

export class DOMAstManager{

    private $nodes:Array<IDOMNode>
    private $locals = {}
    private $styles:Array<IStyle>

    constructor(nodes:Array<IDOMNode>,styles:any){
        this.$nodes = nodes
        this.$styles = styles
    }

    compile(data){
        this.$locals = data || {}

        let children = []
        for(let node of this.$nodes){
            children.push(this.$visitNode(node))
        }

        return children
        
    }

    private $visitNode(node:IDOMNode){
        let view = null
        switch(node.name){
            // case "block":
            //     view = this.$visitBlock(node as IPugBlock)
            // break
            case "text":
                view = this.$visitText(node)
            break
            default:
                view = this.$visitTag(node)
                if(node.children){
                    let children = new DOMAstManager(node.children,this.$styles).compile(this.$locals)
                    for(let child of children){
                        view.addChild(child)
                    }
                }
            break
        }
        return view
    }


    private $visitText(node:IDOMNode){
        node.attributes = node.attributes || []
        node.attributes.push({name:"text",val:node.val})
        return ComponentManager.instance.createViewByTag("text",node.attributes,{})
    }

    private $visitTag(node:IDOMNode){
        let view = null
        let styles = {}
        node.attributes = node.attributes.map(attr=>{
            return {
                name:attr.name,
                val:attr.val
            }
        })
        let list = node.attributes.filter(o=>o.name == "class")
        for(let l of list){
            let ss  = this.$styles.filter(s=>s.selector == "." + l.val)
            for(let s of ss){
                styles = Object.assign(styles,s.attrs)
            }
        }
        debugger
        switch(node.name){
            default:
                view = ComponentManager.instance.createViewByTag(node.name,node.attributes,styles)
            break
        }
        return view
    }
}