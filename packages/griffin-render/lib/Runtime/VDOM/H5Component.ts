// import {IPugNode, IPugAttr} from "../../Interface/INode"
import { TaskManager } from "../Bridge/TaskManager";
import { ETaskType, EViewTask, ITaskEvent } from "../Interface/Task";
import { generateID } from "../../Utils/NodeID";
import { IDOMAtrr } from "../../Interface/INode";
import { EventDispatcher } from '../../Event/EventDispatcher';
import { RenderNode } from './RenderNode';

export abstract class H5Component extends RenderNode{

    protected $attrs: Array<IDOMAtrr>

    protected $styles = {}

    protected $instanceId: string = null

    protected $click: string = null

    protected $created:boolean = false

    constructor(tag:string,attrs: Array<IDOMAtrr>, styles: any) {

        super()

        this.tagName = tag
        this.id = generateID()
        
        this.$attrs = attrs || []
        for (let k in styles) {
            let v = styles[k]
            this.$styles[k] = isNaN(v) ? v : +v
        }
        this.$parseAttrs()
        this.$createView()
    }

    protected $parseAttrs() {
        for (let attr of this.$attrs) {
            switch (attr.name) {
                case "width":
                case "height":
                case "left":
                case "top":
                    let n = parseInt(attr.val)
                    this.$styles[attr.name] = n
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
        TaskManager.instance.send(ETaskType.VIEW, <ITaskEvent>{
            action: EViewTask.CREATE_VIEW,
            createData: { nodeId: this.id, styles: this.$styles,props, type: this.tagName }
        })
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
        if(masterEvent && this.$master &&  this.$master[masterEvent]){
            this.$master[masterEvent]()
        }
    }

}
