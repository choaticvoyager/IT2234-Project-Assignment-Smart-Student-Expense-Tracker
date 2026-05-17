import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import {
  getSummary,
  getBudgetStatus,
  createBudget
} from '../services/api';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8'
];

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [budgetStatus, setBudgetStatus] = useState(null);

  const month = new Date().toISOString().slice(0, 7);

  useEffect(() => {
    getSummary().then((res) => setSummary(res.data));

    getBudgetStatus(month)
      .then((res) => setBudgetStatus(res.data))
      .catch(() => setBudgetStatus(null));
  }, [month]);

  const setBudget = async () => {
    const monthlyBudget = Number(
      prompt('Enter monthly budget:')
    );

    if (!monthlyBudget) return;

    await createBudget({
      monthlyBudget,
      month
    });

    const res = await getBudgetStatus(month);

    setBudgetStatus(res.data);
  };

  const chartData = summary
    ? Object.entries(summary.byCategory).map(
        ([name, value]) => ({
          name,
          value
        })
      )
    : [];

  if (!summary) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <div className="cards">
        <div className="card">
          Income: ${summary.totalIncome}
        </div>

        <div className="card">
          Expenses: ${summary.totalExpense}
        </div>

        <div className="card">
          Balance: ${summary.balance}
        </div>
      </div>

      {budgetStatus ? (
        <p>
          Budget: ${budgetStatus.monthlyBudget}
          {' | '}
          Spent: ${budgetStatus.spent}
          {' | '}
          Remaining: ${budgetStatus.remaining}
        </p>
      ) : (
        <button onClick={setBudget}>
          Set Monthly Budget
        </button>
      )}

      <h3>Spending by Category</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {chartData.map((_, i) => (
              <Cell
                key={i}
                fill={COLORS[i % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}