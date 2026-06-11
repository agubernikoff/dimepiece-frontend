import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mobileFilterActions } from "../../redux/mobile-filter-slice";
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
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="mobile-footer">
      <div className="mobile-footer-top-container">
        <div className="mobile-footer-column">
          <p className="mobile-bold">
            <strong>LINKS</strong>
          </p>
          <NavLink
            onClick={() => dispatch(cartActions.hideSearch())}
            className="navbar-link"
            to="/stories"
          >
            Stories
          </NavLink>
          <NavLink
            className="navbar-link"
            to="/shop/All?filter+by=Latest+Arrivals"
            onClick={() => {
              dispatch(mobileFilterActions.setPrimaryFilter("All"));
              dispatch(cartActions.hideSearch());
            }}
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
          <a
            href="https://dimepiece.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-link"
          >
            Newsletter
          </a>
        </div>
        <div className="mobile-footer-column">
          <p className="mobile-bold">
            <strong>CUSTOMER CARE</strong>
          </p>
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

      <div className="mobile-footer-bottom-container">
        <div className="mobile-footer-column">
          <p>© DIMEPIECE LLC 2023,</p>
          <p>All Rights Reserved.</p>
        </div>
        <div className="mobile-footer-column">
          <p>Los Angeles — {times.LosAngeles}</p>
          <p>New York — {times.NewYork}</p>
          <p>Geneva — {times.Geneva} </p>
        </div>
        <a
          href="https://www.swallstudios.com/"
          className="navbar-link site-credit-mobile"
          rel="noopener noreferrer"
          target="_blank"
        >
          Site Credit
        </a>
      </div>
    </div>
  );
}

export default Footer;
