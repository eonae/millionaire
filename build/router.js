const api = require('./api.js');

const routes = {
    static: [
        /^\/$/i,
        /\.html$/i,
        /\.css$/i,
        /^\/js\/[\S\s]+\.jd$/i,
        /^\/resources\/.*/i
    ],
    api: [
        '/new', '/try', '/flee', '/percents', '/half'
    ]
}

const router = {
    process(request, response) {
        if (regexMatchOneOf(request.url, routes.static)) {
            serveStatic(request, response);
        } else if (routes.api.indexOf(request.url) != -1) {
            api[request.url.substring(1)](request, response);
        } else {
            reportError(request, response);
        }
    }
}

function regexMatchOneOf(string, patterns) {
    for (let i = 0; i < patterns.length; i++) {
        if (patterns[i].test(string))
            return true;
    }
    return false;
}

module.exports = router;