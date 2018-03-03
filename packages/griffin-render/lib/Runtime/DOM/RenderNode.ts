import { EventDispatcher } from '../../Event/EventDispatcher';
import { BaseComponent } from '../../Components/BaseComponent';
import { IDOMAtrr } from '../../Interface/INode';
import { RootView } from './RootView';
import { Context } from '../../Application/Context';

export class RenderNode extends EventDispatcher{
    protected $tagName:string

    protected $children:Array<RenderNode> = []

    protected $instanceId:string

    protected $parent:RenderNode

    protected $master:BaseComponent

    protected $ctx: Context

    protected $attrArray: Array<IDOMAtrr>

    protected $style = {}

    public attach(ctx:Context){
        this.$ctx = ctx
        this.setupView()
    }

    protected setupView(){
        throw new Error('cannot use RenderNode directly')
    }

    public set componentId(id){
        let rootView:RootView = this.$ctx.root
        if(rootView){
            this.$master = rootView.getCoponentById(id)
        }
    }

    public set attr(arry:Array<IDOMAtrr>){
        this.$attrArray = arry || []
    }

    public set style(style:any){
        for (let k in style) {
            let v = style[k]
            this.$style[k] = isNaN(v) ? v : +v
        }
    }


    protected get master(){
        return this.$master
    }

    public get tagName(){
        return this.$tagName
    }

    public set tagName(name){
        this.$tagName = name
    }

    public get children(){
        return this.$children
    }

    public get id(){
        return this.$instanceId
    }

    public set id(id){
        this.$instanceId = id
    }

    public get parent(){
        return this.parent
    }

    public set parent(p:RenderNode){
        this.$parent = p
    }

    public addChildren(children:Array<RenderNode>){
        if (!Array.isArray(children)) {
            return
        }
        if(children.length == 0){
            return
        }
        for(let child of children){
            this.children.push(child)
            child.parent = this
        }
        this.$ctx.task.postMessage('add', { ids: children.map(child=>child.id), parentId: this.id })
        
    }

    public removeChildren(){
        this.$ctx.task.postMessage('removeChildren',{ nodeId:this.id})
    }

    public $onNativeEvent(type:string){
      throw new Error('cannot invoke in render node')
    }
}