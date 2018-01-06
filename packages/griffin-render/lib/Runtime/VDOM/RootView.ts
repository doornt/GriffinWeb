import { TaskManager } from "../Bridge/TaskManager";
import { ETaskType, ITaskEvent } from "../Interface/Task";
import { generateID } from "../../Utils/NodeID";

export class RootView{

    private $instanceId = null

    private constructor(){
        this.$instanceId = generateID()
        TaskManager.instance.send(ETaskType.ROOT,{createRootData:{nodeId:this.$instanceId}})
    }

    public get id(){
        return this.$instanceId
    }

    public static create():RootView{
        return new RootView()
    }
}