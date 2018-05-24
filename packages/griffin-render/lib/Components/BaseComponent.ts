
// import {IPugNode, IPugBlock, IStyle} from "../Interface/INode"
import { H5Manager } from "../Manager/H5Manager"
import { H5Component } from "../Runtime/DOM/H5Component"
import { EventDispatcher } from '../Event/EventDispatcher';
import { RenderNode } from "../Runtime/DOM/RenderNode";
import { generateID } from '../Utils/NodeID';
import { VDOM } from "../Runtime/V-DOM/vdom";

export class BaseComponent extends RenderNode {

    private $ast: Function

    private $view: H5Component

    protected $styles: any

    protected $rootViewId: string

    private $vdom: VDOM

    constructor() {
        super()
        this.$instanceId = generateID()
    }

    protected set template(pugData: any) {
        this.$ast = pugData.AstFunc
        console.log(JSON.stringify(this.$ast))
        this.$styles = pugData.style
    }

    protected setupView() {
        if (!this.$ast) {
            throw new Error('template file error or not set')
        }
        this.$ctx.root.addComponent(this.$instanceId, this)
        this.$render()
    }

    addChildren(children: Array<RenderNode>) {
        if (this.$view) {
            this.$view.addChildren(children)
        }
    }

    $render() {
        let newVdom = new VDOM(this.$ast, this.$styles, this.$ctx, this.$instanceId, this)
        // console.log('newVom', JSON.stringify(newVdom))
        if (this.$vdom) {
            this.$vdom.diff(newVdom)
        } else {
            this.$view = newVdom.initComponent() as H5Component
        }
        this.$vdom = newVdom
    }

    public get id() {
        return this.$view.id
    }

    public refresh() {
        this.$render()
    }

    public openUrl(path: string, params?: any) {
        this.$ctx.open(path, params)
    }

    public goback() {
        this.$ctx.pop()
    }


    onAdded() {
        console.log("on added")
        // this.$renders.map(item=>item.$render())
    }


}