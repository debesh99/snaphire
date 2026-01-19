import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// New Prop: onSearch (function to handle typing)
const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#969fa8' }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/jobs" style={{ fontSize: '1.5rem', letterSpacing: '0.5px' }}>
          <i className="fas fa-cubes me-2" style={{ color: '#ff4500' }}></i>
          <span style={{ color: '#ffffff' }}>Snaphire</span>
        </Link>

        <button
          className="navbar-toggler navbar-toggler-white"
          type="button"
          onClick={handleNavCollapse}
          style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}
        >
          <i className="fas fa-bars" style={{ color: '#ffffff' }}></i>
        </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNavAltMarkup">
          
          {/* --- SEARCH BAR (Always shows) --- */}
          <div className="mx-auto my-2 my-lg-0 d-flex w-50">
              <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search jobs by title..." 
                  value={searchInput}
                  onChange={handleSearchChange}
                  style={{ backgroundColor: '#ffffff', borderColor: '#ffffff', color: '#000000' }}
              />
          </div>

          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/jobs" style={{ color: '#ffffff', fontWeight: '500' }}>Home</Link>
            <button 
                className="nav-link btn btn-link text-start" 
                onClick={handleLogout} 
                style={{ textDecoration: 'none', color: '#ffffff', fontWeight: '500' }}
            >
                Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;