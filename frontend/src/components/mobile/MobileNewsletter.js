import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import { getAnalytics, logEvent } from "firebase/analytics";

function MobileNewsletter() {
  const dispatch = useDispatch();
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

  const analytics = getAnalytics();
  useEffect(() => {
    logEvent(analytics, "page_view", {
      page_location: window.location.href,
      page_title: "Newsletter",
    });
  }, [window.location.href]);

  return (
    <motion.div
      className="mobile-newsletter-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "backInOut" }}
      key={"newsletterPage"}
    >
      <div className="mobile-newsletter">
        <p
          style={{ fontFamily: "swall-diatype-bold", fontSize: "1.4rem" }}
          className="section-title-home"
        >
          NEWSLETTER
        </p>
        <p>
          Sign up for the Dimepiece Newsletter to stay up to date on all our
          latest stories, products, and offerings.
        </p>
        <form
          className="newsletter-input-container"
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
    </motion.div>
  );
}

export default MobileNewsletter;
