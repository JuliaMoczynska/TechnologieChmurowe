const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://mikroserwis-b-service:4000/');
    res.send(`response: ${response.data}`);
  } catch (error) {
    res.send(`error: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`mikroserwis_a is running on ${PORT}`);
});
