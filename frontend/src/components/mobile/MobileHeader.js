import React, { useState } from "react";
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
  return (
    <div className="mobile-nav">
      <div className="mobile-hamburger-menu">
        <div className="hamburger-icon" onClick={toggleMenu}>
          <img src={hamburger} alt="burger" />
        </div>
        {isOpen && <div className="menu-content">{"list of items"}</div>}
      </div>
      <div className="mobile-logo">
        <img src={logo} className="navbar-image" onClick={() => nav(`/`)} />
      </div>
      <div className="mobile-search-cart">
        <div className="mobile-search-icon">
          <img src={search} alt="search" />
        </div>
        <div className="mobile-cart-icon">
          <img src={cart} alt="cart" />
          <p className="mobile-cart-number">1</p>
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
