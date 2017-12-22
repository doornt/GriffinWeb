var g_classes = {}

class RenderComponet{
    constructor(node){
        this._node = node
        this._children = node.children.map(n=>new RenderComponet(n))
    }

    $render(){
        this._children.map(item=>$render())
    }
}

exports.BaseComponent = class BaseComponent{

    constructor(pugJson){
        g_classes[this.constructor.name] = this.constructor
        this._nodes = pugJson
        this.init()
        this.viewDidLoad()
    }

    init(){
        this.renders = this._nodes.map(node=>{
            return new RenderComponet(node)
        })
    }

    viewDidLoad(){
        this.renders.map(item=>item.$render())
    }
}