import express from "express";
import categoryController from '../../controllers/v1/category.controller.js'
const router = express.Router();

router.get('/', categoryController.getAll); // get all routes
router.post('/', categoryController.create);
export default router;