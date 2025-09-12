const express = require("express");
const router = express.Router();
const tipoHabitacionController = require("../controllers/roomTypeController");

router.get(
  "/tipos-habitacion/:hotelId",
  tipoHabitacionController.getTiposByHotelId
);

router.post(
  "/tipos-habitacion/:hotelId",
  tipoHabitacionController.createTipoHabitacion
);

router.put(
  "/tipos-habitacion/:id",
  tipoHabitacionController.updateTipoHabitacion
);

router.delete(
  "/tipos-habitacion/:id",
  tipoHabitacionController.deleteTipoHabitacion
);

module.exports = router;
