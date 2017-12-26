import { setup } from "./setup";
import { BaseComponent } from "../../gn";
import { TaskManager } from "../Bridge/TaskManager";
import { RootView } from "../VDOM/RootView";
import { ETaskType, ITaskEvent } from "../Interface/Task";

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

    public static init(){
        setup()
        TaskManager.instance.init()
        RootView.create()
    }

    public runWithModule(view:BaseComponent){
        TaskManager.instance.send(ETaskType.VIEW,<ITaskEvent>{
            parentId:this.$root.id,
            nodeId:view.id
        })
    }
}