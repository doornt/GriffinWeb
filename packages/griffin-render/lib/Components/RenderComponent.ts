import {IPugNode, IPugAttr} from "../Interface/INode"

export class RenderComponent{

    private $attrs:Array<IPugAttr>

    private $children:Array<RenderComponent> = []

    constructor(attrs:Array<IPugAttr>){
        this.$attrs = attrs ||  []
    }

    $render(){
        this.$children.map(item=>item.$render())
    }

    addChild(child:RenderComponent){
        this.$children.push(child)
    }

}
    