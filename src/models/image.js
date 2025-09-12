// models/imagen.model.js
const db = require("../config/database");

class Imagen {
  /**
   * Busca todas las imágenes de un hotel específico, pero SIN devolver
   * el dato binario (LONGBLOB) para evitar sobrecargar la respuesta.
   * Esto es ideal para listar las imágenes disponibles.
   */
  static async findByHotelId(hotelId) {
    const [imagenes] = await db.query(
      "SELECT id, idHotel FROM imagenes WHERE idHotel = ?",
      [hotelId]
    );
    return imagenes;
  }

  /**
   * Busca una imagen específica por su ID, incluyendo el dato binario.
   * Esto se usa para mostrar la imagen al cliente.
   */
  static async findById(id) {
    const [imagen] = await db.query("SELECT * FROM imagenes WHERE id = ?", [
      id,
    ]);
    return imagen[0];
  }

  /**
   * Crea un nuevo registro de imagen en la base de datos.
   * @param {number} idHotel - El ID del hotel al que pertenece la imagen.
   * @param {Buffer} imagenBuffer - El buffer de datos binarios de la imagen.
   */
  static async create(idHotel, imagenBuffer) {
    const [result] = await db.query(
      "INSERT INTO imagenes (idHotel, imagen) VALUES (?, ?)",
      [idHotel, imagenBuffer]
    );
    return { id: result.insertId, idHotel };
  }

  /**
   * Elimina una imagen de la base de datos por su ID.
   */
  static async remove(id) {
    const [result] = await db.query("DELETE FROM imagenes WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Imagen;
