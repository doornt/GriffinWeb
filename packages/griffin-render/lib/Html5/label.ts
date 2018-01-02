import { RenderComponent ,ETaskType ,TaskManager,ITaskEvent,EViewTask} from "../Runtime/export";


export class Label extends RenderComponent{

    private $text = ""

    constructor(attrs:any,styles){
       super(attrs,styles)
    }

    protected parseAttrs(){
        for(let attr of this.$attrs){
            switch(attr.name){
                case "text":
                    this.$text = attr.val
                break
            }
        }
    }

    protected createView(){
        let data = Object.create(this.$styles)
        data.text = this.$text
        TaskManager.instance.send(ETaskType.VIEW,<ITaskEvent>{
            action:EViewTask.CREATE_LABEL,
            nodeId:this.id,
            data:data
        })
    }
}