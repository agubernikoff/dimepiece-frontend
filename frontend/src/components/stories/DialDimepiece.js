import React, { useState, useEffect } from "react";
import { client } from "../../sanity/SanityClient";
import DialDimepieceCard from "./DialDimepieceCard";

function DialDimepiece() {
  const [DialDimepiece, setDialDimepiece] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type == "articles" && category == "Interview" && mostDiscussed != true && isFeatured != true][0..3]{_id,title,category,mostDiscussed,previewDescription,_createdAt,coverImage{asset->{url}}}`
      )
      .then((response) => setDialDimepiece(response));
  }, []);
  const mapped = DialDimepiece.map((bb) => (
    <DialDimepieceCard key={bb._id} story={bb} />
  ));
  return (
    <div className="dial-dimepiece">
      <p className="section-title-home">INTERVIEWS</p>
      <div className="dial-dimepiece-cards-container">{mapped}</div>
    </div>
  );
}

export default DialDimepiece;
