import { IASTNode } from "../../Interface/INode";
import { VNode } from "./vnode";
import { RenderNode } from '../DOM/RenderNode';
import { Context } from "../../Application/Context";

export const compile = (nodes:Array<IASTNode>,parent:VNode) => {
    for(let i = 0;i<nodes.length;i++){
        let vnode = new VNode(parent.key + '_' + i,nodes[i],parent.componentId)
        parent.push(vnode)
        compile(nodes[i].children || [],vnode)
    }
   
}

const visitNode = (node: VNode,ctx:Context,inStyles)=> {
    let view:RenderNode = null
    switch (node.tag) {
        case "text":
            view = visitText(node,ctx,inStyles)
            break
        default:
            view = visitTag(node,ctx,inStyles)
            let children = []
            for(let child of node.children){
                let v2 = visitNode(child,ctx,inStyles)
                v2 && children.push(v2)
            }
            view.addChildren(children)
            break
    }
    if(view){
        view.componentId = node.componentId
    }
    return view
}

const visitText = (node: VNode,ctx:Context,inStyles):RenderNode => {

    let styles = configStyle(node.data, inStyles)
    node.data.attributes.push({ name: "text", val: node.data.val })
    let view:RenderNode = ctx.root.createElement("text", node.data.attributes, styles)
    return view
}

const visitTag = (node: VNode,ctx:Context,inStyles) => {
    let view:RenderNode = null
    let styles = configStyle(node.data, inStyles)
    switch (node.tag) {
        default:
            view = ctx.root.createElement(node.tag, node.data.attributes, styles) 
            break
    }
   
    return view
}

const configStyle = (node: IASTNode, inStyles: any) => {
    let styles = {}
    node.attributes = (node.attributes || []).map(attr => {
        return {
            name: attr.name,
            val: attr.val
        }
    })
    let list = node.attributes.filter(o => o.name == "class")
    for (let l of list) {
        let ss = inStyles.filter(s => s.selector == "." + l.val)
        for (let s of ss) {
            styles = Object.assign(styles, s.attrs)
        }
    }
    return styles
}

export const buildFromVDOM = (root:VNode,ctx:Context,styles) => {
    let view = visitNode(root,ctx,styles)
    return view
}