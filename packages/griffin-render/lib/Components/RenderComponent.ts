import {IPugNode, IPugAttr} from "../Interface/INode"
import { NativeManager } from "../Native/index";


export class RenderComponent{

    protected $attrs:Array<IPugAttr>

    protected $children:Array<RenderComponent> = []

    protected $attr = {}

    protected $nativeView = null

    public get nativeView(){
        return this.$nativeView
    }

    constructor(attrs:Array<IPugAttr>){
        this.$attrs = attrs ||  []
        for(let attr of this.$attrs){
            attr.val = attr.val.replace(/\"/g,"")
            this.$buildAttr(attr)
        }
        this.createView()
    }

    protected createView(){
        this.$nativeView = NativeManager.createView(this.$attr)
    }

    $render(){
        this.$children.map(item=>item.$render())
    }

    addChild(child:RenderComponent){
        if(!child){
            return
        }
        this.$children.push(child)
        NativeManager.addSubview(this.$nativeView,child.nativeView)
    }

    protected $buildAttr(attr:IPugAttr){
        
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
    