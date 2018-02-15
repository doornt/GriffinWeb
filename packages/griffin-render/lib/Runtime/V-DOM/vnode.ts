import { IASTNode } from "../../Interface/INode";

export class VNode{

    private $tag:string
    private $key:string

    private $children:Array<VNode> = []

    private $depth:number = 0

    private $data:IASTNode

    private $componentId:string

    constructor(key:string,data:IASTNode,componentId:string){
        this.$tag = data.name
        this.$key = key
        this.$data = data
        this.$componentId = componentId
    }

    public get key(){
        return this.$key
    }

    public get depth(){
        return this.$depth
    }

    public set depth(n:number){
        this.$depth =n
    }

    public get tag(){
        return this.$tag
    }

    public push(child:VNode){
        this.$children.push(child)
        child.depth = this.$depth + 1
    }

    public get children(){
        return this.$children
    }

    public get data(){
        return this.$data
    }

    public get componentId(){
        return this.$componentId
    }

}