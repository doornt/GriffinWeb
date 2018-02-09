import { setup } from "./setup";
import { TaskManager } from "../Bridge/TaskManager";
import { ETaskType, ITaskEvent, EViewTask } from "../Interface/Task";
import * as Html5 from "../../Html5/index"
import { H5Component } from "../VDOM/H5Component";
import { NativeEvent } from "../Interface/NativeEvent";
import { RootView } from '../VDOM/RootView';
import { BaseComponent } from '../../Components/BaseComponent';
import { RenderNode } from "../VDOM/RenderNode";

export class Application {
    private static $inst = null

    private $views:{
        [key:number]:RootView|RenderNode
    } = {}

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
    }

    public registerRootView(v:RootView){
        this.$views[v.id] = v
    }

    public registerComponent(comp:RenderNode){
        this.$views[comp.id] = comp
    }

    public handleEventFromNative(vid: string, event: NativeEvent) {
        if(!this.$views[vid]){
            return console.error("unexpected view id",vid)
        }
        let view = this.$views[vid]
      
        if(view instanceof RootView){
            view[event.event] && view[event.event]()
        }else if(view instanceof RenderNode){
            (view as RenderNode).$onNativeEvent(event.event)
        }
        // this.$views[rootviewId].handleEventFromNative(event)
    }

   
}