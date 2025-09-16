const Hotel = require("../models/hotel");

const getAllHoteles = async (req, res) => {
  try {
    const hoteles = await Hotel.findAll();
    res.status(200).json(hoteles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message, code: error.error_code });
  }
};

const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel no encontrado" });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

const createHotel = async (req, res) => {
  try {
    const nuevoHotel = await Hotel.create(req.body);
    res.status(201).json(nuevoHotel);
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

const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotelActualizado = await Hotel.update(id, req.body);
    if (!hotelActualizado) {
      return res
        .status(404)
        .json({ message: "Hotel no encontrado para actualizar" });
    }
    res.status(200).json(hotelActualizado);
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

const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const fueEliminado = await Hotel.remove(id);
    if (!fueEliminado) {
      return res
        .status(404)
        .json({ message: "Hotel no encontrado para eliminar" });
    }
    
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

module.exports = {
  getAllHoteles,
  getHotelById,
  createHotel,
  updateHotel, 
  deleteHotel,
};
