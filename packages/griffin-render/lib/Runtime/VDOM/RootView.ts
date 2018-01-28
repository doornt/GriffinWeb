import { TaskManager } from "../Bridge/TaskManager";
import { ETaskType, ITaskEvent } from "../Interface/Task";
import { generateID } from "../../Utils/NodeID";
import { BaseComponent } from "../../gn";
import { RenderComponent } from "./RenderComponent";
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
    }

    public registerView(view: RenderComponent) {
        this.$views[view.id] = view
    }

    public handleEventFromNative(event: NativeEvent) {
        let view = this.$views[event.nodeId] as RenderComponent
        if (!view) {
            return
        }
        let handlerString = view.eventHandler(event.event)
        this.$component[handlerString] && this.$component[handlerString]()
    }
}