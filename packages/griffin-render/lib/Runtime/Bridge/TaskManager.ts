import { ETaskType, ITaskEvent, EViewTask } from "../Interface/Task";

declare var global:{
    [k:string]:any
}


export class TaskManager{

    private static $inst:TaskManager = null

    private constructor(){}

    public static get instance(){
        this.$inst = this.$inst || new TaskManager
        return this.$inst
    }

    public init(){

    }

    public send(type:ETaskType,e:ITaskEvent){
        switch(type){
            case ETaskType.VIEW:
                this.$sendView(e)
            break
            case ETaskType.ROOT:
                this.$createRoot(e.nodeId)
            break
        }
    }

    private $sendView(e:ITaskEvent){
        switch(e.action){
            case EViewTask.CREATE_VIEW:
                this.$createView(e.nodeId,e.data)
            break
            case EViewTask.CREATE_LABEL:
                this.$createText(e.nodeId,e.data)
            break
            case EViewTask.ADD_SUBVIEW:
                this.$addSubview(e.parentId,e.nodeId)
            break
            case EViewTask.ADD_CHILD:
                this.$addChild(e.parentId || e.nodeId,e.data)
            break
            default:
            break
        }
    }

    private $createView(selfId:string,attr:any){
        console.log("createView call:" ,selfId, JSON.stringify(attr))
        return global.createView(selfId,attr)
    }

    private $createText(selfId:string,attr:any){
        console.log("createText call:" ,selfId, JSON.stringify(attr))
        return global.createLabel(selfId,attr)
    }

    private $addChild(parentId:string,childAttr:any){
        return global.$addChild && global.$addChild(parentId,childAttr)
    }

    private $addSubview(parentId:string,childId:string){
        console.log("addSubview call:",parentId,childId)
        return global.addSubview(parentId,childId)
    }

    private $createRoot(nodeId:string){
        console.log("createRoot call:",nodeId)
        return global.createRootView(nodeId)
    }
}