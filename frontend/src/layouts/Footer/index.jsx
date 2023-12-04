import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import shopifyClient from "../../shopify/ShopifyClient.js";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cart-slice.js";

function Footer() {
  const dispatch = useDispatch();
  const [times, setTimes] = useState({
    Geneva: new Date().toLocaleTimeString("en-US", {
      timeZone: "Europe/Zurich",
      hour12: false,
    }),
    LosAngeles: new Date().toLocaleTimeString("en-US", {
      timeZone: "America/Los_Angeles",
      hour12: false,
    }),
    NewYork: new Date().toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
      hour12: false,
    }),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimes({
        Geneva: new Date().toLocaleTimeString("en-US", {
          timeZone: "Europe/Zurich",
          hour12: false,
        }),
        LosAngeles: new Date().toLocaleTimeString("en-US", {
          timeZone: "America/Los_Angeles",
          hour12: false,
        }),
        NewYork: new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour12: false,
        }),
      });
    }, 1000); // Update every second

    return () => {
      clearInterval(interval); // Cleanup the interval on component unmount
    };
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  const scrollToTopFooter = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adds smooth scrolling animation
    });
  };
  return (
    <div className="footer">
      <div className="footer-left-container">
        <div className="footer-left-column">
          <p>© DIMEPIECE LLC 2023,</p>
          <p>All Rights Reserved.</p>
          <br />
          <div>
            <p>Los Angeles — {times.LosAngeles}</p>
            <p>New York — {times.NewYork}</p>
            <p>Geneva — {times.Geneva} </p>
          </div>
          <br />
          <a
            href="https://www.swallstudios.com/"
            className="navbar-link site-credit"
            rel="noopener noreferrer"
            target="_blank"
          >
            Site Credit
          </a>
        </div>
        <div className="footer-links">
          <p>
            <strong>LINKS</strong>
          </p>
          <br />
          <NavLink
            onClick={() => dispatch(cartActions.hideSearch())}
            className="navbar-link"
            to="/stories/All"
          >
            Stories
          </NavLink>
          <NavLink
            onClick={() => dispatch(cartActions.hideSearch())}
            className="navbar-link"
            to="/shop/All?filter+by=Latest+Arrivals"
          >
            Shop
          </NavLink>
          <NavLink
            onClick={() => dispatch(cartActions.hideSearch())}
            className="navbar-link"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => dispatch(cartActions.hideSearch())}
            className="navbar-link"
            to="/newsletter"
          >
            Newsletter
          </NavLink>
        </div>
        <div className="footer-left-column">
          <p>
            <strong>CUSTOMER CARE</strong>
          </p>
          <br />
          <NavLink
            onClick={() => dispatch(cartActions.hideSearch())}
            className="navbar-link"
            to="/shipping_and_returns"
          >
            Shipping & Returns
          </NavLink>
          <NavLink
            onClick={() => dispatch(cartActions.hideSearch())}
            className="navbar-link"
            to="/faq"
          >
            FAQ
          </NavLink>
          <NavLink
            onClick={() => dispatch(cartActions.hideSearch())}
            className="navbar-link"
            to="/terms_and_conditions"
          >
            Terms & Conditions
          </NavLink>
          <NavLink
            onClick={() => dispatch(cartActions.hideSearch())}
            className="navbar-link"
            to="/warranty"
          >
            Warranty
          </NavLink>
        </div>
      </div>
      <div className="footer-right-container">
        <button
          onClick={() => {
            scrollToTopFooter();
            dispatch(cartActions.hideSearch());
          }}
        >
          <p>BACK TO TOP</p>
          <p>{String.fromCharCode(8593)}</p>
        </button>
      </div>
    </div>
  );
}

export default Footer;
