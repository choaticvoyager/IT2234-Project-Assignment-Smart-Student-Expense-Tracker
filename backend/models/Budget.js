const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema(
  {
    monthlyBudget: {
      type: Number,
      required: [true, 'Monthly budget is required'],
      min: [1, 'Budget must be at least 1'],
    },
    month: {
      type: String,
      required: [true, 'Month is required'], // format: YYYY-MM
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

budgetSchema.index({ userId: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('Budget', budgetSchema);