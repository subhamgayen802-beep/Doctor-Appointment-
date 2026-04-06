
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {logoutUser}from "../features/authActions"

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate('/login');
    });
  };

  return (
    <button 
      onClick={handleLogout}
      style={{
        padding: '0.5rem 1rem',
        background: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton