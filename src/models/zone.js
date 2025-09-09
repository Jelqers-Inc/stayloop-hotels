const db = require("../config/database");
const zonaSchema = require("../schemas/zoneSchema");

const validate = (data, schema) => {
  for (const key in schema) {
    if (
      schema[key].required &&
      (data[key] === undefined || data[key] === null)
    ) {
      throw new Error(`El campo '${key}' es obligatorio.`);
    }
  }

  if (!data.descripcion) {
    data.descripcion = null;
  }
};

class Zona {
  static async findAll() {
    const [zonas] = await db.query("SELECT * FROM zonas");
    return zonas;
  }

  static async findById(id) {
    const [zona] = await db.query("SELECT * FROM zonas WHERE id = ?", [id]);
    return zona[0];
  }

  static async create(data) {
    validate(data, zonaSchema);
    const { nombre, descripcion } = data;
    const [result] = await db.query(
      "INSERT INTO zonas (nombre, descripcion) VALUES (?, ?)",
      [nombre, descripcion]
    );
    return { id: result.insertId, ...data };
  }

  static async update(id, data) {
    validate(data, zonaSchema);
    const { nombre, descripcion } = data;
    const [result] = await db.query(
      "UPDATE zonas SET nombre = ?, descripcion = ? WHERE id = ?",
      [nombre, descripcion, id]
    );
    if (result.affectedRows === 0) return null; 
    return { id, ...data };
  }

  static async remove(id) {
    const [result] = await db.query("DELETE FROM zonas WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Zona;
