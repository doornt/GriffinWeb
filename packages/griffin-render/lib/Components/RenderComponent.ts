import {IPugNode, IPugAttr} from "../Interface/INode"
import { NativeManager } from "../Native/index";

declare var consoleLog:any

export class RenderComponent{

    private $attrs:Array<IPugAttr>

    private $children:Array<RenderComponent> = []

    private $attr = {}

    public $nativeView = null

    constructor(attrs:Array<IPugAttr>){
        this.$attrs = attrs ||  []
        for(let attr of this.$attrs){
            this.$attr[attr.name] = isNaN(<any>attr.val)?attr.val:parseInt(attr.val)
        }
        consoleLog(JSON.stringify(this.$attr))
        this.$nativeView = NativeManager.createView(this.$attr)
    }

    $render(){
        this.$children.map(item=>item.$render())
    }

    addChild(child:RenderComponent){
        this.$children.push(child)
    }

}
    