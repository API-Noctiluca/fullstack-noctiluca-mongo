import ButterflyModel from "../models/ButterflyModel.js";

//Adaptado método GET - Trae todas las mariposas
export const getAllButterflies = async (req, res) => {
  try {
    const butterflies = await ButterflyModel.find(); //En Mongo/Mongoose
    res.status(200).json(butterflies);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las mariposas" });
  }
};

// GET - get one butterfly by ID
export const getOneButterfly = async (req, res) => {
  try {
    const { id } = req.params;
    const butterfly = await ButterflyModel.findByPk(id);

    if (!butterfly) {
      return res.status(404).json({ message: "Mariposa no encontrada" });
    }

    res.status(200).json(butterfly);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Adaptado método PUT - Actualiza una mariposa
export const updateButterfly = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedButterfly = await ButterflyModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true } //Devuelve la mariposa ya actualizada
    );

    if (!updatedButterfly) {
      return res.status(404).json({ error: "Mariposa no encontrada" });
    }

    res.status(200).json(updatedButterfly);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la mariposa" });
  }
};


// POST - create butterfly (MongoDB / Mongoose)
export const createButterfly = async (req, res) => {
  try {
    const butterfly = await ButterflyModel.create(req.body); 
    res.status(201).json(butterfly);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE - delete butterfly (MongoDB / Mongoose)
export const deleteButterfly = async (req, res) => {
  try {
    const { id } = req.params;

    const butterfly = await ButterflyModel.findByIdAndDelete(id);

    if (!butterfly) {
      return res.status(404).json({ message: "Butterfly not found" });
    }

    res.status(200).json({ message: "Butterfly deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
