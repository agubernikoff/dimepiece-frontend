import imageUrlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import { client } from "./SanityClient";
import { useEffect, useState } from "react";

// Barebones lazy-loaded image component
function SanityArticleImage({ value }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window
      .matchMedia("(max-width:700px)")
      .addEventListener("change", (e) => setIsMobile(e.matches));
    if (window.matchMedia("(max-width:700px)").matches) setIsMobile(true);
  }, []);

  const mappedImages = value.modules.map((m) => {
    const { width, height } = getImageDimensions(m.image);
    return (
      <div
        key={m._key}
        className={
          isMobile
            ? "sanity-mobile-article-image-container"
            : "sanity-article-image-container"
        }
      >
        <img
          src={m.image.asset.url}
          alt={value.alt || " "}
          loading="lazy"
          style={{
            // Avoid jumping around with aspect-ratio CSS property
            aspectRatio: width / height,
            width: isMobile ? "87vw" : "100%",
            margin: "auto",
          }}
        />
        <p>{m.caption}</p>
      </div>
    );
  });

  return <div className="article-images-container">{mappedImages}</div>;
}

export default SanityArticleImage;
