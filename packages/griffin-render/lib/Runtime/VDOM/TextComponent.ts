import { RenderComponent } from "./RenderComponent";
import { IPugAttr } from "../../Interface/INode";
import { TaskManager } from "../Bridge/TaskManager";
import { ETaskType ,ITaskEvent, EViewTask} from "../Interface/Task";


export class TextComponent extends RenderComponent{
    constructor(attrs:Array<IPugAttr>){
       super(attrs)
    }

    protected createView(){
    
        TaskManager.instance.send(ETaskType.VIEW,<ITaskEvent>{
            action:EViewTask.CREATE_LABEL,
            nodeId:this.id,
            data:this.$attr

        })
    }
}