var g_classes = {}

class RenderComponet{

}

exports.BaseComponent = class BaseComponent{

    constructor(pugStr){
        g_classes[this.constructor.name] = this.constructor
        this._pugStr = pugStr
        this._nodes = require('../../griffin-compile/lib').compile(this._pugStr)
        this.init()
    }

    init(){
        
    }
}