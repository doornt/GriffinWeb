import { IPugAttr } from "../Interface/INode";

import { RenderComponent ,ETaskType ,TaskManager,ITaskEvent,EViewTask} from "../Runtime/export";


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