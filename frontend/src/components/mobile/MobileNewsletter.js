import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { getAnalytics, logEvent } from "firebase/analytics";

function MobileNewsletter() {
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
        {/* <p>
          Sign up for the Dimepiece Newsletter to stay up to date on all our
          latest stories, products, and offerings.
        </p> */}
        <iframe
          src="https://dimepiece.substack.com/embed"
          width="100%"
          height="320"
          style={{ border: "1px solid #EEE", background: "white" }}
          frameBorder="0"
          scrolling="no"
          title="Newsletter signup"
        />
      </div>
    </motion.div>
  );
}

export default MobileNewsletter;
