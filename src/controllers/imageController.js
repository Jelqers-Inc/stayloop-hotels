const Imagen = require("../models/image");

const getImagenesByHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const imagenes = await Imagen.findByHotelId(hotelId);
    res.status(200).json(imagenes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

const getImagenById = async (req, res) => {
  try {
    const { id } = req.params;
    const imagen = await Imagen.findById(id);

    if (!imagen) {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }

    // Enviamos la imagen como respuesta.
    // Es una buena práctica establecer el Content-Type para que el navegador
    // sepa que está recibiendo una imagen.
    res.set("Content-Type", "image/png"); // O el tipo que corresponda (png, etc.)
    res.status(200).send(imagen.imagen);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

const uploadImagen = async (req, res) => {
  try {
    const { hotelId } = req.params;

    // Multer pone el archivo en req.file. Si no existe, es un error.
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No se ha subido ningún archivo." });
    }

    // El buffer de la imagen está en req.file.buffer
    const nuevaImagen = await Imagen.create(hotelId, req.file.buffer);
    res.status(201).json(nuevaImagen);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al subir la imagen", error: error.message });
  }
};

const deleteImagen = async (req, res) => {
  try {
    const { id } = req.params;
    const fueEliminada = await Imagen.remove(id);
    if (!fueEliminada) {
      return res
        .status(404)
        .json({ message: "Imagen no encontrada para eliminar" });
    }
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

module.exports = {
  getImagenesByHotel,
  getImagenById,
  uploadImagen,
  deleteImagen,
};
