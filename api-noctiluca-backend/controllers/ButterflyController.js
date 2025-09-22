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

// GET - get one butterfly by ID (MongoDB / Mongoose)
export const getOneButterfly = async (req, res) => {
  try {
    const { id } = req.params;

    const butterfly = await ButterflyModel.findById(id); // 👈 Mongo

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

    const butterfly = await ButterflyModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!butterfly) {
      return res.status(404).json({ message: "Mariposa no encontrada" });
    }

    res.status(200).json(butterfly);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// POST - create butterfly (MongoDB / Mongoose)
export const createButterfly = async (req, res) => { ///Exporta una función asíncrona llamada createButterfly que recibe los objetos req (request) y res (response). Se usa en un endpoint POST.
  try {      req.body
    const butterfly = await ButterflyModel.create(req.body); //Usa el modelo ButterflyModel de Mongoose para crear un nuevo documento en la base de datos con los datos enviados en
    res.status(201).json(butterfly); //Responde con un código 201 (Created) y devuelve en formato JSON el objeto butterfly que se acaba de guardar.
  } catch (error) { //Si ocurre un error durante la creación, se captura aquí.
    res.status(500).json({ message: error.message });// Responde con un código 500 (Error interno del servidor) y envía un JSON con el mensaje del error.
  }
};


// DELETE - delete butterfly (MongoDB / Mongoose)
export const deleteButterfly = async (req, res) => { //Exporta la función asíncrona deleteButterfly, también recibe req y res. Se usa en un endpoint DELETE.
  try {
    const { id } = req.params;  //Extrae el id de los parámetros de la URL (por ejemplo, /butterfly/123).
    const butterfly = await ButterflyModel.findByIdAndDelete(id); //Usa el modelo ButterflyModel de Mongoose para crear un nuevo documento en la base de datos con los datos enviados en req.body.

    if (!butterfly) {
      return res.status(404).json({ message: "Butterfly not found" }); //Si no se encontró ninguna mariposa con ese id, responde con un 404 (Not Found) y un mensaje de error.
    }

    res.status(200).json({ message: "Butterfly deleted successfully" }); //Si se encontró y eliminó, responde con un 200 (OK) y un mensaje de confirmación
  } catch (error) {
    res.status(500).json({ message: error.message });  // Si ocurre un error inesperado, responde con un 500 y el mensaje del error. Finalmente se cierra la función
  }
};
