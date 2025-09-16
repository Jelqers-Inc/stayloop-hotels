const Zona = require("../models/zone");

const getAllZonas = async (req, res) => {
  try {
    const zonas = await Zona.findAll();
    res.status(200).json(zonas);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

const getZonaById = async (req, res) => {
  try {
    const { id } = req.params;
    const zona = await Zona.findById(id);
    if (!zona) {
      return res.status(404).json({ message: "Zona no encontrada" });
    }
    res.status(200).json(zona);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

const createZona = async (req, res) => {
  try {
    const nuevaZona = await Zona.create(req.body);
    res.status(201).json(nuevaZona);
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

const updateZona = async (req, res) => {
  try {
    console.log("CUERPO RECIBIDO:", req.body);
    const { id } = req.params;
    const zonaActualizada = await Zona.update(id, req.body);
    if (!zonaActualizada) {
      return res
        .status(404)
        .json({ message: "Zona no encontrada para actualizar" });
    }
    res.status(200).json(zonaActualizada);
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

const deleteZona = async (req, res) => {
  try {
    const { id } = req.params;
    const fueEliminada = await Zona.remove(id);
    if (!fueEliminada) {
      return res
        .status(404)
        .json({ message: "Zona no encontrada para eliminar" });
    }
    res.status(204).send();
  } catch (error) {
    // Captura el error de restricción de llave foránea de MySQL
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res
        .status(400)
        .json({
          message:
            "No se puede eliminar la zona porque está siendo utilizada por uno o más hoteles.",
        });
    }
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

module.exports = {
  getAllZonas,
  getZonaById,
  createZona,
  updateZona,
  deleteZona,
};
