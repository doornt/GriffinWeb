
import {RenderComponent} from "./RenderComponent"
import {IPugNode, IPugBlock} from "../Interface/INode"
import {ComponentManager} from "../Manager/ComponentManager"
import {AstManager} from "../Manager/AstManager"

export class BaseComponent{

    private $ast:AstManager

    private $view:RenderComponent

    constructor(ast:IPugBlock){
        ComponentManager.instance.autoRegister(this.constructor.name,this.constructor)
        this.$ast = new AstManager(ast)
        this.$rebuildAst()
        this.init()
        this.viewDidLoad()
    }

    $rebuildAst(){
        this.$view = this.$ast.compile({})
    }

    init(){
        // this.$renders = this.$nodes.map(node=>{
        //     return new RenderComponent(node)
        // })
    }

    viewDidLoad(){
        // this.$renders.map(item=>item.$render())
    }
}