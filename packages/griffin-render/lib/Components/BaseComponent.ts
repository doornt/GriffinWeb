
// import {IPugNode, IPugBlock, IStyle} from "../Interface/INode"
import { H5Manager } from "../Manager/H5Manager"
import { H5Component } from "../Runtime/DOM/H5Component"
import { EventDispatcher } from '../Event/EventDispatcher';
import { RenderNode } from "../Runtime/DOM/RenderNode";
import { generateID } from '../Utils/NodeID';
import { Instance } from '../Runtime/DOM/Instance';
import { VDOM } from "../Runtime/V-DOM/vdom";

export class BaseComponent extends RenderNode{

    private $ast: Function

    private $view: H5Component

    protected $styles: any

    protected $rootViewId: string

    private $vdom:VDOM

    private $state = {}

    constructor() {
        super()
        this.$instanceId = generateID()
    }

    protected set template(pugData:any){
        this.$ast = pugData.AstFunc
        this.$styles = pugData.style
    }

    protected setupView(){
        if(!this.$ast){
            throw new Error('template file error or not set')
        }
        
        if(this.root){
            this.root.addComponent(this.$instanceId,this)
            this.$render()
        }
    }
    
    addChildren(children:Array<RenderNode>){
        if(this.$view){
            this.$view.addChildren(children)
        }
    }

    $render() {
        let newVdom = new VDOM(this.$ast,this.$styles,this.$rootViewId,this.$instanceId,this.$state)

        if(this.$vdom){
            this.$vdom.diff(newVdom)
        }else{
            this.$view = newVdom.initComponent() as H5Component
        }
        this.$vdom = newVdom
    }

    public get id() {
        return this.$view.id
    }



    onAdded() {
        console.log("on added")
        // this.$renders.map(item=>item.$render())
    }


}