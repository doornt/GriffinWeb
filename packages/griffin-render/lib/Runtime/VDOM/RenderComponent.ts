// import {IPugNode, IPugAttr} from "../../Interface/INode"
import { TaskManager } from "../Bridge/TaskManager";
import { ETaskType, EViewTask, ITaskEvent } from "../Interface/Task";
import { generateID } from "../../Utils/NodeID";
import { IDOMAtrr } from "../../Interface/INode";

export abstract class RenderComponent {

    protected $attrs: Array<IDOMAtrr>

    protected $children: Array<RenderComponent> = []

    protected $styles = {}

    protected $instanceId: string = null

    protected $click: string = null

    protected $name:string

    protected $created:boolean = false

    constructor(tag:string,attrs: Array<IDOMAtrr>, styles: any) {
        this.$name = tag
        this.$attrs = attrs || []
        this.$instanceId = generateID()


        for (let k in styles) {
            let v = styles[k]
            this.$styles[k] = isNaN(v) ? v : +v
        }
        this.$parseAttrs()
        this.$createView()

    }

    public get id() {
        return this.$instanceId
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
            createData: { nodeId: this.id, styles: this.$styles,props, type: this.$name }
        })
        this.$created = true
    }

    protected $render() {
        this.$children.map(item => item.$render())
    }

    public addChild(child: RenderComponent) {
        if (!child) {
            return
        }
        this.$children.push(child)
        TaskManager.instance.send(ETaskType.VIEW, {
            action: EViewTask.ADD_SUBVIEW,
            addSubviewData: { nodeId: child.id, parentId: this.id }
        })
    }

    public eventHandler(type: string) {
        if (type === "click") {
            return this.$click
        }
        return null
    }
}
