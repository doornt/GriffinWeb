import { EventDispatcher } from '../../Event/EventDispatcher';
import { TaskManager, ETaskType, EViewTask } from '../export';
import { BaseComponent } from '../../Components/BaseComponent';
import { IDOMAtrr } from '../../Interface/INode';
import { Instance } from './Instance';
import { RootView } from './RootView';

export class RenderNode extends EventDispatcher{
    protected $tagName:string

    protected $children:Array<RenderNode> = []

    protected $instanceId:string

    protected $parent:RenderNode

    protected $master:BaseComponent

    protected $rootViewId: string

    protected $attrArray: Array<IDOMAtrr>

    protected $style = {}

    public set rootViewId(id:string){
        if(this.$rootViewId){
            return
        }
        this.$rootViewId = id
        this.setupView()
    }

    protected setupView(){
        throw new Error('cannot use RenderNode directly')
    }

    public set componentId(id){
        let rootView:RootView = Instance.getRootView(this.$rootViewId)
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

    protected get taskManager(){
        return Instance.getRootView(this.$rootViewId).taskManager
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
        
        this.taskManager.send(ETaskType.VIEW, {
            action: EViewTask.ADD_SUBVIEW,
            addSubviewData: { nodeId: child.id, parentId: this.id }
        })
    }

    public get root(){
        return Instance.getRootView(this.$rootViewId)
    }


    public $onNativeEvent(type:string){
        
    }
}