import {IPugNode} from "../Interface/INode"

export class RenderComponent{

    private $node:IPugNode

    private $children:Array<RenderComponent> = []

    constructor(node:IPugNode){
        this.$node = node
        this.$children = node.children.map(n=>new RenderComponent(n))
    }

    $render(){
        this.$children.map(item=>item.$render())
    }

}
    