import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useSearch } from "../Context/SearchContext";
import { useWishlist } from "../Context/WishlistContext";

import {
  FaShoppingCart,
  FaUserCircle,
  FaStore,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaSearch,
  FaHeart,
} from "react-icons/fa";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { search, setSearch } = useSearch();
  

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
   const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div
        className="logo"
        onClick={() => {
          navigate("/");
          closeMenu();
          const handleSearch = (e) => {
  setSearch(e.target.value);
};
        }}
      >
        <FaStore />
        <span>Online Store</span>
      </div>
      {/* Search Bar */}

<div className="search-container">

  <FaSearch className="search-icon" />

  <input
  type="text"
  placeholder="Search products..."
  className="search-input"
  value={search}
  onChange={handleSearch}
/>

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
  <a href="/#categories" onClick={closeMenu}>
    Categories
  </a>
</li>

<li>
  <a href="/#products" onClick={closeMenu}>
    Products
  </a>
</li>

        <li className="mobile-only">
  <div
    className="cart"
    onClick={() => {
      navigate("/wishlist");
      closeMenu();
    }}
  >
    <FaHeart />
    <span>Wishlist</span>

    <div className="badge">
      {wishlist.length}
    </div>
  </div>
</li>

        {/* Mobile Cart */}
        <li className="mobile-only">
          <div
            className="cart"
            onClick={() => {
              navigate("/cart");
              closeMenu();
              const handleSearch = (e) => {
  setSearch(e.target.value);
};
            }}
            
          >
            <FaShoppingCart />
            <span>Cart</span>

            <div className="badge">
              {cart.length}
            </div>
          </div>
        </li>
        

        
        

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
  onClick={() => navigate("/wishlist")}
>
  <FaHeart />

  <span>Wishlist</span>

  <div className="badge">
    {wishlist.length}
  </div>
</div>

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