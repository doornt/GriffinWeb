import { setup } from "./setup";
import { TaskManager } from "../Bridge/TaskManager";
import { ETaskType, ITaskEvent, EViewTask } from "../Interface/Task";
import * as Html5 from "../../Html5/index"
import { H5Component } from "../DOM/H5Component";
import { NativeEvent } from "../Interface/NativeEvent";
import { RootView } from '../DOM/RootView';
import { BaseComponent } from '../../Components/BaseComponent';
import { RenderNode } from "../DOM/RenderNode";

export class Application {
    private static $inst = null

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
        Html5.setup()
    }

   

   
}