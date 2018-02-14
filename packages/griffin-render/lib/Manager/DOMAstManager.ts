import { IDOMNode, IStyle, IDOMAtrr } from "../Interface/INode"
import { H5Manager } from "./H5Manager";
import { RenderNode } from '../Runtime/DOM/RenderNode';
import { RootView } from '../Runtime/DOM/RootView';
import { Instance } from '../Runtime/DOM/Instance';

export class DOMAstManager {

    private $nodes: Array<IDOMNode>
    private $locals = {}
    private $styles: Array<IStyle>
    private $componentId:string
    private $root:RootView

    constructor(nodes: Array<IDOMNode>, styles: any) {
        this.$nodes = nodes
        this.$styles = styles
    }

    compile(componentId:string,rootId:string) {
        this.$componentId = componentId
        this.$root = Instance.getRootView(rootId)
        if(!this.$root){
            return
        }

        let children = []
        for (let node of this.$nodes) {
            children.push(this.$visitNode(node))
        }
        return children
    }

    private $visitNode(node: IDOMNode) {
        let view:RenderNode = null
        
        switch (node.name) {
            // case "block":
            //     view = this.$visitBlock(node as IPugBlock)
            // break
            case "text":
                view = this.$visitText(node)
                break
            default:
                view = this.$visitTag(node)
                if (node.children) {
                    let children = new DOMAstManager(node.children, this.$styles).compile(this.$componentId,this.$root.id)
                    for (let child of children) {
                        view.addChild(child)
                    }
                }
                break
        }
        if(view){
            view.componentId = this.$componentId
        }
        return view
    }

    private $visitText(node: IDOMNode):RenderNode {
        let styles = {}
        this.$configStyle(node, styles)
        node.attributes.push({ name: "text", val: node.val })

        let view:RenderNode = this.$root.createElement("text", node.attributes, styles)
        return view
    }

    private $visitTag(node: IDOMNode) {
        let view:RenderNode = null
        let styles = {}
        this.$configStyle(node, styles)
        switch (node.name) {
            default:
                view = this.$root.createElement(node.name, node.attributes, styles) 
                break
        }
       
        return view
    }

    private $configStyle(node: IDOMNode, styles: any) {
        node.attributes = node.attributes.map(attr => {
            return {
                name: attr.name,
                val: attr.val
            }
        })
        let list = node.attributes.filter(o => o.name == "class")
        for (let l of list) {
            let ss = this.$styles.filter(s => s.selector == "." + l.val)
            for (let s of ss) {
                styles = Object.assign(styles, s.attrs)
            }
        }
    }
}