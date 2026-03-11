import express from "express";
import merchantController from '../../controllers/v1/merchant.controller.js'

const router = express.Router();

router.get('/', merchantController.getAll); // get all routes
router.post('/', merchantController.create);

export default router;