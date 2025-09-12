const express = require("express");
const router = express.Router();
const multer = require("multer");
const imagenController = require("../controllers/imageController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/imagenes/:hotelId",
  upload.single("imagen"),
  imagenController.uploadImagen
);

router.get("/imagenes/:hotelId", imagenController.getImagenesByHotel);
router.get("/imagenes/:id", imagenController.getImagenById);
router.delete("/imagenes/:id", imagenController.deleteImagen);

module.exports = router;
