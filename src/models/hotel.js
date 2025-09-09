const db = require("../config/database");
const hotelSchema = require("../schemas/hotelSchema");

const validate = (data, schema) => {
    for (const key in schema) {
        if (schema[key].required && !data[key]) {
            throw new Error(`El campo '${key}' es obligatorio.`);
        }
    }
};

class Hotel {
  static async findAll() {
    const [hoteles] = await db.query("SELECT * FROM hoteles");
    return hoteles;
  }

  static async findById(id) {
    const [hotel] = await db.query("SELECT * FROM hoteles WHERE id = ?", [id]);
    return hotel[0];
  }

  static async create(data) {
    validate(data, hotelSchema);
    const { nombre, descripcion, direccion, idZona, idUsuario } = data;
    const [result] = await db.query(
      "INSERT INTO hoteles (nombre, descripcion, direccion, idZona, idUsuario) VALUES (?, ?, ?, ?, ?)",
      [nombre, descripcion, direccion, idZona, idUsuario]
    );
    return { id: result.insertId, ...data };
  }

  static async update(id, data) {
    validate(data, hotelSchema); 
    const { nombre, descripcion, direccion, idZona, idUsuario } = data;
    const [result] = await db.query(
      "UPDATE hoteles SET nombre = ?, descripcion = ?, direccion = ?, idZona = ?, idUsuario = ? WHERE id = ?",
      [nombre, descripcion, direccion, idZona, idUsuario, id]
    );
    if (result.affectedRows === 0) return null;
    return { id, ...data };
  }

  static async remove(id) {
    const [result] = await db.query("DELETE FROM hoteles WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Hotel;
