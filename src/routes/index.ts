import { Router } from 'express';
import doctorsRouter from './doctors.js';
import ambulancesRouter from './ambulances.js';

const router = Router();

router.use('/doctors', doctorsRouter);
router.use('/ambulances', ambulancesRouter);

export default router;


