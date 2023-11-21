import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import emailjs from "emailjs-com";
import { shopifyClient } from "../../shopify/ShopifyClient.js";
import { useDispatch, useSelector } from "react-redux";
import { mobileFilterActions } from "../../redux/mobile-filter-slice";

function Footer() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
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
  const ref = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(e.target.email.value)) {
      emailjs
        .sendForm(
          "service_571yygo",
          "template_84i2kjw",
          e.target,
          "WPUweZAoXmamBd_kZ"
        )
        .then(
          (result) => {
            // Add success message or further actions here
            if (result.text === "OK") {
              console.log(result.text);
              ref.current.classList.add("success");
              setTimeout(() => ref.current.classList.remove("success"), 1000);
              e.target.reset();
            }
          },
          (error) => {
            console.log(error.text);
            // Add error handling here
            ref.current.classList.add("failure");
            setTimeout(() => ref.current.classList.remove("failure"), 1500);
          }
        );
    } else {
      ref.current.classList.add("failure");
      setTimeout(() => ref.current.classList.remove("failure"), 1500);
    }
  };

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

  return (
    <div className="mobile-footer">
      <div className="mobile-footer-top-container">
        <div className="mobile-footer-column">
          <p className="mobile-bold">
            <strong>LINKS</strong>
          </p>
          <NavLink className="navbar-link" to="/stories">
            Stories
          </NavLink>
          <NavLink
            className="navbar-link"
            to="/shop/All?filter+by=Latest+Arrivals"
            onClick={() =>
              dispatch(mobileFilterActions.setPrimaryFilter("All"))
            }
          >
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
          <a className="navbar-link">Site Credit</a>
        </div>
        <div className="mobile-footer-column">
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
      </div>
      <div className="mobile-footer-newsletter-container">
        <h3 className="mobile-bold">NEWSLETTER</h3>
        <form
          className="mobile-footer-newsletter-input-container"
          onSubmit={sendEmail}
          ref={ref}
        >
          <input placeholder="Email Address" name="email"></input>
          <button type="submit">Join</button>
        </form>
      </div>
      <div className="mobile-footer-bottom-container">
        <div className="mobile-footer-column">
          <p>© DIMEPIECE LLC 2023,</p>
          <p>All Rights Reserved.</p>
        </div>
        <div className="mobile-footer-column">
          <p>LA: {times.LosAngeles}</p>
          <p>NY: {times.NewYork}</p>
          <p>LON: {times.London} </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
