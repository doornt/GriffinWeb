
// import {IPugNode, IPugBlock, IStyle} from "../Interface/INode"
import { H5Manager } from "../Manager/H5Manager"
import { DOMAstManager } from "../Manager/DOMAstManager"
import { H5Component } from "../Runtime/VDOM/H5Component";
import { EventDispatcher } from '../Event/EventDispatcher';
import { RenderNode } from "../Runtime/VDOM/RenderNode";
import { generateID } from '../Utils/NodeID';
import { Instance } from '../Runtime/VDOM/Instance';

export class BaseComponent extends RenderNode{

    private $ast: Function

    private $view: H5Component

    protected $styles: any

    protected $rootViewId: string

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
        let children = new DOMAstManager(compileJson, this.$styles).compile(this.$instanceId,this.$rootViewId)
        if(children.length == 1){
            this.$view = children[0]
        }else{
            if(this.$view){
                for (let child of children) {
                    this.$view.addChild(child)
                }
            }
        }
        
    }

    public get id() {
        return this.$view.id
    }



    viewDidLoad() {
        // this.$renders.map(item=>item.$render())
    }


}