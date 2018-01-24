import { RenderComponent, ETaskType, TaskManager, ITaskEvent, EViewTask } from "../Runtime/export";


export class Label extends RenderComponent {

    private $text = ""

    constructor(attrs: any, styles) {
        super(attrs, styles)
        console.log('la', styles)
    }

    protected parseAttrs() {
        super.parseAttrs()
        for (let attr of this.$attrs) {
            switch (attr.name) {
                case "text":
                    this.$text = attr.val
                    break
            }
        }
    }

    protected createView() {
        let data = Object.assign(this.$styles, {text: this.$text})
        TaskManager.instance.send(ETaskType.VIEW, <ITaskEvent>{
            action: EViewTask.CREATE_VIEW,
            createData: { nodeId: this.id, styles: data, type: "label" }
        })
    }
}