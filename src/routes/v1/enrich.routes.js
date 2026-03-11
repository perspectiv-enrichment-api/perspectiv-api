import express from "express";
import enrichController from '../../controllers/v1/enrich.controller.js';
import validate from '../../middleware/validation.middleware.js';
import schema from '../../validator/enrich.schema.js';

const router = express.Router();

router.post('/', validate(schema), enrichController.enrich); // get all routes

export default router;