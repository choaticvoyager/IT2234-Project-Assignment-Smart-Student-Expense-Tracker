const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');

// POST /api/budgets
const createBudget = async (req, res) => {
  const { monthlyBudget, month } = req.body;

  if (!monthlyBudget || !month) {
    return res.status(400).json({ message: 'monthlyBudget and month are required' });
  }

  if (Number(monthlyBudget) <= 0) {
    return res.status(400).json({ message: 'Budget must be positive' });
  }

  const budget = await Budget.create({
    monthlyBudget,
    month,
    userId: req.user._id,
  });

  res.status(201).json(budget);
};

// GET /api/budgets?month=2026-05
const getBudgets = async (req, res) => {
  const filter = { userId: req.user._id };
  if (req.query.month) filter.month = req.query.month;

  const budgets = await Budget.find(filter);
  res.json(budgets);
};

// PUT /api/budgets/:id
const updateBudget = async (req, res) => {
  const budget = await Budget.findById(req.params.id);

  if (!budget) {
    return res.status(404).json({ message: 'Budget not found' });
  }

  if (budget.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const updated = await Budget.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json(updated);
};

// GET /api/budgets/status?month=2026-05
const getBudgetStatus = async (req, res) => {
  const month = req.query.month;
  if (!month) {
    return res.status(400).json({ message: 'month query is required (YYYY-MM)' });
  }

  const budget = await Budget.findOne({ userId: req.user._id, month });
  if (!budget) {
    return res.status(404).json({ message: 'Budget not set for this month' });
  }

  const start = new Date(`${month}-01`);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);

  const expenses = await Transaction.find({
    userId: req.user._id,
    type: 'expense',
    date: { $gte: start, $lt: end },
  });

  const spent = expenses.reduce((sum, t) => sum + t.amount, 0);
  const remaining = budget.monthlyBudget - spent;

  res.json({
    month,
    monthlyBudget: budget.monthlyBudget,
    spent,
    remaining,
    isOverBudget: remaining < 0,
  });
};

module.exports = {
  createBudget,
  getBudgets,
  updateBudget,
  getBudgetStatus,
};