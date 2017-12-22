// module.exports = function(source){
//     var loaderContext = this;
//     var json = require('./compiler').compile(source)
//     loaderContext.callback(null,JSON.stringify(json))
// }

module.exports =  function loader(content){
    this.cacheable && this.cacheable();
    content = require('./compiler').compile(content)
    this.value = content;
    return "module.exports = " + JSON.stringify(content);
}