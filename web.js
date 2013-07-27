var node_static = require('node-static'),
    http = require('http');
//util = require('util');

var webroot = '.',
    port = process.env.PORT;
var file = new(node_static.Server)(webroot, {
    //cache: 600,
    //headers: { 'X-Powered-By': 'node-static' }
});


http.createServer(function(req, res) {
    req.addListener('end', function() {
        if (req.url === "/") {
            file.serveFile("/main.html", 200, {}, req, res);
        }
        else {
            var isStaticURL = function(url) {
                if (url.lastIndexOf("/js/", 0) === 0) return true;
                if (url.lastIndexOf("/css/", 0) === 0) return true;
                return false;
            };
            if (isStaticURL(req.url)) {
                console.log('serving static page: %s', req.url);
                file.serve(req, res, function(err, result) {
                    if (err) {
                        console.error('Error serving %s - %s', req.url, err.message);
                        //              if (err.status === 404 || err.status === 500) {
                        //                  file.serveFile(util.format('/%d.html', err.status), err.status, {}, req, res);
                        //              } else {
                        res.writeHead(err.status, err.headers);
                        res.end();
                        //              }
                    }
                    //                    else {
                    //                        console.log('%s - %s', req.url, res.message);
                    //                    }
                });
            }
            else {
                handle_json(req, res);
            }
        }
    }).resume();
}).listen(port);
console.log('node-static running at %s:%d', process.env.IP, port);

function handle_json(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Hello World from Cloud9\n');
}
