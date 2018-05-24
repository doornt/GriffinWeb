// module.exports = function(source){
//     var loaderContext = this;
//     var json = require('./compiler').compile(source)
//     loaderContext.callback(null,JSON.stringify(json))
// }

var postcss = require("postcss")
var gen = require("./generate-code")


module.exports = function loader(content, isDebug = false) {
    this.cacheable && this.cacheable();
    content = require('./compiler').compile(content)

    let styles = content.nodes.filter(node => node.name == "style")
    let AstFunc = gen(content)



    let strs = styles.map(node => {
        return node.block.nodes.map(n => n.val).join('')
    })
    let styleStr = strs.join('\n')

    let styleJson = postcss.parse(strs).nodes.map(node => {
        let attrs = {}
        node.nodes.map(n => {
            attrs[n.prop] = n.value
        })
        return {
            selector: node.selector,
            attrs: attrs
        }
    })

    let styleRuntime = 'let styleJson = ' + JSON.stringify(styleJson) + ';'
    let AstFuncRuntime = 'let AstFuncStr = ' + AstFunc;
    let runtime = ";let res = {style:styleJson,AstFunc:AstFuncStr}"
    if (isDebug) {
        return "(function(){" + styleRuntime + AstFuncRuntime + runtime + ";return res;})();";
    }
    // this.value = res;
    return styleRuntime + AstFuncRuntime + runtime + ";module.exports = res;";
}