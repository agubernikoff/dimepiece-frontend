import React from "react";
import FeaturedArticle from "./FeaturedArticle";
import WatchPreview from "../../components/products/WatchPreview";
import LatestsStories from "../../components/stories/LatestsStories";
import BrynnsPick from "../../components/products/BrynnsPick";
import MostDiscussed from "../../components/stories/MostDiscussed";
import BrynnsBasics from "../../components/products/BrynnsBasics";
import DialDimepiece from "../../components/stories/DialDimepiece";
import Newsletter from "./Newsletter";
import {motion,AnimatePresence} from "framer-motion";

function Homepage() {
  return (
    <motion.div className="homepage" initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1, ease: "backInOut" }} 
    key={"homepage"}>
      <FeaturedArticle />
      <LatestsStories />
      <WatchPreview />
      <BrynnsPick />
      <div className="three-column-homepage-container">
        <DialDimepiece />
        <MostDiscussed />
        <BrynnsBasics />
      </div>
      <Newsletter/>
    </motion.div>
  );
}

export default Homepage;
