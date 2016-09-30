var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var createServer = require('./server').create;
// var PORT = require('./server').PORT;
var http = require('http');

var nock = require('nock');
var HOST = 'test-perf';
var axios = require('axios');
axios.defaults.baseURL = `http://${HOST}`,

nock('http://test-perf').persist()
    .log(console.log)
    .post('/test').reply(200, 'ok')
    .get('/test').reply(200, 'ok');

// suite.add('POST request', (defer) => {
//     var req = http.request({ host: HOST, path: '/test', method: 'POST' }, function(res) {
//         res.on('end', () => {
//             defer.resolve();
//         });
//     });
//     req.end();
// });

// suite.add('GET request', (defer) => {
//     var req = http.request({ path: '/test', host: HOST }, function(res) {
//         res.on('end', () => {
//             defer.resolve();
//         });
//     });
//     req.end();
// });

suite.add('GET request with axios', defer => {
    axios.get('/test')
        .then(() => { console.log('here'); defer.resolve(); }, (e) => console.log)
        .catch((e) => { console.log(e); });
});

suite.on('complete', function(defer) {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
});

suite.on('cycle', function(event) {
    console.log(String(event.target));
});

suite.run({ defer: true, maxTime: 3 });
