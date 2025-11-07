import { Router } from 'express';
import { listDoctors, addDoctor } from '../controllers/doctorsController.js';
import { validatePagination } from '../middlewares/validators/pagination.js';
import { validateFilters } from '../middlewares/validators/filters.js';
import { validateAddDoctor } from '../middlewares/validators/add-doctor.js';

const router = Router();

router.post('/', validatePagination, validateFilters, listDoctors);
router.post('/add', validateAddDoctor, addDoctor);

export default router;


