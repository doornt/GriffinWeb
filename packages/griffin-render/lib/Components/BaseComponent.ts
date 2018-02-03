
// import {IPugNode, IPugBlock, IStyle} from "../Interface/INode"
import { ComponentManager } from "../Manager/ComponentManager"
import { DOMAstManager } from "../Manager/DOMAstManager"
import { generateID } from "../Utils/NodeID";
import { RenderComponent } from "../Runtime/VDOM/RenderComponent";

export class BaseComponent {

    private $ast: Function

    private $view: RenderComponent

    protected $styles: any

    constructor(pugJson: any) {
        this.$ast = pugJson.AstFunc
        this.$styles = pugJson.style
        this.init()
        this.$render()
    }

    $render() {
        this.$rebuildAst()
    }

    $rebuildAst() {
        let compileJson = this.$ast({ test: true, list: [1, 2, 3, 4, 5] })
        let children = new DOMAstManager(compileJson, this.$styles).compile()
        if (children.length == 1) {
            this.$view = children[0]
        } else {
            this.$view = ComponentManager.instance.createViewByTag("div", [], {})
            for (let child of children) {
                this.$view.addChild(child)
            }
        }
        // console.log('this.view', JSON.stringify(this.$view))
    }



    public get id() {
        return this.$view.id
    }

    init() {
    }

    viewDidLoad() {
        // this.$renders.map(item=>item.$render())
    }


}