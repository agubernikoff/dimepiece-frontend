// import { useDispatch } from 'react-redux';
// import { selectPost, setPreEditPost } from '../../redux/actions';
import React from "react";
import { useScroll, motion } from "framer-motion";
import {
  NavLink,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import logo from "../../assets/logo_purple.png";
import shopifyClient from "../../shopify/ShopifyClient.js";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import {scrollToTop} from "../../helpers/ScrollToTop";

function Header() {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const loc = useLocation();
  const dispatch=useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  // const dispatch = useDispatch();

  // const handleAddClick = () => {
  //   dispatch(selectPost({}));
  // };

  // const handleEditClick = () => {
  //   dispatch(setPreEditPost(true));
  // };

  // const activeStyle = ({ isActive }) =>
  //   isActive
  //     ? {
  //         textDecoration: 'none'
  //       }
  //     : null;

  //       console.log(logo);
  const { scrollYProgress } = useScroll();

  return (
    <div className="navbar">
      {loc.pathname.split("/").length >= 4 &&
      loc.pathname.split("/")[1] === "stories" ? (
        <motion.div
          className="scroll-progress-bar"
          style={{
            scaleX: scrollYProgress,
          }}
        />
      ) : null}
      <div className="navbar-left">
        <NavLink 
          onClick={scrollToTop}
          to="/stories/All" className="navbar-link">
          STORIES
        </NavLink>
        <NavLink 
          onClick={scrollToTop} 
          to="/shop/All?filter+by=Latest+Arrivals"
          className="navbar-link"
          // onClick={(e) => {
          //   if (loc.pathname.includes("/shop/")) e.preventDefault();
          // }}
        >
          SHOP
        </NavLink>
        <NavLink onClick={scrollToTop}  to="/about" className="navbar-link">
          ABOUT
        </NavLink>
      </div>
      <div className="navbar-center">
        <img src={logo} className="navbar-image" onClick={() => {nav(`/`);scrollToTop();}} />
      </div>
      <div className="navbar-right">
        <motion.div layout="position"><NavLink onClick={scrollToTop}  to="/newsletter" className="navbar-link">
          NEWSLETTER
        </NavLink></motion.div>
        <motion.div layout="position"><NavLink onClick={scrollToTop}  to="/search" className="navbar-link">
          SEARCH
        </NavLink></motion.div>
        <motion.p layout="position" className="navbar-link" onClick={()=>dispatch(cartActions.toggleDisplayCart())}>
          {`CART${cart.length>0?` (${cart.length})`:""}`}
        </motion.p>
      </div>
    </div>
  );
}

export default Header;
