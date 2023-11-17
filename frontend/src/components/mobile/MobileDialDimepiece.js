import React, { useState, useEffect } from "react";
import { client } from "../../sanity/SanityClient";
import MobileDialDimepieceCard from "./MobileDialDimepieceCard";

function MobileDialDimepiece() {
  const [DialDimepiece, setDialDimepiece] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type == "articles" && category == "Dial Dimepiece"][0..2]{_id,title,category,dialDimepieceSubheaders,mostDiscussed,_createdAt,coverImage{asset->{url}}}`
      )
      .then((response) => setDialDimepiece(response));
  }, []);
  const mapped = DialDimepiece.map((bb) => (
    <MobileDialDimepieceCard key={bb._id} story={bb} />
  ));
  return (
    <div className="mobile-dial-dimepiece">
      <h3 className="section-title-home">DIAL DIMEPIECE</h3>
      <div className="mobile-dial-dimepiece-cards-container">{mapped}</div>
    </div>
  );
}

export default MobileDialDimepiece;
