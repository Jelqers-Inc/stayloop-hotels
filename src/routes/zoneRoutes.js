const express = require("express");
const router = express.Router();
const zonaController = require("../controllers/zoneController");

router.get("/getall", zonaController.getAllZonas);

router.get("/get/:id", zonaController.getZonaById);

router.post("/create", zonaController.createZona);

router.put("/update/:id", zonaController.updateZona);

router.delete("/delete/:id", zonaController.deleteZona);

module.exports = router;
