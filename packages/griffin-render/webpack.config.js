const path = require('path');
let output = path.resolve(__dirname, 'dist')

module.exports = env =>{

    if(env && env.NODE_ENV == "xcode"){
        output = path.resolve(__dirname,"../../../griffin/ios/Example/GriffinSDK")
    }

    return {
        devtool: 'eval-source-map',
        entry: './test/index.js',
        output: {
            path: output,
            filename: 'bundle.js'
        },
        resolveLoader: {
            alias: {
              "griffin-loader": path.join(__dirname, "../griffin-loader/lib/index.js")
            }
        },
        module: {
            rules: [
                { test: /\.pug$/, use: 'griffin-loader' },
                { test: /\.ts$/, use: 'ts-loader' }
                
            ]
        }
    };
    
}