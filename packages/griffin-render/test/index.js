const {BaseComponent,launchWithComponent} = require('../dist/gn.js')

let list = require(__dirname + '/../examples/a.pug')

class TestAComponent extends BaseComponent{
    
    constructor(){
        super(list)
    }

    render(){
        console.error(this.ast)
    }
}

launchWithComponent(new TestAComponent())