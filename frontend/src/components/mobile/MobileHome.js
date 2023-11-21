import React, { useEffect } from "react";
import MobileBrynnsPick from "./MobileBrynnsPick";
import MobileDialDimepiece from "./MobileDialDimepiece";
import MobileStories from "./MobileStories";
import MobileLatestWatches from "./MobileLatestWatches";
import { motion } from "framer-motion";
import MobileNewsletter from "./MobileNewsletter";

function MobileHome() {
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll position
      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;

      // Calculate the total height of the page
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate how far the user is from the bottom of the page
      const scrollFromBottom = documentHeight - scrollY - windowHeight;

      // Set a threshold to determine when to change the background color (e.g., 50 pixels from the bottom)
      const threshold = 50;

      // Check if user is within the threshold from the bottom
      if (scrollFromBottom <= threshold) {
        // Apply a different background color when scrolling past the end of the page
        document.body.style.backgroundColor = "#d7ceff"; // Replace with your desired color
      } else {
        // Revert to the default background color when not at the end of the page
        document.body.style.backgroundColor = ""; // Reset to default color
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
      <MobileNewsletter />
    </motion.div>
  );
}

export default MobileHome;
