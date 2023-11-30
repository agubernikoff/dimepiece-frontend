import React, { useState, useEffect } from "react";
import { client } from "../../sanity/SanityClient";
import LatestStoriesCard from "./LatestStoriesCard";

function MostDiscussed() {
  const [mostDiscussed, setMostDiscussed] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "articles" && mostDiscussed == true][0]{_id,title,category,previewDescription,datePublished,mostDiscussed,_createdAt,coverImage{asset->{url}}}`
      )
      .then((response) => setMostDiscussed(response));
  }, []);

  if (mostDiscussed.coverImage)
    return (
      <div className="most-discussed">
        <h3 className="section-title-home">MOST DISCUSSED</h3>
        <LatestStoriesCard story={mostDiscussed} />
      </div>
    );
}

export default MostDiscussed;
