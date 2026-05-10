import { Router } from 'express';
import { getPackingItems, addPackingItem, updatePackingItem, deletePackingItem } from '../controllers/packingController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate as any);

router.get('/', getPackingItems as any);
router.post('/', addPackingItem as any);
router.put('/:id', updatePackingItem as any);
router.delete('/:id', deletePackingItem as any);

export default router;
