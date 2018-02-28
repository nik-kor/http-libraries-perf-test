var http = require('http');
var axios = require('axios');
var superagent = require('superagent');
var request = require('request');
var got = require('got');
var requestify = require('requestify');
var fetch = require('node-fetch');

var nock = require('nock');
var HOST = 'test-perf';
var URL = `http://${HOST}/test`;

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

suite.add('fetch GET request', {
  defer: true,
  fn: (defer) => {
    fetch(URL).then(() => defer.resolve())
  }
});

suite.add('fetch POST request', {
  defer: true,
  fn: (defer) => {
    fetch(URL, {method: 'POST'}).then(() => defer.resolve());
  }
});

suite.add('requestify GET request', {
  defer: true,
  fn: (defer) => {
    requestify.get(URL).then(() => defer.resolve());
  }
});

suite.add('requestify POST request', {
  defer: true,
  fn: (defer) => {
    requestify.post(URL).then(() => defer.resolve());
  }
});

suite.add('got GET request', {
  defer: true,
  fn: (defer) => {
    got.get(URL).then(()=> defer.resolve());
  }
});

suite.add('got POST request', {
  defer: true,
  fn: (defer) => {
    got.post(URL).then(() => defer.resolve());
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
        superagent.get(URL).end(() => { defer.resolve(); });
    }
});

suite.add('superagent POST request', {
    defer: true,
    fn: (defer) => {
        superagent.post(URL).send().end(() => defer.resolve());
    }
});

suite.add('Request GET request', {
    defer: true,
    fn: (defer) => {
        request(URL, () => defer.resolve());
    }
});

suite.add('Request POST request', {
    defer: true,
    fn: (defer) => {
        request.post({ url: URL }, () => defer.resolve());
    }
});

suite.on('complete', function(defer) {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
});

suite.on('cycle', function(event) {
    console.log(String(event.target));
});

suite.run({ async: true });
