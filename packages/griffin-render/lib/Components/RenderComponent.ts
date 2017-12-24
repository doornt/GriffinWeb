import {IPugNode, IPugAttr} from "../Interface/INode"
import { NativeManager } from "../Native/index";


export class RenderComponent{

    private $attrs:Array<IPugAttr>

    private $children:Array<RenderComponent> = []

    private $attr = {}

    private $nativeView = null

    public get nativeView(){
        return this.$nativeView
    }

    constructor(attrs:Array<IPugAttr>){
        this.$attrs = attrs ||  []
        for(let attr of this.$attrs){
            this.$buildAttr(attr)
        }
        this.$nativeView = NativeManager.createView(this.$attr)
    }

    $render(){
        this.$children.map(item=>item.$render())
    }

    addChild(child:RenderComponent){
        this.$children.push(child)
    }

    private $buildAttr(attr:IPugAttr){
        
        switch(attr.name){
            case "width":
            case "height":
            case "left":
            case "top":
                let n = parseInt(attr.val)
                this.$attr[attr.name] = n
            break
            default:
                this.$attr[attr.name] = attr.val
        }

    }

}
    