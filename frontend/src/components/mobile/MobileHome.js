import React from "react";
import MobileBrynnsPick from "./MobileBrynnsPick";
import MobileDialDimepiece from "./MobileDialDimepiece";
import MobileStories from "./MobileStories";
import MobileLatestWatches from "./MobileLatestWatches";
import { motion } from "framer-motion";

function MobileHome() {
  return (
    <motion.div
      className="mobile-homepage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "backInOut" }}
      key={"homepage"}
    >
      <MobileStories />
      <MobileLatestWatches />
      <MobileBrynnsPick />
      <MobileDialDimepiece />
      <div className="mobile-newsletter">
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

export default MobileHome;
