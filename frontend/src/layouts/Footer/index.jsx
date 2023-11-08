import React, { useState, useEffect } from "react";
import {NavLink} from "react-router-dom";

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
    <div className="footer">
      <div className="footer-left-container">
        <div className="footer-left-column">
          <p>© DIMEPIECE LLC 2023,</p>
          <p>All Rights Reserved.</p>
          <br />
          <div>
            <p>LA: {times.LosAngeles}</p>
            <p>NY: {times.NewYork}</p>
            <p>LON: {times.London} </p>
          </div>
          <br />
          <a>Site Credit</a>
        </div>
        <div className="footer-links">
          <p>
            <strong>LINKS</strong>
          </p>
          <br />
          <p>Stories</p>
          <p>Shop</p>
          <p>About</p>
          <p>Newsletter</p>
          <p>Search</p>
          <p>Cart (0)</p>
        </div>
        <div className="footer-left-column">
          <p>
            <strong>CUSTOMER CARE</strong>
          </p>
          <br />
          <NavLink className="navbar-link" to="/shipping_and_returns">Shipping & Returns</NavLink>
          <NavLink className="navbar-link" to="/faq">FAQ</NavLink>
          <NavLink className="navbar-link" to="/terms_and_conditions">Terms & Conditions</NavLink>
          <NavLink className="navbar-link" to="/warranty">Warranty</NavLink>
        </div>
        <div className="footer-left-column">
          <p>
            <strong>GET IN TOUCH</strong>
          </p>
          <br />
          <p>Shipping & Returns</p>
          <p>FAQ</p>
          <p>Terms & Conditions</p>
          <p>Warranty</p>
        </div>
      </div>
      <div className="footer-right-container">
        <button onClick={scrollToTop}>
          BACK TO TOP {String.fromCharCode(8593)}
        </button>
      </div>
    </div>
  );
}

export default Footer;
