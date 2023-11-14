import React, { useState, useEffect } from "react";
import { client } from "../../sanity/SanityClient";
import MobileLatestStoriesCard from "./MobileLatestStoriesCard";

function MobileStories() {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type == "articles" && isFeatured != true && mostDiscussed != true]{_id,title,category,datePublished,coverImage{asset->{url}}} | order(datePublished desc)[0..3]`
      )
      .then((response) => setStories(response));
  }, []);
  const mapped = stories.map((story) => (
    <MobileLatestStoriesCard key={story._id} story={story} />
  ));
  return <div className="mobile-stories">{mapped}</div>;
}

export default MobileStories;
