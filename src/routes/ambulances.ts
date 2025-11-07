import { Router } from 'express';
import { listAmbulances, addAmbulance } from '../controllers/ambulancesController.js';
import { validatePagination } from '../middlewares/validators/pagination.js';
import { validateFilters } from '../middlewares/validators/filters.js';
import { validateAddAmbulance } from '../middlewares/validators/add-ambulance.js';

const router = Router();

router.post('/', validatePagination, validateFilters, listAmbulances);
router.post('/add', validateAddAmbulance, addAmbulance);

export default router;


