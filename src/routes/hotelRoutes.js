const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

router.get("/getall", hotelController.getAllHoteles);

router.get("/get/:id", hotelController.getHotelById);

router.post("/create", hotelController.createHotel);

router.put("/update/:id", hotelController.updateHotel);

router.delete("/delete/:id", hotelController.deleteHotel);

module.exports = router;
