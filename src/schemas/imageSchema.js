const imagenSchema = {
  idHotel: { type: "number", required: true },
  // El campo 'imagen' (el buffer de datos) será validado por su existencia
  // en el controlador directamente desde req.file.
};

module.exports = imagenSchema;
