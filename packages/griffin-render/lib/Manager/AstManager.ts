import {IPugBlock, IPugNode, IPugConditional} from "../Interface/INode"
import {BaseComponent} from "../Components/BaseComponent"
import {RenderComponent} from "../Components/RenderComponent"

export class AstManager{

    private $ast:IPugBlock


    private $inputData = {}

    constructor(ast:IPugBlock){
        this.$ast = ast
    }

    compile(data){
        this.$inputData = data || {}

        let root:RenderComponent = null

        let children = []
        for(let node of this.$ast.nodes){
            children.push(this.$visitNode(node))
        }

        if(children.length > 1){
            root = new RenderComponent(null)
            for(let child of children){
                root.addChild(child)
            }
        }else{
            root = children[0]
        }
      
        return root
        
    }

    private $visitNode(node:IPugNode|IPugConditional|IPugBlock){
        let view = null
        switch(node.type){
            case "block":
                view = this.$visitBlock(node as IPugBlock)
            break
                
            default:
                view = this.$visitTag(node as IPugNode)
                view.addChild(new AstManager((<IPugNode>node).block).compile(this.$inputData))
            break
        }
        return view
    }

    private $visitBlock(node:IPugBlock){

    }

    private $visitTag(node:IPugNode){
        let view = null
        switch(node.name){
            default:
                view = new RenderComponent(node.attrs)
            break
        }
        return view
    }
}