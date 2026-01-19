import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold" to="/jobs">
          <i className="fas fa-cubes me-2" style={{ color: '#ff6219' }}></i>
          Snaphire
        </Link>

        {/* Mobile Toggler Button */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNavAltMarkup"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Menu Items */}
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto"> {/* ms-auto pushes items to the right */}
            
            <Link className="nav-link active" to="/jobs">Home</Link>
            
            {/* We can add more links here later, like 'Profile' or 'Applications' */}
            
            <button 
                className="nav-link btn btn-link text-start" 
                onClick={handleLogout} 
                style={{ textDecoration: 'none' }}
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