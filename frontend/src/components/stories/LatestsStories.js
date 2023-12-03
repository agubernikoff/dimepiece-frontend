import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LatestStoriesCard from "./LatestStoriesCard";

function LatestsStories() {
  const stories = useSelector((state) => state.article.stories);
  const featuredId = useSelector((state) => state.article.featured._id);
  const mapped = [...stories]
    .filter((story) => story._id !== featuredId)
    .slice(0, 8)
    .map((story) => <LatestStoriesCard key={story._id} story={story} />);
  return (
    <div>
      <h3 className="section-title-home">LATEST STORIES</h3>
      <div className="latest-stories">{mapped}</div>
    </div>
  );
}

export default LatestsStories;
