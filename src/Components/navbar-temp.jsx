import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

import {
  FaShoppingCart,
  FaUserCircle,
  FaStore,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div
        className="logo"
        onClick={() => {
          navigate("/");
          closeMenu();
        }}
      >
        <FaStore />
        <span>Online Store</span>
      </div>

      {/* Mobile Menu Button */}
      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navigation */}
      <ul className={menuOpen ? "nav-links active" : "nav-links"}>

        <li>
          <a href="#categories" onClick={closeMenu}>
            Categories
          </a>
        </li>

        <li>
          <a href="#products" onClick={closeMenu}>
            Products
          </a>
        </li>

        {/* Mobile Cart */}
        <li className="mobile-only">
          <div
            className="cart"
            onClick={() => {
              navigate("/cart");
              closeMenu();
            }}
          >
            <FaShoppingCart />
            <span>Cart</span>

            <div className="badge">
              {cart.length}
            </div>
          </div>
        </li>

        {/* Mobile User */}
        {user && (
          <li className="mobile-only user-mobile">
            <FaUserCircle />
            <span>{user.name}</span>
          </li>
        )}

        {/* Mobile Logout */}
        {user ? (
          <li className="mobile-only">
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        ) : (
          <li className="mobile-only">
            <button
              className="login-btn"
              onClick={() => {
                navigate("/login");
                closeMenu();
              }}
            >
              Login
            </button>
          </li>
        )}

      </ul>

      {/* Desktop Right */}
      <div className="right-section">

        <div
          className="cart"
          onClick={() => navigate("/cart")}
        >
          <FaShoppingCart />

          <span>Cart</span>

          <div className="badge">
            {cart.length}
          </div>
        </div>

        {user ? (
          <>
            <div className="user">
              <FaUserCircle className="user-icon" />
              <span>{user.name}</span>
            </div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              Logout
            </button>
          </>
        ) : (
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}

      </div>

    </nav>
  );
};

export default Navbar;