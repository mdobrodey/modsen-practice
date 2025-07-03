import * as http from 'node:http';

const websites = [
  'google.com',
  'github.com',
  'codewars.com'
];

const makeHttpRequest = (options) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const req = http.request(options, (res) => {
      res.on('data', () => {
        console.log(`data received`);
      });
      
      res.on('end', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        resolve({
          hostname: options.hostname,
          duration: duration,
        });
      });
    });
    
    req.end();
  });
};

const makeHttpGet = (options) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const req = http.get(options, (res) => {
      res.on('data', () => {
        console.log(`data received`);
      });
      
      res.on('end', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        resolve({
          hostname: options.hostname,
          duration: duration,
        });
      });
    });

    req.end();
  });
};

const sequentialRequests = async (websites, requestFunction) => {
  const results = [];
  const totalStartTime = Date.now();
  
  for (const website of websites) {
    try {
      const result = await requestFunction({
        hostname: website,
        port: 80,
        path: '/',
        method: 'GET',
        agent: false,
      });
      results.push(result);
      console.log(`${website}: ${result.duration}ms`);
    } catch (error) {
      results.push(error);
    }
  }
  
  const totalDuration = Date.now() - totalStartTime;
  return { results, totalDuration };
};

const parallelRequests = async (websites, requestFunction) => {
  const totalStartTime = Date.now();
  
  const promises = websites.map(website => {
    return requestFunction({
      hostname: website,
      port: 80,
      path: '/',
      method: 'GET',
      agent: false,
    }).then(result => {
      console.log(`${website}: ${result.duration}ms`);
      return result;
    }).catch(error => {
      return error;
    });
  });
  
  const results = await Promise.all(promises);
  const totalDuration = Date.now() - totalStartTime;
  return { results, totalDuration };
};

const runPerformanceTest = async () => {
  const sequentialHttpRequest = await sequentialRequests(websites, makeHttpRequest);
  const parallelHttpRequest = await parallelRequests(websites, makeHttpRequest);
  const sequentialHttpGet = await sequentialRequests(websites, makeHttpGet);
  const parallelHttpGet = await parallelRequests(websites, makeHttpGet);

  console.log(`Последовательные http.request: ${sequentialHttpRequest.totalDuration}ms`);
  console.log(`Параллельные http.request: ${parallelHttpRequest.totalDuration}ms`);
  console.log(`Последовательные http.get: ${sequentialHttpGet.totalDuration}ms`);
  console.log(`Параллельные http.get: ${parallelHttpGet.totalDuration}ms`);
  console.log(`Таким образом параллельные запросы в ${((sequentialHttpRequest.totalDuration + sequentialHttpGet.totalDuration) / (parallelHttpRequest.totalDuration + parallelHttpGet.totalDuration)).toFixed(2)} раза быстрее`)

  return {
    sequentialHttpRequest,
    parallelHttpRequest,
    sequentialHttpGet,
    parallelHttpGet
  };
};

runPerformanceTest().catch(console.error);

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('app working');
});

server.listen(5000, () => {
  console.log('running on port 5000');
});