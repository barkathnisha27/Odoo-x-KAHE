import { Router } from 'express';
import { getTripBudgets, updateBudget, deleteBudget } from '../controllers/budgetController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate as any);

router.get('/', getTripBudgets as any);
router.post('/', updateBudget as any);
router.delete('/:id', deleteBudget as any);

export default router;
