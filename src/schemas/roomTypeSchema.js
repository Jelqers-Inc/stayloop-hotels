const tipoHabitacionSchema = {
  // El idHotel se tomará de la URL en la creación, pero es bueno tenerlo en el esquema para validaciones
  idHotel: { type: "number", required: true },
  nombre: { type: "string", required: true },
  cantPersonas: { type: "number", required: true },
  cantHab: { type: "number", required: true },
  costo: { type: "number", required: true },
};

module.exports = tipoHabitacionSchema;
