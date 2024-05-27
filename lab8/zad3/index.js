const express = require('express');
const { Pool } = require('pg');
const redis = require('redis');

const app = express();
const port = 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

app.use(express.json());

app.post('/message', async (req, res) => {
  const { message } = req.body;
  await redisClient.set('message', message);
  res.send('Message stored in Redis');
});

app.get('/message', async (req, res) => {
  const message = await redisClient.get('message');
  res.send(`Message from Redis: ${message}`);
});

app.post('/user', async (req, res) => {
  const { name, email } = req.body;
  const client = await pool.connect();
  try {
    const result = await client.query('INSERT INTO users(name, email) VALUES($1, $2) RETURNING *', [name, email]);
    res.json(result.rows[0]);
  } finally {
    client.release();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
