import React, { useState, useEffect } from "react";
import {
  NavLink,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import logo from "../../assets/logo_purple.png";
import search from "../../assets/search_icon.png";
import cart from "../../assets/cart_icon.png";
import hamburger from "../../assets/hamburger.png";

function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const nav = useNavigate();

  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body.style.overflow = "hidden"; // Disable scrolling when menu is open
    } else {
      body.style.overflow = ""; // Enable scrolling when menu is closed
    }

    return () => {
      // Cleanup function to restore scrolling when component unmounts
      body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="mobile-nav">
      <div className="mobile-hamburger-menu">
        <div className="hamburger-icon" onClick={toggleMenu}>
          <img src={hamburger} alt="burger" />
        </div>
        <div className={`menu-content ${isOpen ? "open" : ""}`}>
          <ul className="menu-list">
            <li>
              <NavLink to="/stories" onClick={() => setIsOpen(false)}>
                STORIES
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" onClick={() => setIsOpen(false)}>
                SHOP
              </NavLink>
            </li>
            <li>
              <NavLink to="/newsletter" onClick={() => setIsOpen(false)}>
                NEWSLETTER
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={() => setIsOpen(false)}>
                ABOUT
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="mobile-logo">
        <img
          src={logo}
          className="navbar-image"
          onClick={() => {
            nav(`/`);
            setIsOpen(false);
          }}
        />
      </div>
      <div className="mobile-search-cart">
        <div className="mobile-search-icon">
          <img src={search} alt="search" />
        </div>
        <div className="mobile-cart-icon">
          <img src={cart} alt="cart" />
          <div className="mobile-cart-number">1</div>
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
