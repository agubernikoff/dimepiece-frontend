import React from "react";
import FeaturedArticle from "./FeaturedArticle";
import WatchPreview from "../../components/products/WatchPreview";
import LatestsStories from "../../components/stories/LatestsStories";
import BrynnsPick from "../../components/products/BrynnsPick";
import MostDiscussed from "../../components/stories/MostDiscussed";
import BrynnsBasics from "../../components/products/BrynnsBasics";
import DialDimepiece from "../../components/stories/DialDimepiece";

function Homepage() {
  return (
    <div className="homepage">
      <FeaturedArticle />
      <LatestsStories />
      <WatchPreview />
      <BrynnsPick />
      <div className="three-column-homepage-container">
        <DialDimepiece />
        <MostDiscussed />
        <BrynnsBasics />
      </div>
    </div>
  );
}

export default Homepage;
