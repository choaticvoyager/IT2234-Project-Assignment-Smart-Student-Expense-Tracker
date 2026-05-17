import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login');
  };

  if (!token) return null;

  return (
    <nav>
      <Link to="/">Dashboard</Link>

      <Link to="/transactions">Transactions</Link>

      <span style={{ marginLeft: 'auto' }}>
        {user?.name ? `Hi, ${user.name}` : 'Student'}
      </span>

      <button
        type="button"
        onClick={handleLogout}
        style={{ marginLeft: '1rem' }}
      >
        Logout
      </button>
    </nav>
  );
}