class TestAComponent{
    
    constructor(){
        this._pugStr = require('fs').readFileSync(__dirname + '/a.pug', 'utf8')
        this.ast = require('../lib').compile(this._pugStr)
        this.render()

        // this.setEvent(".test","click",()=>{})
    }

    render(){
        console.error(this.ast)
    }

    

    // click(e){

    // }
}

new TestAComponent()