const express = require("express");
const router = express.Router();
const multer = require("multer");
const imagenController = require("../controllers/imageController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/upload/:hotelId",
  upload.single("imagen"),
  imagenController.uploadImagen
);

router.get("/getbyhotelid/:hotelId", imagenController.getImagenesByHotel);
router.get("/getbyid/:id", imagenController.getImagenById);
router.delete("/delete/:id", imagenController.deleteImagen);

module.exports = router;
