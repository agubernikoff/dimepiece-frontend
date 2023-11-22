import imageUrlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import { client } from "./SanityClient";

// Barebones lazy-loaded image component
function SanityArticleImage({ value }) {
  console.log(value.modules[0]);
  const builder = imageUrlBuilder(client);

  function urlFor(source) {
    return builder.image(source);
  }
  const isMobile = window.innerWidth <= 768;
  const mappedImages = value.modules.map((m) => {
    const { width, height } = getImageDimensions(m.image);
    return (
      <img
        key={m._key}
        src={m.image.asset.url}
        alt={value.alt || " "}
        loading="lazy"
        style={{
          // Avoid jumping around with aspect-ratio CSS property
          aspectRatio: width / height,
          width: "50%",
          margin: "auto",
        }}
      />
    );
  });
  const { width, height } = getImageDimensions(value.modules[0].image);
  return (
    <div className="article-images-container">
      {isMobile ? (
        <img
          src={value.modules[0].image.asset.url}
          alt={value.alt || " "}
          loading="lazy"
          style={{
            // Avoid jumping around with aspect-ratio CSS property
            aspectRatio: width / height,
            width: "50%",
            margin: "auto",
          }}
        />
      ) : (
        mappedImages
      )}
    </div>
  );
}

export default SanityArticleImage;
