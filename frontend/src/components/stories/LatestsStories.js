import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LatestStoriesCard from "./LatestStoriesCard";

function LatestsStories() {
  const stories = useSelector((state) => state.article.stories);
  const featured = useSelector((state) => state.article.featured);
  const mapped = featured
    ? [...stories]
        .filter(
          (story) => story._id !== featured._id && story.mostDiscussed !== true
        )
        .slice(0, 8)
        .map((story) => <LatestStoriesCard key={story._id} story={story} />)
    : null;
  console.log(stories);
  return (
    <div>
      <p className="section-title-home">LATEST STORIES</p>
      <div className="latest-stories">{mapped}</div>
    </div>
  );
}

export default LatestsStories;
