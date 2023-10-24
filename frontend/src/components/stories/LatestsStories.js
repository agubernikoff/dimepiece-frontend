import React, { useState, useEffect } from "react";
import { client } from "../../sanity/SanityClient";
import LatestStoriesCard from "./LatestStoriesCard";

function LatestsStories() {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type == "articles" && isFeatured != true && mostDiscussed != true]{_id,title,category,datePublished,coverImage{asset->{url}}} | order(datePublished desc)[0..7]`
      )
      .then((response) => setStories(response));
  }, []);
  const mapped = stories.map((story) => (
    <LatestStoriesCard key={story._id} story={story} />
  ));
  return (
    <div>
      <h3 className="section-title-home">LATEST STORIES</h3>
      <div className="latest-stories">{mapped}</div>
    </div>
  );
}

export default LatestsStories;
