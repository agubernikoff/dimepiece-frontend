import React, { useState, useEffect } from "react";

function LatestVideo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window
      .matchMedia("(max-width:700px)")
      .addEventListener("change", (e) => setIsMobile(e.matches));
    if (window.matchMedia("(max-width:700px)").matches) setIsMobile(true);
  }, []);
  return (
    <div className={isMobile ? "mobile-latest-video" : "latest-video"}>
      <p className="section-title-home">LATEST VIDEO</p>
      <div className="video-container">
        <iframe
          src="https://youtu.be/embed/jvGz5X6TtHo?si=VUVq9u97wicnJSzJ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default LatestVideo;
