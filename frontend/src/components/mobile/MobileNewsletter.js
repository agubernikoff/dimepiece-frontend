import React from "react";
import { motion } from "framer-motion";

function MobileNewsletter() {
  return (
    <motion.div
      className="mobile-newsletter-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "backInOut" }}
      key={"newsletterPage"}
    >
      <div>
        <h3 className="section-title-home">NEWSLETTER</h3>
        <p>
          Sign up for the Dimepiece Newsletter to stay up to date on all our
          latest stories, products, and offerings.
        </p>
        <div className="newsletter-input-container">
          <input placeholder="Email Address" type="email"></input>
          <button>Join</button>
        </div>
      </div>
    </motion.div>
  );
}

export default MobileNewsletter;
