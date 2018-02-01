const { BaseComponent, launchWithComponent } = require('../dist/gn.js')

let pugJson = require(__dirname + '/../examples/a.pug')

class TestAComponent extends BaseComponent {

    constructor() {
        super(pugJson)
    }

    clickclick() {
        global.navigator.push({
            url: 'http://dotwe.org/raw/dist/519962541fcf6acd911986357ad9c2ed.js',
            animated: true
        }, event => {
            modal.toast({ message: 'callback: ' + event })
        })
    }
}

launchWithComponent(new TestAComponent())