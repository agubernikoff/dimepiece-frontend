// import { useDispatch } from 'react-redux';
// import { selectPost, setPreEditPost } from '../../redux/actions';
import React, { useState } from "react";
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
import Search from "./Search";

function Header() {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const loc = useLocation();
  const dispatch=useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isArticleLoaded = useSelector((state) => state.article.isArticleLoaded);
  const [displaySearch,setDisplaySearch]=useState(false)
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
  const scrollProgress = isArticleLoaded ? scrollYProgress : 0

  function toggleSearch(){
    setDisplaySearch(!displaySearch);
  }
  function hideSearch(){
    setDisplaySearch(false);
  }

  return (
    <div className="header">
      <div className="navbar-container"><div className="navbar">
    {loc.pathname.split("/").length >= 4 &&
    loc.pathname.split("/")[1] === "stories" ? (
      <motion.div
        className="scroll-progress-bar"
        style={{
          scaleX: scrollProgress,
        }}
      />
    ) : null}
    <div className="navbar-left">
      <NavLink onClick={hideSearch}
        to="/stories?categories=All" className="navbar-link">
        STORIES
      </NavLink>
      <NavLink onClick={hideSearch}
        to="/shop?brands=All&filter+by=Latest+Arrivals"
        className="navbar-link"
        // onClick={(e) => {
        //   if (loc.pathname.includes("/shop/")) e.preventDefault();
        // }}
      >
        SHOP
      </NavLink>
      <NavLink  onClick={hideSearch} to="/about" className="navbar-link">
        ABOUT
      </NavLink>
    </div>
    <div className="navbar-center">
      <img src={logo} className="navbar-image" onClick={() => {nav(`/`);hideSearch()}} />
    </div>
    <div className="navbar-right">
      <motion.div style={{ originY: '0px' }} layout="position"><NavLink onClick={hideSearch}  to="/newsletter" className="navbar-link">
        NEWSLETTER
      </NavLink></motion.div>
      <motion.p style={{ originY: '0px' }} layout="position"className="navbar-link" onClick={()=>{toggleSearch();dispatch(cartActions.setSearchResults(""))}}>
        SEARCH
      </motion.p>
      <motion.p style={{ originY: '0px' }} layout="position" className="navbar-link" onClick={()=>{dispatch(cartActions.toggleDisplayCart());hideSearch()}}>
        {`CART${cart.length>0?` (${cart.length})`:""}`}
      </motion.p>
    </div>
  </div></div>
      {displaySearch?<Search hideSearch={hideSearch}/>:null}
      </div>
  );
}

export default Header;
