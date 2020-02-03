# HTTP libraries performance test

My results:
```bash
✗ node index.js
➜  http.request POST request x 13,748 ops/sec ±17.81% (67 runs sampled)
    http.request GET request x 21,206 ops/sec ±7.60% (76 runs sampled)
    axios GET request x 5,817 ops/sec ±7.73% (76 runs sampled)
    axios POST request x 6,466 ops/sec ±2.04% (79 runs sampled)
    superagent GET request x 11,205 ops/sec ±6.95% (78 runs sampled)
    superagent POST request x 12,145 ops/sec ±2.43% (77 runs sampled)
    Request GET request x 8,348 ops/sec ±5.35% (80 runs sampled)
    Request POST request x 7,754 ops/sec ±2.84% (79 runs sampled)
    Fastest is http.request GET request,http.request POST request
```

I'm not suprised that bare `http.request` is the fastest. But I can't explain why `axios` and `request` are so slow.
