import { H5Component, ETaskType, TaskManager, ITaskEvent, EViewTask } from "../Runtime/export";


export class Label extends H5Component {

    private $text = ""

    constructor(tag,attrs: any, styles) {
        super(tag,attrs, styles)
    }

    protected $parseAttrs() {
        super.$parseAttrs()
        for (let attr of this.$attrs) {
            switch (attr.name) {
                case "text":
                    this.$text = attr.val
                    break
            }
        }
    }

    protected $createView() {
        super.$createView({text:this.$text})
    }
}