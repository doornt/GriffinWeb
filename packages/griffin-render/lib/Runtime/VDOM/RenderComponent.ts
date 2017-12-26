import {IPugNode, IPugAttr} from "../../Interface/INode"
import { TaskManager } from "../Bridge/TaskManager";
import { ETaskType, EViewTask, ITaskEvent } from "../Interface/Task";

export class RenderComponent{

    protected $attrs:Array<IPugAttr>

    protected $children:Array<RenderComponent> = []

    protected $attr = {}

    private $instanceId = null

    constructor(attrs:Array<IPugAttr>){
        this.$attrs = attrs ||  []
        for(let attr of this.$attrs){
            attr.val = attr.val.replace(/\"/g,"")
            this.$buildAttr(attr)
        }
        this.createView()
    }

    public get id(){
        return this.$instanceId
    }


    protected createView(){
        TaskManager.instance.send(ETaskType.VIEW,<ITaskEvent>{
            action:EViewTask.CREATE_VIEW,
            nodeId:this.id
        })
    }

    $render(){
        this.$children.map(item=>item.$render())
    }

    addChild(child:RenderComponent){
        if(!child){
            return
        }
        this.$children.push(child)
        TaskManager.instance.send(ETaskType.VIEW,{
            action:EViewTask.ADD_SUBVIEW,
            parentId:this.id,
            nodeId:child.id,
            data:null
        })
    }

    protected $buildAttr(attr:IPugAttr){
        
        switch(attr.name){
            case "width":
            case "height":
            case "left":
            case "top":
                let n = parseInt(attr.val)
                this.$attr[attr.name] = n
            break
            default:
                this.$attr[attr.name] = attr.val
        }

    }

}
    