import React from "react";

function LatestVideo() {
  return (
    <div className="latest-video">
      <p className="section-title-home">LATEST VIDEO</p>
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/x-QTGuocDvs?si=cxHrmSrVoDvBsoZR"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default LatestVideo;
