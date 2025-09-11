const express = require('express');
const bodyParser = require('body-parser');
const hotelRoutes = require('./src/routes/hotelRoutes'); 
const zoneRoutes = require('./src/routes/zoneRoutes');

const app = express();
const PORT = process.env.PORT || 4002;


app.use(bodyParser.json());

app.use("/hotels", hotelRoutes);
app.use("/zones", zoneRoutes);

app.listen(PORT, () => {
  console.log(`Hotel service running on port ${PORT}`);
});