export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
  loading,
}) {
  if (loading) {
    return <p>Loading transactions...</p>;
  }

  if (!transactions.length) {
    return <p>No transactions yet. Add your first one above.</p>;
  }

  return (
    <div className="card">
      <h3>Transaction History</h3>

      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr>
              <th align="left">Date</th>
              <th align="left">Title</th>
              <th align="left">Type</th>
              <th align="left">Category</th>
              <th align="right">Amount</th>
              <th align="left">Description</th>
              <th align="center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr
                key={t._id}
                style={{
                  borderTop: '1px solid #e5e7eb',
                }}
              >
                <td>
                  {new Date(t.date).toLocaleDateString()}
                </td>

                <td>{t.title}</td>

                <td>
                  <span
                    className={
                      t.type === 'income'
                        ? 'badge income'
                        : 'badge expense'
                    }
                  >
                    {t.type}
                  </span>
                </td>

                <td>{t.category}</td>

                <td align="right">
                  {t.type === 'expense' ? '-' : '+'}$
                  {Number(t.amount).toFixed(2)}
                </td>

                <td>{t.description || '—'}</td>

                <td align="center">
                  <button
                    type="button"
                    onClick={() => onEdit(t)}
                    style={{ marginRight: '0.5rem' }}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(t._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}