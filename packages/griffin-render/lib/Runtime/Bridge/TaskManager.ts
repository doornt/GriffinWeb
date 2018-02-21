import { ETaskType, ITaskEvent, EViewTask, ICreateData } from "../Interface/Task";

declare var global: {
    [k: string]: any
}


export class TaskManager {

    private $rootViewId:string

    private constructor(id:string) { 
        this.$rootViewId = id
    }

    public static create(id:string) {
        return new TaskManager(id)
    }

    public send(type: ETaskType, e?: ITaskEvent) {
        if (!global.Environment || global.Environment == 'web') {
            return
        }
        switch (type) {
            case ETaskType.VIEW:
                this.$sendView(e)
                break
            case ETaskType.ROOT:
                this.$createRoot()
                break
        }
    }

    private $sendView(e: ITaskEvent) {
        switch (e.action) {
            case EViewTask.CREATE_VIEW:
                this.$createView(e.createData)
                break

            case EViewTask.ADD_VIEWS:
                this.$addSubview(e.addViewsData)
                break
            case EViewTask.REMOVE_CHILDREN:
                this.$removeChildren(e.removeViewsData)

            default:
                break
        }
    }

    private $createView(data: ICreateData) {
        console.log("create view",JSON.stringify(data))
        return global.createElement(this.$rootViewId,data.nodeId, data)
    }


    private $addSubview({ ids, parentId }) {
        console.log("addSubview view",parentId,ids)
        return global.addViews(this.$rootViewId,parentId, ids)
    }

    private $createRoot() {
        return global.createRootView(this.$rootViewId)
    }

    private $removeChildren({nodeId,rootId}){
        console.log("remove children",nodeId)
        return global.removeChildren(rootId,nodeId)

    }
}