import React from "react";
import MobileBrynnsPick from "./MobileBrynnsPick";
import MobileDialDimepiece from "./MobileDialDimepiece";
import MobileStories from "./MobileStories";
import MobileLatestWatches from "./MobileLatestWatches";
import { motion } from "framer-motion";
import MobileNewsletter from "./MobileNewsletter";
import LatestVideo from "../../layouts/Content/LatestVideo";

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
      <LatestVideo />
      <MobileBrynnsPick />
      <MobileDialDimepiece />
      <MobileNewsletter />
    </motion.div>
  );
}

export default MobileHome;
