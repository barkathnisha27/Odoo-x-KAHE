import { Router } from 'express';
import { shareTrip, getSharedTrip } from '../controllers/shareController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate as any, shareTrip as any);
router.get('/:slug', getSharedTrip);

export default router;
