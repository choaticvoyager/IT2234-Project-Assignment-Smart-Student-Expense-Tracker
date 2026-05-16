const express = require('express');
const {
  createBudget,
  getBudgets,
  updateBudget,
  getBudgetStatus,
} = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/status', getBudgetStatus);
router.route('/').get(getBudgets).post(createBudget);
router.route('/:id').put(updateBudget);

module.exports = router;