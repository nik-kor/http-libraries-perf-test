# HTTP libraries performance test

My results:
```bash
➜  http-libraries-perf-test git:(master) ✗ node index.js
http.request POST request x 10,968 ops/sec ±1.99% (73 runs sampled)
http.request GET request x 11,110 ops/sec ±1.37% (75 runs sampled)
axios GET request x 3,416 ops/sec ±2.05% (73 runs sampled)
axios POST request x 3,387 ops/sec ±2.50% (71 runs sampled)
superagent GET request x 6,498 ops/sec ±2.22% (70 runs sampled)
superagent POST request x 6,418 ops/sec ±2.80% (71 runs sampled)
Request GET request x 3,251 ops/sec ±2.85% (71 runs sampled)
Request POST request x 2,664 ops/sec ±2.87% (67 runs sampled)
Fastest is http.request GET request,http.request POST request
```

I'm not suprised that bare `http.request` is the fastest. But I can't explain why `axios` and `request` are so slow.
