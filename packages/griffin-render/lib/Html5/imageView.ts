import { H5Component, ETaskType, TaskManager, ITaskEvent, EViewTask } from "../Runtime/export";


export class ImageView extends H5Component {

    private $url = ""

    private $isLocalFile = false

    constructor() {
        super()
    }

    protected $parseAttrs() {
        super.$parseAttrs()
        for (let attr of this.$attrArray) {
            switch (attr.name) {
                case "src":{
                    if(attr.val.indexOf('assets://') == 0){
                        this.$isLocalFile = true
                    }
                    this.$url = attr.val
                    break
                }
            }
        }
    }

    protected $createView() {
        let props = <any>{}
        props.url = this.$url
        props.local = this.$isLocalFile
        super.$createView(props)
    }
}