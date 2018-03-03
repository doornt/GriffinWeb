import { generateID } from "../../Utils/NodeID";
import { IDOMAtrr } from "../../Interface/INode";
import { EventDispatcher } from '../../Event/EventDispatcher';
import { RenderNode } from './RenderNode';

export abstract class H5Component extends RenderNode{

    protected $instanceId: string = null

    protected $click: string = null

    protected $created:boolean = false

    constructor() {
        super()
        this.id = generateID()
    }

    protected setupView(){
        this.$parseAttrs()
        this.$createView()
    }

    protected $parseAttrs() {
        for (let attr of this.$attrArray) {
            switch (attr.name) {
                case "width":
                case "height":
                case "left":
                case "top":
                    let n = parseInt(attr.val)
                    this.$style[attr.name] = n
                    break
                case "@click":
                    this.$click = attr.val
                    break
            }
        }
    }




    protected $createView(props:any = {}) {
        if(this.$created){
            return
        }
        if(this.$click){
            props["clickable"] = true
        }

        this.$ctx.task.postMessage('view',{ nodeId: this.id, styles: this.$style, props, type: this.tagName })
        this.$created = true
    }

    protected $render() {
        // this.children.map(item => item.$render())
    }


    public $onNativeEvent(type:string){
        let masterEvent:string = null
        if(type == "click"){
            masterEvent = this.$click
        }
        if(!masterEvent){
            return console.error("cannot read event from native")
        }

        if(!this.$master){
            return console.error("component not found!")
        }

        let fn:Function = this.$master[masterEvent]

        if(!fn){
            return console.error(`event ${masterEvent} not registered`)
        }

        fn.call(this.$master)
    }

}
