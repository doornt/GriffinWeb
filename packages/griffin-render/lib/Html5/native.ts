import { H5Component, ETaskType, TaskManager, ITaskEvent, EViewTask } from "../Runtime/export";

export class NativeTag extends H5Component {

    private $props = {}

    constructor() {
        super()
    }

    protected $parseAttrs() {
        super.$parseAttrs()
        for (let attr of this.$attrArray) {
            this.$props[attr.name] = attr.val
        }
    }

    protected $createView() {
        super.$createView(this.$props)
    }

    
}