
import {IPugNode, IPugBlock} from "../Interface/INode"
import {ComponentManager} from "../Manager/ComponentManager"
import {AstManager} from "../Manager/AstManager"
import { generateID } from "../Utils/NodeID";
import { RenderComponent } from "../Runtime/VDOM/RenderComponent";

export class BaseComponent{

    private $ast:AstManager

    private $view:RenderComponent

    private $instanceId = null

    constructor(ast:IPugBlock){
        ComponentManager.instance.autoRegister(this.constructor.name,this.constructor)
        this.$ast = new AstManager(ast)
        this.$instanceId = generateID()
        this.$rebuildAst()
        this.init()
        this.viewDidLoad()
    }

    $rebuildAst(){
        let children = this.$ast.compile({})
        if(children.length == 1 ){
            this.$view = children[0]
        }else{
            this.$view = new RenderComponent(null)
            for(let child of children){
                this.$view.addChild(child)
            }
        }
    }


    public get id(){
        return this.$instanceId
    }

    init(){
        // this.$renders = this.$nodes.map(node=>{
        //     return new RenderComponent(node)
        // })

        console.log(global)

        setTimeout(() => {
            console.log("timeout")
        }, 1000);
    }

    viewDidLoad(){
        // this.$renders.map(item=>item.$render())
    }

    
}