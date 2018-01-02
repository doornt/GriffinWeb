import { RenderComponent ,ETaskType ,TaskManager,ITaskEvent,EViewTask} from "../Runtime/export";

export class Div extends RenderComponent{

    constructor(attrs:any,styles){
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