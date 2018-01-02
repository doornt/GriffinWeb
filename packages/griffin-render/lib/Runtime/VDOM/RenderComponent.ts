// import {IPugNode, IPugAttr} from "../../Interface/INode"
import { TaskManager } from "../Bridge/TaskManager";
import { ETaskType, EViewTask, ITaskEvent } from "../Interface/Task";
import { generateID } from "../../Utils/NodeID";
import { IDOMAtrr } from "../../Interface/INode";

export abstract class RenderComponent{

    protected $attrs:Array<IDOMAtrr>

    protected $children:Array<RenderComponent> = []

    protected $styles = {}

    protected $instanceId:string = null

    constructor(attrs:Array<IDOMAtrr>,styles:any){
        this.$attrs = attrs ||  []
        this.parseAttrs()
        for(let k in styles){
            this.$buildStyle(k,styles[k])
        }
        this.$instanceId = generateID()
        this.createView()

    }

    public get id(){
        return this.$instanceId
    }

    protected parseAttrs(){
        
    }


    protected abstract createView()

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

    protected $buildStyle(k,v){
        switch(k){
            case "width":
            case "height":
            case "left":
            case "top":
                let n = parseInt(v)
                this.$styles[k] = n
            break
            default:
                this.$styles[k] = v
        }

    }

}
    