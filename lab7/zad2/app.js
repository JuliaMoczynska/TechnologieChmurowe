const express = require('express');
const redis = require('redis');
const os = require('os');

const app = express();
const redisClient = redis.createClient({
  host: 'redis',
  port: 6379
});

redisClient.on('error', function(err) {
  console.error('Error connecting to Redis:', err);
});

app.get("/", (req, res) => {
  if (!redisClient.ready) {
    console.error('Redis client is not ready');
    res.status(500).send('Internal Server Error');
    return;
  }

  redisClient.get('numVisits', (err, numVisits) => {
    if (err) {
      console.error('Error getting numVisits from Redis:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    let numVisitsToDisplay = parseInt(numVisits) + 1;
    if (isNaN(numVisitsToDisplay)) {
      numVisitsToDisplay = 1;
    }

    res.send(os.hostname() + ': Number of visits is: ' + numVisitsToDisplay);

    numVisits++;
    redisClient.set('numVisits', numVisits, (err) => {
      if (err) {
        console.error('Error setting numVisits in Redis:', err);
      }
    });
  });
});

const PORT = 5000;
app.listen(PORT, function() {
    console.log('Web application is listening on port', PORT);
});

