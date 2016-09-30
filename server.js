var http = require('http');
var PORT = 8080;
module.exports.PORT = PORT;

module.exports.create = function(done) {
    var server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type' : 'text/plain' });
        res.write('ok');
        res.end();
    });

    server.listen(PORT, () => { done(server); })
};
