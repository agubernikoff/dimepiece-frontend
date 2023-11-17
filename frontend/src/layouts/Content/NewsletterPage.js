import React from "react";
import Newsletter from "./Newsletter";
import { motion } from "framer-motion";

function NewsletterPage() {
  return (
    <motion.div
      className="newsletter-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "backInOut" }}
      key={"newsletterPage"}
    >
      <Newsletter />
    </motion.div>
  );
}

export default NewsletterPage;
