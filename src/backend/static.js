const fs = require('fs');
const mime = require('mime');

module.exports = {
    serve: function(req, res) {

        let path = './build';
        let resource = (req.url != '/')
            ? path + req.url
            : path + '/index.html';
    
        fs.readFile(resource, (error, data) => {
            if (error) {
                console.log(error);
                res.statusCode = 404;
                res.end('Resource not found!');
            }

            res.statusCode = 200;
            res.setHeader('Content-type', getMimeType(resource));
            res.end(data);
        });
    }
}

function getMimeType(resource) {
    var ext = resource.substring(resource.lastIndexOf('.'));
    console.log(resource);
    console.log(ext);
    return mime.getType(ext);
}

