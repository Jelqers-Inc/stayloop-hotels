// No interactúa con la BD, solo define la estructura esperada de un hotel.
const hotelSchema = {
  nombre: { type: "string", required: true },
  descripcion: { type: "string", required: true },
  direccion: { type: "string", required: true },
  idZona: { type: "number", required: true },
  idUsuario: { type: "number", required: true },
};

module.exports = hotelSchema;
