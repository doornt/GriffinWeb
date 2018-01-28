import { setup } from "./setup";
import { BaseComponent } from "../../gn";
import { TaskManager } from "../Bridge/TaskManager";
import { RootView } from "../VDOM/RootView";
import { ETaskType, ITaskEvent, EViewTask } from "../Interface/Task";
import * as Html5 from "../../Html5/index"
import { RenderComponent } from "../VDOM/RenderComponent";
import { NativeEvent } from "../Interface/NativeEvent";

export class Application {
    private static $inst = null

    private $root: RootView = null

    private constructor() { }

    public static get instance() {
        if (!this.$inst) {
            this.$inst = new Application
        }
        return this.$inst
    }

    public static get env() {
        return (<any>global).Environment
    }

    public init() {
        setup()
        TaskManager.instance.init()
        Html5.setup()
        this.$root = RootView.create()
    }

    public runWithModule(view: BaseComponent) {
        this.$root.component = view
        TaskManager.instance.send(ETaskType.VIEW, <ITaskEvent>{
            action: EViewTask.ADD_SUBVIEW,
            addSubviewData: { parentId: this.$root.id, nodeId: view.id }
        })
    }

    public registerView(view: RenderComponent) {
        this.$root.registerView(view)
    }

    public handleEventFromNative(rootviewId: string, event: NativeEvent) {
        if (rootviewId !== this.$root.id) {
            return
        }
        console.log("application", JSON.stringify(event))
        this.$root.handleEventFromNative(event)
    }
}