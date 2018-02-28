# HTTP libraries performance test

My results:
```bash
➜  http-libraries-perf-test git:(master) ✗ node index.js
http.request POST request x 7,203 ops/sec ±7.03% (70 runs sampled)
http.request GET request x 7,899 ops/sec ±2.54% (74 runs sampled)
fetch GET request x 4,048 ops/sec ±3.84% (72 runs sampled)
fetch POST request x 4,094 ops/sec ±1.96% (70 runs sampled)
requestify GET request x 3,337 ops/sec ±3.50% (68 runs sampled)
requestify POST request x 3,204 ops/sec ±2.80% (72 runs sampled)
got GET request x 1,811 ops/sec ±3.59% (68 runs sampled)
got POST request x 1,986 ops/sec ±2.85% (75 runs sampled)
axios GET request x 3,467 ops/sec ±3.40% (75 runs sampled)
axios POST request x 3,380 ops/sec ±3.26% (77 runs sampled)
superagent GET request x 4,783 ops/sec ±3.22% (70 runs sampled)
superagent POST request x 4,983 ops/sec ±2.65% (74 runs sampled)
Request GET request x 3,263 ops/sec ±3.31% (72 runs sampled)
Request POST request x 2,988 ops/sec ±3.16% (75 runs sampled)
Fastest is http.request GET request,http.request POST request
```

I'm not suprised that bare `http.request` is the fastest. But I can't explain why `axios` and `request` are so slow.
