import { TaskManager } from "../Bridge/TaskManager";
import { ETaskType, ITaskEvent, EViewTask } from "../Interface/Task";
import { generateID } from "../../Utils/NodeID";
import { BaseComponent } from "../../gn";
import { H5Component } from "./H5Component";
import { NativeEvent } from "../Interface/NativeEvent";

export class RootView {

    private $instanceId = null

    private $component: BaseComponent = null

    private $views: { [id: string]: any } = {}

    private constructor() {
        this.$instanceId = generateID()
        TaskManager.instance.send(ETaskType.ROOT, { createRootData: { nodeId: this.$instanceId } })
    }

    public get id() {
        return this.$instanceId
    }

    public static create(): RootView {
        return new RootView()
    }

    public set component(_component: BaseComponent) {
        this.$component = _component
        TaskManager.instance.send(ETaskType.VIEW, <ITaskEvent>{
            action: EViewTask.ADD_SUBVIEW,
            addSubviewData: { parentId: this.id, nodeId: this.$component.id }
        })
    }


}