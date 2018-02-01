import { RenderComponent, ETaskType, TaskManager, ITaskEvent, EViewTask } from "../Runtime/export";

export class Div extends RenderComponent {

    constructor(attrs: any, styles) {
        super(attrs, styles)
    }

    public createView() {
        let data = Object.assign(this.$styles, { click: this.$click })
        TaskManager.instance.send(ETaskType.VIEW, <ITaskEvent>{
            action: EViewTask.CREATE_VIEW,
            createData: { nodeId: this.id, styles: data, type: "div" }
        })
    }

}