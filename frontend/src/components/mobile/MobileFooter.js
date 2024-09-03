import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import emailjs from "emailjs-com";
import { useDispatch, useSelector } from "react-redux";
import { mobileFilterActions } from "../../redux/mobile-filter-slice";
import { cartActions } from "../../redux/cart-slice.js";
import { getAnalytics, logEvent } from "firebase/analytics";

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
  const ref = useRef();
  const analytics = getAnalytics();
  const sendEmail = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(e.target.email.value)) {
      emailjs
        .sendForm(
          "dimepiece",
          "template_hfmoirr",
          e.target,
          "q5PPM5-H0N3HywCI-"
        )
        .then(
          (result) => {
            // Add success message or further actions here
            if (result.text === "OK") {
              logEvent(analytics, "newsletter_signup", {
                location: "Footer",
              });
              ref.current.classList.add("success");
              setTimeout(() => ref.current.classList.remove("success"), 1000);
              e.target.reset();
            }
          },
          (error) => {
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
          <NavLink
            onClick={() => dispatch(cartActions.hideSearch())}
            className="navbar-link"
            to="/newsletter"
          >
            Newsletter
          </NavLink>
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
      <div className="mobile-footer-newsletter-container">
        <p style={{ fontFamily: "swall-diatype-bold" }} className="mobile-bold">
          NEWSLETTER
        </p>
        <form
          className="mobile-footer-newsletter-input-container"
          onSubmit={sendEmail}
          ref={ref}
        >
          <input
            placeholder="Email Address"
            name="email"
            onFocus={() => dispatch(cartActions.hideSearch())}
          ></input>
          <button type="submit">Join</button>
        </form>
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
