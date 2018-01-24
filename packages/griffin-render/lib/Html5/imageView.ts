import { RenderComponent, ETaskType, TaskManager, ITaskEvent, EViewTask } from "../Runtime/export";


export class ImageView extends RenderComponent {

    private $url = ""

    constructor(attrs: any, styles) {
        super(attrs, styles)
    }

    protected parseAttrs() {
        super.parseAttrs()
        for (let attr of this.$attrs) {
            switch (attr.name) {
                case "src":
                    this.$url = attr.val
                    break
            }
        }
    }

    protected createView() {
        let data = Object.create(this.$styles)
        data.url = this.$url
        TaskManager.instance.send(ETaskType.VIEW, <ITaskEvent>{
            action: EViewTask.CREATE_VIEW,
            createData: { nodeId: this.id, styles: data, type: "img" }
        })
    }
}