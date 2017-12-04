var http = require('http');
var fs = require('fs');
var qs = require('querystring');


/**
 * jiajianrong@58.com
 * 2017-12-04
 */


http.createServer(function(req, res) {
    
    if (req.url === '/' || req.url === '') {
		fs.readFile('./download-test.html', function(err, file) {
            res.setHeader('Cache-Control', "no-cache");
            res.setHeader('Content-Type', 'text/html');
            res.writeHead('200');
            res.end(file);
        });
    }
    
    
    if (req.url === '/download_buffer') {
        res.setHeader('Content-Type', 'application/x-jpg');
        fs.createReadStream(__dirname + '/request.jpg').pipe(res);
    }
    
    
    if (req.url === '/download_file') {
        res.setHeader('Content-Type', 'application/x-jpg');
        res.setHeader('Content-disposition', 'attachment; filename=download_from_server.jpg');
        fs.createReadStream(__dirname + '/request.jpg').pipe(res);
    }
    
    
}).listen(8888)