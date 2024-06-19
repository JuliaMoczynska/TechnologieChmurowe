const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 8080;

const url = 'mongodb://root:example@db:27017';
const dbName = 'testdb';

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/data', (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;

    const db = client.db(dbName);
    const collection = db.collection('documents');

    collection.find({}).toArray((err, docs) => {
      if (err) throw err;

      res.json(docs);
      client.close();
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
