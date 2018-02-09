import { EventDispatcher } from '../../Event/EventDispatcher';
import { TaskManager, ETaskType, EViewTask } from '../export';
import { BaseComponent } from '../../Components/BaseComponent';
import { ComponentCenter } from '../../Manager/ComponentCenter';

export class RenderNode extends EventDispatcher{
    protected $tagName:string

    protected $children:Array<RenderNode>

    protected $instanceId:string

    protected $parent:RenderNode

    protected $master:BaseComponent

    public set masterId(id){
        this.$master = ComponentCenter.instance.getComponent(id)
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

    public addChild(child:RenderNode){
        if (!child) {
            return
        }
        this.children.push(child)
        child.parent = this
        TaskManager.instance.send(ETaskType.VIEW, {
            action: EViewTask.ADD_SUBVIEW,
            addSubviewData: { nodeId: child.id, parentId: this.id }
        })
    }


    public $onNativeEvent(type:string){
        
    }
}