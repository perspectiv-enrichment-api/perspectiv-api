import express from "express";
import enrichRouter from './enrich.routes.js';
import categoryRouter from './categories.routes.js';
import merchantRouter from './merchant.routes.js';


const router = express.Router();

router.use('/enrich', enrichRouter);
router.use('/categories', categoryRouter);
router.use('/merchants', merchantRouter);

export default router;