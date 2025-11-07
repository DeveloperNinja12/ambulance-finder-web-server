import { Router } from 'express';
import { listAmbulances, addAmbulance, deleteAmbulance } from '../controllers/ambulancesController.js';
import { validatePagination } from '../middlewares/validators/pagination.js';
import { validateFilters } from '../middlewares/validators/filters.js';
import { validateAddAmbulance } from '../middlewares/validators/add-ambulance.js';
import { validateDeleteAmbulance } from '../middlewares/validators/delete-ambulance.js';

const router = Router();

router.post('/', validatePagination, validateFilters, listAmbulances);
router.post('/add', validateAddAmbulance, addAmbulance);
router.delete('/delete', validateDeleteAmbulance, deleteAmbulance);

export default router;


