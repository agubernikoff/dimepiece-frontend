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
import { mobileFilterActions } from "../../redux/mobile-filter-slice";
import MobileSearch from "./MobileSearch";

function MobileHeader() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search");
  const dispatch = useDispatch();
  const isArticleLoaded = useSelector((state) => state.article.isArticleLoaded);
  const [isOpen, setIsOpen] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const displayCart = useSelector((state) => state.cart.displayCart);

  useEffect(() => {
    if (searchTerm) {
      dispatch(cartActions.setSearchText(searchTerm));
    }
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");

    if (isOpen || displayCart) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }

    return () => {
      body.style.overflow = "";
    };
  }, [isOpen, displayCart]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const hideMenu = () => {
    setIsOpen(false);
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

  function toggleSearch() {
    setDisplaySearch(!displaySearch);
  }
  function hideSearch() {
    setDisplaySearch(false);
  }
  return (
    <div className="header">
      <AnimatePresence>
        {displaySearch && <MobileSearch hideSearch={hideSearch} />}
      </AnimatePresence>
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
          <div
            className="hamburger-icon"
            onClick={() => {
              toggleMenu();
              hideSearch();
              dispatch(mobileFilterActions.setPrimaryFilter(""));
            }}
          >
            <img src={hamburger} alt="burger" />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                key="menu"
                className="menu-content"
              >
                <ul className="menu-list">
                  <motion.li>
                    <NavLink
                      to="/stories/All"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      STORIES
                    </NavLink>
                  </motion.li>
                  <motion.li>
                    <NavLink
                      to="/shop/All?filter+by=Latest+Arrivals"
                      onClick={() => {
                        setIsOpen(false);
                        dispatch(mobileFilterActions.setPrimaryFilter("All"));
                      }}
                    >
                      SHOP
                    </NavLink>
                  </motion.li>
                  <motion.li>
                    <NavLink
                      to="/newsletter"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      NEWSLETTER
                    </NavLink>
                  </motion.li>
                  <motion.li>
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
              hideSearch();
            }}
          />
        </div>
        <div className="mobile-search-cart">
          <div className="mobile-search-icon">
            <img
              src={search}
              alt="search"
              onClick={() => {
                toggleSearch();
                if (!searchTerm) {
                  dispatch(cartActions.setSearchResults(""));
                }
                hideMenu();
              }}
            ></img>
          </div>
          <div
            className="mobile-cart-icon"
            onClick={() => {
              dispatch(cartActions.toggleDisplayCart());
              hideSearch();
              hideMenu();
            }}
          >
            <img src={cartImg} alt="cart" />
            {cart.length > 0 ? (
              <div className="mobile-cart-number">{cart.length}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
