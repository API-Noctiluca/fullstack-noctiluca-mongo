import { body, param, query, validationResult } from "express-validator";

// ---------------------
// Reglas para crear/actualizar mariposas
// ---------------------
export const butterflyBodyRules = [
  body("name")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 4, max: 150 }).withMessage("El nombre debe tener entre 4 y 150 caracteres"),

  body("other_names")
    .optional().isString().trim()
    .isLength({ max: 100 }).withMessage("No puede superar 100 caracteres"),

  body("family")
    .trim()
    .notEmpty().withMessage("La familia es obligatoria")
    .isLength({ max: 3, max: 150 }).withMessage("Debe tener entre 3 y 150 caracteres"),

  body("location")
    .trim()
    .notEmpty().withMessage("La ubicación es obligatoria")
    .isLength({ min: 10, max: 300 }).withMessage("Debe tener entre 10 y 300 caracteres"),

  body("habitat")
    .trim()
    .notEmpty().withMessage("El hábitat es obligatorio")
    .isLength({ min: 10, max: 250 }).withMessage("Debe tener entre 10 y 250 caracteres"),

  body("morphology")
    .trim()
    .notEmpty().withMessage("La morfología es obligatoria")
    .isLength({ min: 10, max: 300 }).withMessage("Debe tener entre 10 y 300 caracteres"),

  body("life")
    .trim()
    .notEmpty().withMessage("La vida es obligatoria")
    .isLength({ min: 10, max: 250 }).withMessage("Debe tener entre 10 y 250 caracteres"),

  body("feeding")
    .trim()
    .notEmpty().withMessage("La alimentación es obligatoria")
    .isLength({ min: 5, max: 250 }).withMessage("Debe tener entre 5 y 250 caracteres"),

  body("conservation")
    .trim()
    .notEmpty().withMessage("La conservación es obligatoria")
    .isLength({ min: 2, max: 250 }).withMessage("Debe tener entre 2 y 250 caracteres"),

  body("about_conservation")
    .notEmpty().withMessage("Selecciona estado de conservación")
    .isIn(["LC","NT","VU","EN","CR"]).withMessage("Estado de conservación inválido"),

  body("image")
    .optional({ nullable: true, checkFalsy: true })
    .isURL().withMessage("La imagen debe ser una URL válida"),

  body("id")
    .optional()
    .isMongoId().withMessage("ID inválido (debe ser un ObjectId de Mongo)")
];

// ---------------------
// Validaciones para parámetros
// ---------------------
export const idParamRules = [
  param("id").isMongoId().withMessage("ID inválido (debe ser un ObjectId de Mongo)")
];

// ---------------------
// Validaciones para queries
// ---------------------
export const listQueryRules = [
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
  query("family").optional().isString().trim(),
  query("q").optional().isString().trim()
];

// ---------------------
// Middleware para revisar los resultados de las validaciones
// ---------------------
export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// ---------------------
// Middleware opcional de logs de requests
// ---------------------
export const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

// ---------------------
// Middleware opcional para 404
// ---------------------
export const notFound = (req, res, next) => {
  res.status(404).json({ error: "Recurso no encontrado" });
};

// ---------------------
// Middleware opcional para errores 500
// ---------------------
export const errorHandler = (err, req, res, next) => {
  console.error(err); // log técnico
  res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
};
