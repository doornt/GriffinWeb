import { H5Component, ETaskType, TaskManager, ITaskEvent, EViewTask } from "../Runtime/export";
import { RenderNode } from '../Runtime/DOM/RenderNode';

export class Slider extends H5Component {

    private $auto = false
    private $interval = 0

    constructor() {
        super()
    }

    protected $parseAttrs() {
        super.$parseAttrs()
        for (let attr of this.$attrArray) {
            switch(attr.name){
                case "interval":{
                    this.$interval = +attr.val
                    break
                }
                case "auto-play":{
                    this.$auto = attr.val
                    break
                }
            }
        }
    }

    protected $createView() {
        let props = {
            interval:this.$interval,
            "auto-play":this.$auto
        }
        super.$createView(props)
    }
    
}