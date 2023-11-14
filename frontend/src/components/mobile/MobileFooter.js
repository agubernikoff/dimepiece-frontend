import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import shopifyClient from "../../shopify/shopify.js";

function Footer() {
  const [times, setTimes] = useState({
    London: new Date().toLocaleTimeString("en-US", {
      timeZone: "Europe/London",
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
        London: new Date().toLocaleTimeString("en-US", {
          timeZone: "Europe/London",
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adds smooth scrolling animation
    });
  };
  return (
    <div className="mobile-footer">
      <div className="mobile-footer-top-container">
        <div className="mobile-footer-column-margin-zero">
          <p className="mobile-bold">
            <strong>CUSTOMER CARE</strong>
          </p>
          <NavLink className="navbar-link" to="/shipping_and_returns">
            Shipping & Returns
          </NavLink>
          <NavLink className="navbar-link" to="/faq">
            FAQ
          </NavLink>
          <NavLink className="navbar-link" to="/terms_and_conditions">
            Terms & Conditions
          </NavLink>
          <NavLink className="navbar-link" to="/warranty">
            Warranty
          </NavLink>
        </div>
        <div className="mobile-footer-column-margin-zero">
          <p className="mobile-bold">
            <strong>LINKS</strong>
          </p>
          <NavLink className="navbar-link" to="/stories">
            Stories
          </NavLink>
          <NavLink className="navbar-link" to="/shop">
            Shop
          </NavLink>
          <NavLink className="navbar-link" to="/about">
            About
          </NavLink>
          <NavLink className="navbar-link" to="/newsletter">
            Newsletter
          </NavLink>
          <NavLink className="navbar-link" to="/search">
            Search
          </NavLink>
          <NavLink className="navbar-link" to="/cart">
            Cart (0)
          </NavLink>
        </div>
        <div className="mobile-footer-column-margin-zero">
          <p className="mobile-bold">
            <strong>GET IN TOUCH</strong>
          </p>
          <p>Contact Us</p>
          <p>Press Releases</p>
          <p>Instagram</p>
        </div>
      </div>
      <div className="mobile-footer-bottom-container">
        <div className="mobile-footer-column-margin-zero">
          <p>© DIMEPIECE LLC 2023,</p>
          <p>All Rights Reserved.</p>
        </div>
        <a>Site Credit</a>
        <div className="mobile-footer-column-margin-zero">
          <p>LA: {times.LosAngeles}</p>
          <p>NY: {times.NewYork}</p>
          <p>LON: {times.London} </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;