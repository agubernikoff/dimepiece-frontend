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
          .map((c) =>
            c.children[0].naturalWidth > 0
              ? (c.children[0].width / c.children[0].naturalWidth) *
                c.children[0].naturalHeight
              : c.children[0].offsetHeight
          )
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
