// module.exports = function(source){
//     var loaderContext = this;
//     var json = require('./compiler').compile(source)
//     loaderContext.callback(null,JSON.stringify(json))
// }

var postcss = require("postcss")

module.exports =  function loader(content){
    this.cacheable && this.cacheable();
    content = require('./compiler').compile(content)
    let styles = content.nodes.filter(node=>node.name == "style")
    let htmls = content.nodes.filter(node=>node.name != "style")
    let strs = styles.map(node=>{
        return node.block.nodes.map(n=>n.val).join('')
    })
    let styleStr = strs.join('\n')
    // let res = processCss(styleStr,null,{query:{}},(err,result)=>{
    //     console.error(result)
    // })
    let styleJson = postcss.parse(strs).nodes.map(node=>{
        let attrs = {}
        node.nodes.map(n=>{
            attrs[n.prop] = n.value
        })
        return {
            selector:node.selector,
            attrs:attrs
        }
    })
    let res ={
        htmls,
        styles:styleJson
    }
    this.value = res;
    return "module.exports = " + JSON.stringify(res);
}