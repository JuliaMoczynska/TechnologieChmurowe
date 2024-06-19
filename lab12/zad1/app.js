const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!\n');
});

app.post('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  var response = { "response" : "post." }
  console.log(response);
  res.end(JSON.stringify(response));
})

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
