const express = require('express');
const app = express();
const port = 80;
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client.connect();

app.get('/', (req, res) => {
  client.query('SELECT NOW()', (err, result) => {
    if (err) {
      res.send('Error querying database');
    } else {
      res.send(`Hello from Microservice B! Current time: ${result.rows[0].now}`);
    }
  });
});

app.listen(port, () => {
  console.log(`Microservice B listening at http://localhost:${port}`);
});