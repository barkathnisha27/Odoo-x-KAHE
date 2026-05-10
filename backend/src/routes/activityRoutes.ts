import { Router } from 'express';
import { getAllActivities, createActivity } from '../controllers/activityController';
import { authenticate, authorizeAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getAllActivities);
router.post('/', authenticate as any, authorizeAdmin as any, createActivity);

export default router;
