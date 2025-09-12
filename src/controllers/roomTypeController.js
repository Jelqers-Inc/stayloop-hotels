// controllers/tipoHabitacion.controller.js
const TipoHabitacion = require("../models/roomType");

const getTiposByHotelId = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const tipos = await TipoHabitacion.findByHotelId(hotelId);
    res.status(200).json(tipos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

const createTipoHabitacion = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const data = { ...req.body, idHotel: parseInt(hotelId) }; // Añadimos el idHotel a los datos
    const nuevoTipo = await TipoHabitacion.create(data);
    res.status(201).json(nuevoTipo);
  } catch (error) {
    if (error.message.includes("obligatorio")) {
      return res
        .status(400)
        .json({ message: "Datos incompletos", error: error.message });
    }
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

const updateTipoHabitacion = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoActualizado = await TipoHabitacion.update(id, req.body);
    if (!tipoActualizado) {
      return res
        .status(404)
        .json({ message: "Tipo de habitación no encontrado" });
    }
    res.status(200).json(tipoActualizado);
  } catch (error) {
    if (error.message.includes("obligatorio")) {
      return res
        .status(400)
        .json({ message: "Datos incompletos", error: error.message });
    }
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

const deleteTipoHabitacion = async (req, res) => {
  try {
    const { id } = req.params;
    const fueEliminado = await TipoHabitacion.remove(id);
    if (!fueEliminado) {
      return res
        .status(404)
        .json({ message: "Tipo de habitación no encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    // Aquí podrías capturar un error si una reserva depende de este tipo de habitación
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

module.exports = {
  getTiposByHotelId,
  createTipoHabitacion,
  updateTipoHabitacion,
  deleteTipoHabitacion,
};
