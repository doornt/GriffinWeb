import { RenderComponent, ETaskType, TaskManager, ITaskEvent, EViewTask } from "../Runtime/export";

export class Div extends RenderComponent {

    constructor(attrs: any, styles) {
        super(attrs, styles)
        console.log("div", JSON.stringify(attrs), JSON.stringify(styles))
    }

    public createView() {
        console.log("create div")
        TaskManager.instance.send(ETaskType.VIEW, <ITaskEvent>{
            action: EViewTask.CREATE_VIEW,
            createData: { nodeId: this.id, styles: this.$styles, type: "div" }
        })
    }

}