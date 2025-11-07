import { Router } from 'express';
import { listDoctors, addDoctor, deleteDoctor } from '../controllers/doctorsController.js';
import { validatePagination } from '../middlewares/validators/pagination.js';
import { validateFilters } from '../middlewares/validators/filters.js';
import { validateAddDoctor } from '../middlewares/validators/add-doctor.js';
import { validateDeleteDoctor } from '../middlewares/validators/delete-doctor.js';

const router = Router();

router.post('/', validatePagination, validateFilters, listDoctors);
router.post('/add', validateAddDoctor, addDoctor);
router.delete('/delete', validateDeleteDoctor, deleteDoctor);

export default router;


