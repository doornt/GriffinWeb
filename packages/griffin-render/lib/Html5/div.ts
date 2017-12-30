import { RenderComponent ,ETaskType ,TaskManager,ITaskEvent,EViewTask} from "../Runtime/export";
import { IPugAttr } from "../Interface/INode";

export class Div extends RenderComponent{

    constructor(attrs:Array<IPugAttr>,styles){
        super(attrs,styles)
    }

    public createView(){
        TaskManager.instance.send(ETaskType.VIEW,<ITaskEvent>{
            action:EViewTask.CREATE_VIEW,
            nodeId:this.id,
            data:this.$styles
        })
    }

}