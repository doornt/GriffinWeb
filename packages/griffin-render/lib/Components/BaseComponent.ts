
import {IPugNode, IPugBlock} from "../Interface/INode"
import {ComponentManager} from "../Manager/ComponentManager"
import {AstManager} from "../Manager/AstManager"
import { generateID } from "../Utils/NodeID";
import { RenderComponent } from "../Runtime/VDOM/RenderComponent";

export class BaseComponent{

    private $ast:AstManager

    private $view:RenderComponent

    constructor(ast:IPugBlock){
        this.$ast = new AstManager(ast)
        this.$rebuildAst()
        this.init()
        this.viewDidLoad()
    }

    $rebuildAst(){
        let children = this.$ast.compile({})
        if(children.length == 1 ){
            this.$view = children[0]
        }else{
            this.$view = ComponentManager.instance.createViewByTag("div",[])
            for(let child of children){
                this.$view.addChild(child)
            }
        }
    }


    public get id(){
        return this.$view.id
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