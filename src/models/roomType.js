// models/tipoHabitacion.model.js
const db = require("../config/database");
const tipoHabitacionSchema = require("../schemas/roomTypeSchema");

// Función de validación
const validate = (data, schema) => {
  for (const key in schema) {
    if (
      schema[key].required &&
      (data[key] === undefined || data[key] === null)
    ) {
      throw new Error(`El campo '${key}' es obligatorio.`);
    }
  }
};

class TipoHabitacion {
  static async findByHotelId(hotelId) {
    const [tipos] = await db.query(
      "SELECT * FROM tipos_habitacion WHERE idHotel = ?",
      [hotelId]
    );
    return tipos;
  }

  static async findById(id) {
    const [tipo] = await db.query(
      "SELECT * FROM tipos_habitacion WHERE id = ?",
      [id]
    );
    return tipo[0];
  }

  static async create(data) {
    validate(data, tipoHabitacionSchema);
    const { idHotel, nombre, cantPersonas, cantHab, costo } = data;
    const [result] = await db.query(
      "INSERT INTO tipos_habitacion (idHotel, nombre, cantPersonas, cantHab, costo) VALUES (?, ?, ?, ?, ?)",
      [idHotel, nombre, cantPersonas, cantHab, costo]
    );
    return { id: result.insertId, ...data };
  }

  static async update(id, data) {
    // Para actualizar, no requerimos idHotel, ya que no debería cambiar.
    const updateSchema = { ...tipoHabitacionSchema };
    delete updateSchema.idHotel;
    validate(data, updateSchema);

    const { nombre, cantPersonas, cantHab, costo } = data;
    const [result] = await db.query(
      "UPDATE tipos_habitacion SET nombre = ?, cantPersonas = ?, cantHab = ?, costo = ? WHERE id = ?",
      [nombre, cantPersonas, cantHab, costo, id]
    );
    if (result.affectedRows === 0) return null;
    return { id, ...data };
  }

  static async remove(id) {
    const [result] = await db.query(
      "DELETE FROM tipos_habitacion WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = TipoHabitacion;
