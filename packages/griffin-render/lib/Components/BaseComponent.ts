
import {RenderComponent} from "./RenderComponent"
import {IPugNode} from "../Interface/INode"
import {ComponentManager} from "../Manager/ComponentManager"

export class BaseComponent{

    private $nodes:Array<IPugNode> = []

    private $renders:Array<RenderComponent> = []

    constructor(pugJson:Array<IPugNode>){
        ComponentManager.instance.autoRegister(this.constructor.name,this.constructor)
        this.$nodes = pugJson
        this.init()
        this.viewDidLoad()
    }

    init(){
        this.$renders = this.$nodes.map(node=>{
            return new RenderComponent(node)
        })
    }

    viewDidLoad(){
        this.$renders.map(item=>item.$render())
    }
}