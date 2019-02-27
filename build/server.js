const http = require('http');
const url = require('url');

const lib = require('./lib.js');
const static = require('./static.js');
const gameController = require('./game/gameController.js');

const routes = {
    static: [
        /^\/$/i,
        /\.html$/i,
        /\.css$/i,
        /^\/js\/[\S\s]+\.jd$/i,
        /^\/img\/.*/i,
        /^\/fonts\/.*/i
    ],
    api: /\/api\/.*/i
}

const server = http.createServer( (request, response) => {

    if (lib.regexMatchOneOf(request.url, routes.static) ) {
        static.serve(request, response);

    } else if (routes.api.test(request.url) ) {

        let  { pathname, query } = url.parse(request.url, true);
        
        gameController.callApi(pathname.substring(5), query, (error, result) => {
            response.setHeader('Content-type', 'application/json');
            if (error) {
                response.statusCode = 500;
                response.end(JSON.stringify(error));
            } else {
                response.statusCode = 200;
                response.end(JSON.stringify(result));
            }
        });

    } else {
        response.statusCode = 403;
        response.end();
    }
});

server.listen(4444);