
// import {IPugNode, IPugBlock, IStyle} from "../Interface/INode"
import { H5Manager } from "../Manager/H5Manager"
import { DOMAstManager } from "../Manager/DOMAstManager"
import { H5Component } from "../Runtime/VDOM/H5Component";
import { EventDispatcher } from '../Event/EventDispatcher';
import { RenderNode } from "../Runtime/VDOM/RenderNode";
import { generateID } from '../Utils/NodeID';
import { ComponentCenter } from "../Manager/ComponentCenter";

export class BaseComponent extends RenderNode{

    private $ast: Function

    private $view: H5Component

    protected $styles: any

    constructor(pugJson: any) {
        super()
        this.$ast = pugJson.AstFunc
        this.$styles = pugJson.style
        this.$instanceId = generateID()
        ComponentCenter.instance.register(this.$instanceId,this)

        this.init()
        this.$render()
    }

    addChild(child:RenderNode){
        if(this.$view){
            this.$view.addChild(child)
        }
    }

    $render() {
        this.$rebuildAst()
    }

    $rebuildAst() {
        let compileJson = this.$ast({ test: true, list: [1, 2, 3, 4, 5] })
        let children = new DOMAstManager(compileJson, this.$styles).compile(this.$instanceId)
        if (children.length == 1) {
            this.$view = children[0]
        } else {
            this.$view = H5Manager.instance.createViewByTag("div", [], {}) as H5Component
            for (let child of children) {
                this.$view.addChild(child)
            }
        }
        // console.log('this.view', JSON.stringify(this.$view))
    }

    public get id() {
        return this.$view.id
    }

    init() {
    }

    viewDidLoad() {
        // this.$renders.map(item=>item.$render())
    }


}