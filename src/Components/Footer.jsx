import React from "react";
import {
  FaStore,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Logo */}

        <div className="footer-box">

          <div className="footer-logo">
            <FaStore />
            <h2>Online Store</h2>
          </div>

          <p>
            Shop smart with our premium online shopping experience.
            Discover quality products at the best prices with
            secure payments and fast delivery.
          </p>

        </div>

        {/* Quick Links */}

        <div className="footer-box">

          <h3>Quick Links</h3>

          <ul>

            <li>
              <a href="#">Home</a>
            </li>

            <li>
              <a href="#categories">Categories</a>
            </li>

            <li>
              <a href="#products">Products</a>
            </li>

            <li>
              <a href="/cart">Cart</a>
            </li>

          </ul>

        </div>

        {/* Contact */}

        <div className="footer-box">

          <h3>Contact</h3>

          <p>
            <FaPhoneAlt /> +91 9198370285
          </p>

          <p>
            <FaEnvelope />ankurpatel926091.com
          </p>

          <p>
            <FaMapMarkerAlt /> Lucknow, India
          </p>

        </div>

        {/* Social */}

        <div className="footer-box">

          <h3>Follow Us</h3>

          <div className="social-icons">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaLinkedinIn />
            </a>

            <a href="#">
              <FaGithub />
            </a>

          </div>

        </div>

      </div>

      <hr />

      <div className="copyright">

        © 2026 Design And Developed By Ankur Patel Online Store | All Rights Reserved.

      </div>

    </footer>
  );
};

export default Footer;