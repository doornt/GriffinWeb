import { H5Component, ETaskType, TaskManager, ITaskEvent, EViewTask } from "../Runtime/export";


export class ImageView extends H5Component {

    private $url = ""

    constructor(tag:string,attrs: any, styles) {
        super(tag,attrs, styles)
    }

    protected $parseAttrs() {
        super.$parseAttrs()
        for (let attr of this.$attrs) {
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