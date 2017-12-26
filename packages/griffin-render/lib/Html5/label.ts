import { RenderComponent } from "../Runtime/VDOM/RenderComponent";
import { IPugAttr } from "../Interface/INode";
import { TaskManager } from "../Runtime/Bridge/TaskManager";
import { ETaskType ,ITaskEvent, EViewTask} from "../Runtime/Interface/Task";


export class Label extends RenderComponent{
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