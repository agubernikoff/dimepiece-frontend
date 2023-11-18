import React, { useState, useEffect } from "react";
import {
  NavLink,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import logo from "../../assets/logo_purple.png";
import search from "../../assets/search_icon.png";
import cartImg from "../../assets/cart_icon.png";
import hamburger from "../../assets/hamburger.png";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cart-slice";

function MobileHeader() {
  const dispatch = useDispatch();
  const isArticleLoaded = useSelector((state) => state.article.isArticleLoaded);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const nav = useNavigate();

  // useEffect(() => {
  //   const body = document.querySelector("body");
  //   if (isOpen) {
  //     body.style.overflow = "hidden"; // Disable scrolling when menu is open
  //   } else {
  //     body.style.overflow = ""; // Enable scrolling when menu is closed
  //   }

  //   return () => {
  //     // Cleanup function to restore scrolling when component unmounts
  //     body.style.overflow = "";
  //   };
  // }, [isOpen]);

  const { scrollYProgress } = useScroll();
  const scrollProgress = isArticleLoaded ? scrollYProgress : 0;

  const loc = useLocation();

  const cart = useSelector((state) => state.cart.cart);

  const list = {
    visible: {
      scaleX: 1,
      transition: {
        when: "beforeChildren",
        duration: 0.5,
      },
    },
    hidden: {
      scaleX: 0,
      // transition: {
      //   when: "afterChildren",
      // },
    },
  };

  const item = {
    visible: { opacity: 1, x: 0, transition: "linear" },
    hidden: { opacity: 0, x: -100, transition: "linear" },
  };
  return (
    <div className="mobile-nav">
      {loc.pathname.split("/").length >= 4 &&
      loc.pathname.split("/")[1] === "stories" ? (
        <motion.div
          className="mobile-scroll-progress-bar"
          style={{
            scaleX: scrollProgress,
          }}
        />
      ) : null}
      <div className="mobile-hamburger-menu">
        <div className="hamburger-icon" onClick={toggleMenu}>
          <img src={hamburger} alt="burger" />
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={list}
              transition={{ duration: 0.5, ease: "linear" }}
              key="menu"
              className="menu-content"
            >
              <ul className="menu-list">
                <motion.li variants={item}>
                  <NavLink
                    to="/stories"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    STORIES
                  </NavLink>
                </motion.li>
                <motion.li variants={item}>
                  <NavLink
                    to="/shop"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    SHOP
                  </NavLink>
                </motion.li>
                <motion.li variants={item}>
                  <NavLink
                    to="/newsletter"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    NEWSLETTER
                  </NavLink>
                </motion.li>
                <motion.li variants={item}>
                  <NavLink
                    to="/about"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    ABOUT
                  </NavLink>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
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
        <div
          className="mobile-cart-icon"
          onClick={() => dispatch(cartActions.toggleDisplayCart())}
        >
          <img src={cartImg} alt="cart" />
          {cart.length > 0 ? (
            <div className="mobile-cart-number">{cart.length}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
