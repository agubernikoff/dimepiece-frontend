import React, { useEffect } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import {
  NavLink,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import logo from "../../assets/logo_purple.png";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import Search from "./Search";

function Header() {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search");
  const loc = useLocation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isArticleLoaded = useSelector((state) => state.article.isArticleLoaded);
  const displaySearch = useSelector((state) => state.cart.displaySearch);

  useEffect(() => {
    if (searchTerm) {
      dispatch(cartActions.setSearchText(searchTerm));
    }
  }, []);

  const { scrollYProgress } = useScroll();
  const scrollProgress = isArticleLoaded ? scrollYProgress : 0;

  function toggleSearch() {
    dispatch(cartActions.toggleDisplaySearch());
  }
  function hideSearch() {
    dispatch(cartActions.hideSearch());
  }

  return (
    <div className="header">
      <AnimatePresence>
        {displaySearch && <Search hideSearch={hideSearch} />}
      </AnimatePresence>
      <div className="navbar-container">
        {loc.pathname.split("/").length >= 4 &&
        loc.pathname.split("/")[1] === "stories" ? (
          <motion.div
            className="scroll-progress-bar"
            style={{
              scaleX: scrollProgress,
            }}
          />
        ) : null}
        <div className="navbar">
          <div className="navbar-left">
            <NavLink
              onClick={hideSearch}
              to="/stories/All"
              className="navbar-link"
            >
              STORIES
            </NavLink>
            <NavLink
              onClick={hideSearch}
              to="/shop/All?filter+by=Latest+Arrivals"
              className="navbar-link"
            >
              SHOP
            </NavLink>
            <NavLink onClick={hideSearch} to="/about" className="navbar-link">
              ABOUT
            </NavLink>
          </div>
          <div className="navbar-center">
            <img
              src={logo}
              className="navbar-image"
              onClick={() => {
                nav(`/`);
                hideSearch();
              }}
            />
          </div>
          <div className="navbar-right">
            <motion.div style={{ originY: "0px" }} layout="position">
              <NavLink
                onClick={hideSearch}
                to="/newsletter"
                className="navbar-link"
              >
                NEWSLETTER
              </NavLink>
            </motion.div>
            <motion.p
              style={{ originY: "0px" }}
              layout="position"
              className="navbar-link"
              onClick={() => {
                toggleSearch();
                if (!searchTerm) {
                  dispatch(cartActions.setSearchResults(""));
                }
              }}
            >
              SEARCH
            </motion.p>
            <motion.p
              style={{ originY: "0px" }}
              layout="position"
              className="navbar-link"
              onClick={() => {
                dispatch(cartActions.toggleDisplayCart());
                hideSearch();
              }}
            >
              {`CART${cart.length > 0 ? ` (${cart.length})` : ""}`}
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
