import React, { useEffect } from "react";
import Newsletter from "./Newsletter";
import { motion } from "framer-motion";
import { getAnalytics, logEvent } from "firebase/analytics";

function NewsletterPage() {
  const analytics = getAnalytics();
  useEffect(() => {
    logEvent(analytics, "page_view", {
      page_location: window.location.href,
      page_title: "Newsletter",
    });
  }, [window.location.href]);
  return (
    <motion.div
      className="newsletter-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "backInOut" }}
      key={"newsletterPage"}
    >
      <Newsletter />
    </motion.div>
  );
}

export default NewsletterPage;
