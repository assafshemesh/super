
console.log('1');

var node_static = require('node-static'),
    http = require('http');
    //util = require('util');
    
    console.log('2');
    
var webroot = '.',
    port = process.env.PORT;
var file = new(node_static.Server)(webroot, {
    //cache: 600,
    //headers: { 'X-Powered-By': 'node-static' }
});

console.log('3');

http.createServer(function(req, res) {
    console.log('4');
    req.addListener('end', function() {
        console.log('5');
        if (req.url.lastIndexOf("/static/", 0) === 0) {
            console.log('6');
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
                else {
                    console.log('%s - %s', req.url, res.message);
                }
            });
        }
        else {
            console.log('7');
            handle_json(req, res);
        }
    });
}).listen(port);
console.log('node-static running at %s:%d', process.env.IP, port);

function handle_json(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Hello World from Cloud9\n');
}