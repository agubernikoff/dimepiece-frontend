import React from "react";
import FeaturedArticle from "./FeaturedArticle";
import WatchPreview from "../../components/products/WatchPreview";
import LatestsStories from "../../components/stories/LatestsStories";
import BrynnsPick from "../../components/products/BrynnsPick";

function Homepage() {
  return (
    <div className="homepage">
      <FeaturedArticle />
      <LatestsStories />
      <WatchPreview />
      <BrynnsPick />
    </div>
  );
}

export default Homepage;
