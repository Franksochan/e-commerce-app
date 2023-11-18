import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie";
import "./nav-bar.css";

export const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [_, setCookies] = useCookies(['access_token'])
  const [ cookies ] = useCookies(['access_token'])
  const accessToken = cookies.access_token;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen)
  }

  const logOut = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    
    if (confirmLogout) {
      localStorage.clear();
      setCookies('access_token', null);
    }
  }
  

  return (
    <div className="nav-bar">
      <p>John Lino.dev</p>
      <div className={`nav-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <Link className="nav-item" to="/" onClick={() => setMobileMenuOpen(false)}>
          Shop
        </Link>
        <Link className="nav-item" to="/cart" onClick={() => setMobileMenuOpen(false)}>
          Cart
        </Link>
        <Link className="nav-item" to="/profile" onClick={() => setMobileMenuOpen(false)}>
          Profile
        </Link>
        {accessToken && (
          <Link className="nav-item log-out" onClick={logOut}>
            Logout
          </Link>
        )
       }
      </div>
      {!isMobileMenuOpen ? (
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          &#9776;
        </div>
      ) : (
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          x
        </div>
      )}
    </div>
  )
}
