import { Router } from 'express';
import { getTripStops, addTripStop, updateTripStop, deleteTripStop } from '../controllers/itineraryController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate as any);

router.get('/', getTripStops as any);
router.post('/', addTripStop as any);
router.put('/:id', updateTripStop as any);
router.delete('/:id', deleteTripStop as any);

export default router;
