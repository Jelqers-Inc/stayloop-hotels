const express = require("express");
const router = express.Router();
const zonaController = require("../controllers/zoneController");

router.get("/", zonaController.getAllZonas);

router.get("/:id", zonaController.getZonaById);

router.post("/", zonaController.createZona);

router.put("/:id", zonaController.updateZona);

router.delete("/:id", zonaController.deleteZona);

module.exports = router;
