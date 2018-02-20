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
        return true
    }

    public initComponent():RenderNode {
        return buildFromVDOM(this.$root,this.$rootViewId,this.$styles)
    }

    public get root(){
        return this.$root
    }

    public get rootViewId(){
        return this.$rootViewId
    }
}