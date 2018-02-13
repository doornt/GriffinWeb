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

            case EViewTask.ADD_SUBVIEW:
                this.$addSubview(e.addSubviewData)
                break

            default:
                break
        }
    }

    private $createView(data: ICreateData) {
        return global.createElement(this.$rootViewId,data.nodeId, data)
    }


    private $addSubview({ parentId, nodeId }) {
        return global.addSubview(this.$rootViewId,parentId, nodeId)
    }

    private $createRoot() {
        return global.createRootView(this.$rootViewId)
    }
}