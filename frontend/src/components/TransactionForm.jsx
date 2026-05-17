import { useEffect, useState } from 'react';

const CATEGORIES = [
  'Food',
  'Transport',
  'Bills',
  'Education',
  'Entertainment',
  'Other',
];

const emptyForm = {
  title: '',
  amount: '',
  type: 'expense',
  category: 'Food',
  date: new Date().toISOString().slice(0, 10),
  description: '',
};

export default function TransactionForm({
  onSubmit,
  editing,
  onCancelEdit,
}) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title || '',
        amount: String(editing.amount ?? ''),
        type: editing.type || 'expense',
        category: editing.category || 'Food',
        date: editing.date
          ? new Date(editing.date).toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10),
        description: editing.description || '',
      });
    } else {
      setForm({
        ...emptyForm,
        date: new Date().toISOString().slice(0, 10),
      });
    }

    setError('');
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    try {
      await onSubmit({
        title: form.title.trim(),
        amount: Number(form.amount),
        type: form.type,
        category: form.category,
        date: form.date,
        description: form.description.trim(),
      });

      if (!editing) {
        setForm({
          ...emptyForm,
          date: new Date().toISOString().slice(0, 10),
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save transaction');
    }
  };

  return (
    <div className="card">
      <h3>{editing ? 'Edit Transaction' : 'Add Transaction'}</h3>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title (e.g. Lunch)"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={handleChange}
          rows={3}
        />

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit">
            {editing ? 'Update' : 'Add'}
          </button>

          {editing && (
            <button type="button" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}