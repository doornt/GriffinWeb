import { IASTNode } from "../../Interface/INode";
import { compile, buildFromVDOM } from "./compiler";
import { VNode } from './vnode';
import { RenderNode } from '../DOM/RenderNode';

export class VDOM{

    private $astFunc:Function

    private $styles:any

    private $root:VNode

    private $rootViewId:string

    private $componentId:string

    private $rootView:RenderNode
    
    constructor(astFunc:Function,style:any,rootViewId:string,componentId:string,input={}){
        this.$astFunc = astFunc

        this.$styles = style

        this.$rootViewId = rootViewId

        this.$componentId = componentId

        this.$root = new VNode('gn_key',{name:'$wrapper'},this.$componentId)

        this.$compile(input)
    }

    private $compile(input){
        let json:Array<IASTNode> = this.$astFunc(input)
        compile(json,this.$root)
    }

    public diff(target:VDOM){
        console.log("diff")
        if(this.$rootView){
            this.$rootView.removeChildren()
            let children:Array<RenderNode> = []
            for(let child of target.root.children){
                children.push(buildFromVDOM(child,this.$rootViewId,target.styles))
            }
            this.$rootView.addChildren(children)
        }
    }

    public initComponent():RenderNode {
        this.$rootView =  buildFromVDOM(this.$root,this.$rootViewId,this.$styles)
        return this.$rootView
    }

    public get root(){
        return this.$root
    }

    public get rootViewId(){
        return this.$rootViewId
    }

    public get styles(){
        return this.$styles
    }
}