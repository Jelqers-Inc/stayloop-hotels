const express = require("express");
const router = express.Router();
const tipoHabitacionController = require("../controllers/roomTypeController");

router.get(
  "/getbyhotelid/:hotelId",
  tipoHabitacionController.getTiposByHotelId
);

router.post(
  "/createtohotel/:hotelId",
  tipoHabitacionController.createTipoHabitacion
);

router.put(
  "/update/:id",
  tipoHabitacionController.updateTipoHabitacion
);

router.delete(
  "/delete/:id",
  tipoHabitacionController.deleteTipoHabitacion
);

module.exports = router;
