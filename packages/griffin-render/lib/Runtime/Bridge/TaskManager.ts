import { ETaskType, ITaskEvent, EViewTask, ICreateData } from "../Interface/Task";

declare var global: {
    [k: string]: any
}


export class TaskManager {

    private static $inst: TaskManager = null

    private constructor() { }

    public static get instance() {
        this.$inst = this.$inst || new TaskManager
        return this.$inst
    }

    public init() {

    }

    public send(type: ETaskType, e: ITaskEvent) {
        if (!global.Environment || global.Environment == 'web') {
            return
        }
        switch (type) {
            case ETaskType.VIEW:
                this.$sendView(e)
                break
            case ETaskType.ROOT:
                this.$createRoot(e.createRootData.nodeId)
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
        return global.createElement(data.nodeId, data)
    }


    private $addSubview({ parentId, nodeId }) {
        return global.addSubview(parentId, nodeId)
    }

    private $createRoot(nodeId: string) {
        return global.createRootView(nodeId)
    }
}