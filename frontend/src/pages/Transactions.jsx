import { useCallback, useEffect, useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../services/api';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getTransactions();
      setTransactions(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleCreateOrUpdate = async (payload) => {
    if (editing) {
      await updateTransaction(editing._id, payload);
      setMessage('Transaction updated successfully');
      setEditing(null);
    } else {
      await createTransaction(payload);
      setMessage('Transaction added successfully');
    }

    await fetchTransactions();

    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const handleEdit = (transaction) => {
    setEditing(transaction);
    setMessage('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleCancelEdit = () => {
    setEditing(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this transaction?');

    if (!confirmed) return;

    try {
      await deleteTransaction(id);

      setMessage('Transaction deleted');

      if (editing?._id === id) {
        setEditing(null);
      }

      await fetchTransactions();

      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete transaction');
    }
  };

  return (
    <div className="container">
      <h2>Transactions</h2>

      {message && <p style={{ color: '#166534' }}>{message}</p>}

      {error && <p className="error">{error}</p>}

      <TransactionForm
        onSubmit={handleCreateOrUpdate}
        editing={editing}
        onCancelEdit={handleCancelEdit}
      />

      <div style={{ marginTop: '1.5rem' }}>
        <TransactionList
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
}