var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var createServer = require('./server').create;
// var PORT = require('./server').PORT;
var http = require('http');

var nock = require('nock');

nock('http://test-perf/').persist()
    // .post('/', {}).reply(200, 'ok')
    .get('/').reply(200, 'ok');

// suite.add('POST request', (defer) => {
//     // console.log('DEBUG', defer);
//     var req = http.request({ method: 'POST' }, function(res) {
//         // res.on('data', (chunk) => {
//         //     console.log(`BODY: ${chunk}`);
//         // });
//         res.on('end', () => {
//             defer.resolve();
//         });
//     });
//     req.end();
// });

suite.add('GET request', (defer) => {
    var req = http.request({ host: 'test-perf', method: 'GET' }, function(res) {
        // res.on('data', (chunk) => {
        //     console.log(`BODY: ${chunk}`);
        // });
        res.on('end', () => {
            defer.resolve();
        });
    });
    req.end();
});

suite.on('complete', function(defer) {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
});

suite.on('cycle', function(event) {
    console.log(String(event.target));
});

suite.run({ defer: true, maxTime: 3 });
