const http = require('http');
const lib = require('./lib.js');
const static = require('./static.js');
const api = require('./api.js');

const routes = {
    static: [
        /^\/$/i,
        /\.html$/i,
        /\.css$/i,
        /^\/js\/[\S\s]+\.jd$/i,
        /^\/img\/.*/i,
        /^\/fonts\/.*/i
    ],
    api: [
        '/new', '/try', '/flee', '/percents', '/half'
    ]
}

const server = http.createServer((request, response) => {

    if (lib.regexMatchOneOf(request.url, routes.static)) {
        console.log('serving ' + request.url);
        static.serve(request, response);

    } else if (routes.api.indexOf(request.url) != -1) {

        api[request.url.substring(1)](request, response);

    } else {
        //console.log('wrong route! ' + request.url);
        //reportError(request, response);

    }
});

server.listen(4444);