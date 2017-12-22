const path = require('path');

const config = {
    entry: './test/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
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

module.exports = config;