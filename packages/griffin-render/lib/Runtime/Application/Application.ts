import { setup } from "./setup";
import { BaseComponent } from "../../gn";
import { TaskManager } from "../Bridge/TaskManager";
import { RootView } from "../VDOM/RootView";
import { ETaskType, ITaskEvent, EViewTask } from "../Interface/Task";
import * as Html5 from "../../Html5/index"

export class Application{
    private static $inst = null

    private  $root:RootView = null

    private constructor(){}

    public static get instance(){
        if(!this.$inst){
            this.$inst = new Application
        }
        return this.$inst
    }

    public static get env(){
        return (<any>global).Environment
    }

    public init(){
        setup()
        TaskManager.instance.init()
        Html5.setup()
        this.$root = RootView.create()
    }

    public runWithModule(view:BaseComponent){
        TaskManager.instance.send(ETaskType.VIEW,<ITaskEvent>{
            action:EViewTask.ADD_SUBVIEW,
            addSubviewData:{parentId:this.$root.id,nodeId:view.id}
        })
    }
}