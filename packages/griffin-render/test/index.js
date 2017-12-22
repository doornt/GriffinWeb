const BaseComponent = require('../lib/index').BaseComponent

let list = require(__dirname + '/../examples/a.pug')

class TestAComponent extends BaseComponent{
    
    constructor(){
        super(list)
    }

    render(){
        console.error(this.ast)
    }

    

    // click(e){

    // }
}

new TestAComponent()