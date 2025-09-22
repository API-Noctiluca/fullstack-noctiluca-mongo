import express from "express";
import {
  getAllButterflies,
  getOneButterfly,
  createButterfly,
  deleteButterfly,
  updateButterfly,
} from "../controllers/ButterflyController.js";
import {
  butterflyBodyRules,
  idParamRules,
  validateResult,
} from "../validators/butterfliesValidator.js";

const router = express.Router();

// ---------------------
// Real Routes
// ---------------------

router.get("/", getAllButterflies);
router.get("/:id", idParamRules, validateResult, getOneButterfly);
router.post("/", butterflyBodyRules, validateResult, createButterfly);
router.put("/:id", idParamRules, validateResult, updateButterfly);
router.delete("/:id", idParamRules, validateResult, deleteButterfly);

// ---------------------
// Swagger Documentation
// ---------------------

/**
 * @swagger
 * tags:
 *   name: Butterflies
 *   description: API for managing butterflies
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Butterfly:
 *       type: object
 *       required:
 *         - name
 *         - family
 *         - location
 *         - image
 *       properties:
 *         id:
 *           type: string
 *           description: Butterfly ID (Mongo ObjectId)
 *         name:
 *           type: string
 *           description: Main butterfly name
 *         other_names:
 *           type: string
 *           description: Alternative names
 *         family:
 *           type: string
 *           description: Taxonomic family
 *         location:
 *           type: string
 *           description: Geographic distribution
 *         habitat:
 *           type: string
 *           description: Natural habitat
 *         morphology:
 *           type: string
 *           description: Morphological description
 *         life:
 *           type: string
 *           description: Life cycle
 *         feeding:
 *           type: string
 *           description: Feeding
 *         conservation:
 *           type: string
 *           description: Conservation status
 *         about_conservation:
 *           type: string
 *           description: Additional conservation notes
 *         image:
 *           type: string
 *           format: uri
 *           description: Image URL
 *       example:
 *         id: "1"
 *         name: "Vanesa atalanta"
 *         other_names: "Red Admiral"
 *         family: "Nymphalidae"
 *         location: "Spain, France, Italy, UK, Germany, Sweden, Norway, Finland"
 *         habitat: "Woodland edges, gardens, margins"
 *         morphology: "Black wings with red and white bands, wingspan 45–60 mm"
 *         life: "Multiple generations; adults hibernate; eggs on Urtica"
 *         feeding: "Larvae on nettles; adults on nectar, sap, fruit"
 *         conservation: "LC"
 *         about_conservation: "LC"
 *         image: "https://inaturalist-open-data.s3.amazonaws.com/photos/327184069/large.jpeg"
 */

/**
 * @swagger
 * /api/butterflies:
 *   get:
 *     summary: Get all butterflies
 *     tags: [Butterflies]
 *     responses:
 *       200:
 *         description: List of butterflies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Butterfly'
 *
 *   post:
 *     summary: Create a new butterfly
 *     tags: [Butterflies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Butterfly'
 *     responses:
 *       201:
 *         description: Butterfly created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Butterfly'
 */

/**
 * @swagger
 * /api/butterflies/{id}:
 *   get:
 *     summary: Get one butterfly by ID
 *     tags: [Butterflies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Butterfly ID
 *     responses:
 *       200:
 *         description: A single butterfly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Butterfly'
 *       404:
 *         description: Not found
 *
 *   put:
 *     summary: Update a butterfly by ID
 *     tags: [Butterflies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Butterfly ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Butterfly'
 *     responses:
 *       200:
 *         description: Butterfly updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Butterfly'
 *       404:
 *         description: Not found
 *
 *   delete:
 *     summary: Delete a butterfly by ID
 *     tags: [Butterflies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Butterfly ID
 *     responses:
 *       200:
 *         description: Butterfly deleted successfully
 *       404:
 *         description: Not found
 */

export default router;
