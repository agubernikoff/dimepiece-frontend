import imageUrlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import { client } from "./SanityClient";

// Barebones lazy-loaded image component
function SanityArticleImage({ value }) {
  const builder = imageUrlBuilder(client);

  function urlFor(source) {
    return builder.image(source);
  }
  const isMobile = window.innerWidth <= 768;
  const mappedImages = value.modules.map((m) => {
    const { width, height } = getImageDimensions(m.image);
    return (
      <div key={m._key} className="sanity-article-image-container">
        <img
          src={m.image.asset.url}
          alt={value.alt || " "}
          loading="lazy"
          style={{
            // Avoid jumping around with aspect-ratio CSS property
            aspectRatio: width / height,
            width: "100%",
            margin: "auto",
          }}
        />
        <p>{m.caption}</p>
      </div>
    );
  });
  const { width, height } = getImageDimensions(value.modules[0].image);
  return (
    <div className="article-images-container">
      {isMobile ? (
        <div className="sanity-mobile-article-image-container">
          <img
            src={value.modules[0].image.asset.url}
            alt={value.alt || " "}
            loading="lazy"
            style={{
              // Avoid jumping around with aspect-ratio CSS property
              aspectRatio: width / height,
              width: "100%",
              margin: "auto",
            }}
          />
          <p>{value.modules[0].caption ? value.modules[0].caption : null}</p>
        </div>
      ) : (
        mappedImages
      )}
    </div>
  );
}

export default SanityArticleImage;
