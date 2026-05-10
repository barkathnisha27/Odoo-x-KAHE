import { Router } from 'express';
import { getAllTrips, getTripById, createTrip, updateTrip, deleteTrip } from '../controllers/tripController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate as any);

router.get('/', getAllTrips as any);
router.get('/:id', getTripById as any);
router.post('/', createTrip as any);
router.put('/:id', updateTrip as any);
router.delete('/:id', deleteTrip as any);

export default router;
