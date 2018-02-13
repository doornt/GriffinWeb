import { H5Component, ETaskType, TaskManager, ITaskEvent, EViewTask } from "../Runtime/export";


export class Label extends H5Component {

    private $text = ""

    constructor() {
        super()
    }

    protected $parseAttrs() {
        super.$parseAttrs()
        for (let attr of this.$attrArray) {
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