import React, { useState, useEffect } from "react";
import { client } from "../../sanity/SanityClient";
import MobileLatestStoriesCard from "./MobileLatestStoriesCard";
import MobileDialDimepieceCard from "./MobileDialDimepieceCard";

function MobileDialDimepiece() {
  const [DialDimepiece, setDialDimepiece] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type == "articles" && category == "Interview" && mostDiscussed != true && isFeatured != true][0..3]{_id,title,category,mostDiscussed,mostDiscussedDescription,_createdAt,coverImage{asset->{url}}}`
      )
      .then((response) => setDialDimepiece(response));
  }, []);
  const mapped = DialDimepiece.map((bb) => (
    <MobileLatestStoriesCard key={bb._id} story={bb} />
  ));
  return (
    <div className="mobile-dial-dimepiece">
      <h3 className="section-title-home">INTERVIEWS</h3>
      <div className="mobile-dial-dimepiece-cards-container">{mapped}</div>
    </div>
  );
}

export default MobileDialDimepiece;
