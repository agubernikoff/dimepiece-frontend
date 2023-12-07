import imageUrlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import { client } from "./SanityClient";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useWindowSize } from "../helpers/useWindowSize";

// Barebones lazy-loaded image component
function SanityArticleImage({ value }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window
      .matchMedia("(max-width:700px)")
      .addEventListener("change", (e) => setIsMobile(e.matches));
    if (window.matchMedia("(max-width:700px)").matches) setIsMobile(true);
  }, []);

  const [heightOfSmallerImage, setHeightOfSmallerIamge] = useState();
  const ref = useRef();
  useEffect(() => {
    if (ref.current.children.length > 1) {
      setHeightOfSmallerIamge(
        [...ref.current.children]
          .map((c) => {
            const naturalWidth = c.children[0].src.split("-")[1].split("x")[0];
            const naturalHeight = c.children[0].src
              .split("-")[1]
              .split("x")[1]
              .split(".")[0];
            if (naturalWidth && naturalHeight)
              return (c.children[0].width / naturalWidth) * naturalHeight;
            else return c.children[0].clientHeight;
          })
          .sort((a, b) => a - b)[0]
      );
    }
  }, [isMobile, useWindowSize().height, useWindowSize().width, ref.current]);

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
            objectFit: "cover",
            height: heightOfSmallerImage > 0 ? heightOfSmallerImage : "auto",
            width: isMobile && value.modules.length > 1 ? "87vw" : "100%",
            backgroundImage: `url(${m.image.asset.url}?blur=75)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <p>{m.caption}</p>
      </div>
    );
  });

  return (
    <div className="article-images-container" ref={ref}>
      {mappedImages}
    </div>
  );
}

export default SanityArticleImage;
