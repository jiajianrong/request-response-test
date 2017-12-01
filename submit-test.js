var http = require('http');
var fs = require('fs');
var qs = require('querystring');


/**
 * The best way to send binary content is via ArrayBuffers or Blobs in conjuncton with 
 * the send() method and possibly the readAsArrayBuffer() method of the FileReader API.
 * 
 * jiajianrong@58.com
 * 2017-11-30
 */


http.createServer(function(req, res) {
    
    if (req.url === '/' || req.url === '') {
		fs.readFile('./submit-test.html', function(err, file) {
            res.setHeader('Cache-Control', "no-cache");
            res.setHeader('Content-Type', 'text/html');
            res.writeHead('200');
            res.end(file);
        });
    }
    
    
    if (req.url === '/json') {
        var body = '';
        req.on('data', function(data){
            body += data;
        })
        req.on('end', function(){
            console.log(body); // {"a":"b","c":"d"}
            
            res.writeHead('200');
            res.end(JSON.stringify(body));
        })
    }
    
    
    if (req.url === '/formurlencode') {
        var body = '';
        req.on('data', function(data){
            body += data;
        })
        req.on('end', function(){
            body = qs.parse(body);
            console.log(body); // { a: 'b', c: 'd' }
            
            res.writeHead('200');
            res.end(JSON.stringify(body));
        })
    }
    
    
    if (req.url === '/text') {
        var body = '';
        req.on('data', function(data){
            body += data;
        })
        req.on('end', function(){
            console.log(body); // a=b\r\nc=d
            
            res.writeHead('200');
            res.end(body);
        })
    }
    
    
    if (req.url === '/formdata') {
        var body = '';
        req.on('data', function(data){
            body += data;
        })
        req.on('end', function(){
            console.log(body); // \r\n---AaB03x---\r\na=b\r\n---AaB03x---\r\nc=d\r\n---AaB03x---\r\n
            
            res.writeHead('200');
            res.end(body);
        })
    }
    
    
}).listen(8888)