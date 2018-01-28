const { BaseComponent, launchWithComponent } = require('../dist/gn.js')

let pugJson = require(__dirname + '/../examples/a.pug')

class TestAComponent extends BaseComponent {

    constructor() {
        super(pugJson)
    }

    clickclick() {
        console.log('clickclickclickclickclickclick')
    }
}

launchWithComponent(new TestAComponent())