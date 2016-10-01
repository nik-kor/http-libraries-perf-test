var http = require('http');
var axios = require('axios');
var superagent = require('superagent');
var request = require('request');

var nock = require('nock');
var HOST = 'test-perf';

axios.defaults.baseURL = `http://${HOST}`;

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

nock('http://test-perf').persist()
    // .log(console.log)
    .post('/test').reply(200, 'ok')
    .get('/test').reply(200, 'ok');

suite.add('http.request POST request', {
    defer: true,
    fn: (defer) => {
        var req = http.request({ host: HOST, path: '/test', method: 'POST' }, (res) => {
            res.resume().on('end', () => defer.resolve());
        });
        req.write();
        req.end();
    }
});

suite.add('http.request GET request', {
    defer: true,
    fn: (defer) => {
        http.request({ path: '/test', host: HOST }, (res) => {
            res.resume().on('end', () => defer.resolve());
        }).end();
    }
});

suite.add('axios GET request', {
    defer: true,
    fn: (defer) => {
        axios.get('/test').then(() => defer.resolve())
    }
});

suite.add('axios POST request', {
    defer: true,
    fn: (defer) => {
        axios.post('/test').then(() => defer.resolve());
    }
});

suite.add('superagent GET request', {
    defer: true,
    fn: (defer) => {
        superagent.get(`http://${HOST}/test`).end(() => { defer.resolve(); });
    }
});

suite.add('superagent POST request', {
    defer: true,
    fn: (defer) => {
        superagent.post(`http://${HOST}/test`).send().end(() => defer.resolve());
    }
});

suite.add('Request GET request', {
    defer: true,
    fn: (defer) => {
        request(`http://${HOST}/test`, () => defer.resolve());
    }
});

suite.add('Request POST request', {
    defer: true,
    fn: (defer) => {
        request.post({ url: `http://${HOST}/test` }, () => defer.resolve());
    }
});

suite.on('complete', function(defer) {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
});

suite.on('cycle', function(event) {
    console.log(String(event.target));
});

suite.run({ async: true });
