import { IASTNode } from "../../Interface/INode";
import { compile, buildFromVDOM } from "./compiler";
import { VNode } from './vnode';
import { RenderNode } from '../DOM/RenderNode';
import { Context } from "../../Application/Context";

export class VDOM {

    private $astFunc: Function

    private $styles: any

    private $root: VNode

    private $ctx: Context

    private $componentId: string

    private $rootView: RenderNode

    constructor(astFunc: Function, style: any, ctx: Context, componentId: string, input = {}) {
        this.$astFunc = astFunc

        this.$styles = style

        this.$ctx = ctx

        this.$componentId = componentId

        this.$root = new VNode('gn_key', { name: '$wrapper' }, this.$componentId)

        this.$compile(input)
    }

    private $compile(input) {
        let json: Array<IASTNode> = this.$astFunc(input)
        console.log("json", JSON.stringify(json))
        compile(json, this.$root)
    }

    public diff(target: VDOM) {
        if (this.$rootView) {
            console.log('diff')
            this.$rootView.removeChildren()
            let children: Array<RenderNode> = []
            for (let child of target.root.children) {
                children.push(buildFromVDOM(child, this.$ctx, target.styles))
            }
            this.$rootView.addChildren(children)
            target.setRootView(this.$rootView)
        }
    }

    public initComponent(): RenderNode {
        this.$rootView = buildFromVDOM(this.$root, this.$ctx, this.$styles)
        return this.$rootView
    }

    public get root() {
        return this.$root
    }

    public get context() {
        return this.$ctx
    }

    public get styles() {
        return this.$styles
    }

    public setRootView(v: RenderNode) {
        this.$rootView = v
    }
}