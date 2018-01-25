let express = require('express');
let app = express();
let fs = require('fs');
let watchFile = require('./watch-file.js')

let eventEmitter = watchFile.eventEmitter

function getFileContent(string) {
    return fs.readFileSync(string, 'utf-8');
}

app.get('/', function (req, res, next) {
    if (req.query.isFirst === "1") {
        let bundleContent = getFileContent("./dist/bundle.js");
        res.json({ data: bundleContent })
    } else {
        next()
    }
})

app.use(function (req, res, next) {
    eventEmitter.on('fileChanged', function () {
        console.log('Begin Response')
        let bundleContent = getFileContent("./dist/bundle.js");
        res.json({ data: bundleContent })
    });
});

let server = app.listen(8081, function () {

    let host = server.address().address
    let port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})