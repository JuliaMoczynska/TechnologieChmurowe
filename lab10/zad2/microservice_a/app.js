const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => {
  res.send('Hello from Microservice A!');
});

app.listen(port, () => {
  console.log(`Microservice A listening at http://localhost:${port}`);
});