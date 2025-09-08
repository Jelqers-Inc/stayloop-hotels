const express = require('express');

const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());



app.get('/hotels', (req, res) => {
  res.json([{ msg: 'Hola desde hoteles' }]);
});

app.listen(PORT, () => {
  console.log(`Hotel service running on port ${PORT}`);
});