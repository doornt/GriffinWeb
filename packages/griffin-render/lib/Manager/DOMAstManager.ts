import { IDOMNode, IStyle } from "../Interface/INode"
import { ComponentManager } from "./ComponentManager";

export class DOMAstManager {

    private $nodes: Array<IDOMNode>
    private $locals = {}
    private $styles: Array<IStyle>
    private static $rootNodes: Array<IDOMNode>

    constructor(nodes: Array<IDOMNode>, styles: any) {
        if (!DOMAstManager.$rootNodes) {
            DOMAstManager.$rootNodes = nodes
        }
        this.$nodes = nodes
        this.$styles = styles
    }

    compile() {
        let children = []
        for (let node of this.$nodes) {
            children.push(this.$visitNode(node))
        }

        return children

    }

    private $visitNode(node: IDOMNode) {
        let view = null
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
                    let children = new DOMAstManager(node.children, this.$styles).compile()
                    for (let child of children) {
                        view.addChild(child)
                    }
                }
                break
        }
        return view
    }

    private $findParentNode(nodeId: string, rootNodeArray: Array<IDOMNode>) {
        for (let node of rootNodeArray) {
            if (node.id === nodeId) {
                return node
            }
            if (node.children) {
                for (let subNode of node.children) {
                    return this.$findParentNode(nodeId, node.children)
                }
            }
        }
        return null
    }

    private $visitText(node: IDOMNode) {
        let styles = {}

        let parentNode = this.$findParentNode(node.parentId, DOMAstManager.$rootNodes)
        if (parentNode) {
            node.attributes = parentNode.attributes
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
        node.attributes = node.attributes || []
        node.attributes.push({ name: "text", val: node.val })

        return ComponentManager.instance.createViewByTag("text", node.attributes, styles)
    }

    private $visitTag(node: IDOMNode) {
        let view = null
        let styles = {}
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
        switch (node.name) {
            default:
                view = ComponentManager.instance.createViewByTag(node.name, node.attributes, styles)
                break
        }
        return view
    }
}