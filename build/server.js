const http = require('http');
const fs = require('fs');
const mime = require('mime');

//const game = require('./classes/game.js');


const routes = {
    // static: [
    //     '/index.html', '/', '/main.css', '/script.js', '/img/back.png'
    // ],
    static: ['\/*\.html'],
    api: [
        '/new', '/try', '/flee', '/percents', '/half'
    ]
}

const server = http.createServer((req, res) => {

    if (routes.static.indexOf(req.url) != -1) {
        //console.log('static: ' + req.url);
        console.log(regexMatchOneOf(req.url, routes.static));
        serveStatic(req.url, res);
    } else if (routes.api.indexOf(req.url) != -1) {
        console.log('api: ' + req.url);
    } else {
        console.log('wrong call' + req.url);
    }

});

server.listen(4444);

function serveStatic(url, res) {

    // resource = (url != '/') ? substr(1, url.length - 1) : 'index.html';
    let path = './build';
    let resource = (url != '/')
        ? path + url
        : path + '/index.html';

    console.log(resource);

    fs.readFile(resource, (error, data) => {
        if (error) console.log(error);
        console.log('file read successfully');
        res.statusCode = 200;
        res.setHeader('Content-type', getMimeType(resource));
        //console.log(data.toString());
        res.end(data);
    });
}

function getMimeType(resource) {
    var ext = resource.substring(resource.lastIndexOf('.'));
    console.log(resource);
    console.log(ext);
    return mime.getType(ext);
}

function regexMatchOneOf(string, patterns) {
    let regex = new RegExp(string);
    for (let i = 0; i < patterns.length; i++) {
        if (regex.test(string))
            return true;
    }
    return false;
}