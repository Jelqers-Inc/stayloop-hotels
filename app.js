require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const hotelRoutes = require('./src/routes/hotelRoutes'); 
const zoneRoutes = require('./src/routes/zoneRoutes');
const imageRoutes = require("./src/routes/imageRoutes");
const roomRoutes = require("./src/routes/roomTypeRoutes");

const app = express();
const PORT = process.env.PORT || 4002;


app.use(bodyParser.json());

app.use("/hotels", hotelRoutes);
app.use("/zones", zoneRoutes);
app.use("/images", imageRoutes);
app.use("/roomtypes", roomRoutes);

app.listen(PORT, () => {
  console.log(`Hotel service running on port ${PORT}`);
});