const BaseComponent = require('../lib/index').BaseComponent

class TestAComponent extends BaseComponent{
    
    constructor(){
        super(require('fs').readFileSync(__dirname + '/../examples/a.pug', 'utf8'))
    }

    render(){
        console.error(this.ast)
    }

    

    // click(e){

    // }
}

new TestAComponent()