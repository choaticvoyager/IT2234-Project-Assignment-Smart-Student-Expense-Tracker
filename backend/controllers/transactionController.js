const Transaction = require('../models/Transaction');

// POST /api/transactions
const createTransaction = async (req, res) => {
  const { title, amount, type, category, date, description } = req.body;

  if (!title || !amount || !type || !category) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  if (Number(amount) <= 0) {
    return res.status(400).json({ message: 'Amount must be positive' });
  }

  const transaction = await Transaction.create({
    title,
    amount,
    type,
    category,
    date,
    description,
    userId: req.user._id,
  });

  res.status(201).json(transaction);
};

// GET /api/transactions
const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user._id }).sort({
    date: -1,
  });
  res.json(transactions);
};

// GET /api/transactions/:id
const getTransactionById = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' });
  }

  if (transaction.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  res.json(transaction);
};

// PUT /api/transactions/:id
const updateTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' });
  }

  if (transaction.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const updated = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json(updated);
};

// DELETE /api/transactions/:id
const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' });
  }

  if (transaction.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  await transaction.deleteOne();
  res.json({ message: 'Transaction removed' });
};

// GET /api/transactions/summary
const getSummary = async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user._id });

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const byCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  res.json({
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    byCategory,
    count: transactions.length,
  });
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
};