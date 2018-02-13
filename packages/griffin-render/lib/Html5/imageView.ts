import { H5Component, ETaskType, TaskManager, ITaskEvent, EViewTask } from "../Runtime/export";


export class ImageView extends H5Component {

    private $url = ""

    constructor() {
        super()
    }

    protected $parseAttrs() {
        super.$parseAttrs()
        for (let attr of this.$attrArray) {
            switch (attr.name) {
                case "src":
                    this.$url = attr.val
                    break
            }
        }
    }

    protected $createView() {
        let props = <any>{}
        props.url = this.$url
        super.$createView(props)
    }
}