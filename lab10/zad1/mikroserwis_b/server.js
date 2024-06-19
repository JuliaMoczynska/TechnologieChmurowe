const express = require('express');
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
  res.send('Hello im from mikroserwis_b :)');
});

app.listen(PORT, () => {
  console.log(`mikroserwis_b is running on ${PORT}`);
});
