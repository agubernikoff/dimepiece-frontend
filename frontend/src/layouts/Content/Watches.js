import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WatchPreviewCard from "../../components/products/WatchPreviewCard";
import { client } from "../../sanity/SanityClient";
import IndexSubSection from "./IndexSubSection";

function Watches() {
  const [watches, setWatches] = useState([]);
  let filteredWatches = [];
  const [brand, setBrand] = useState("All");
  const brandURLParam = useParams();
  const [brands, setBrands] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    client
      .fetch(
        `*[_type == "product" && store.variants[0]._ref in *[_type == "productVariant" && store.inventory.isAvailable]._id]`
      )
      .then((response) => setWatches(response));
  }, []);

  useEffect(() => {
    client
      .fetch(`*[_type == "brands"]{_id,descriptor,title}`)
      .then((response) => setBrands(response));
  }, []);

  function capitalizeWords(inputString) {
    // Split the input string into an array of words
    const words = inputString.split(" ");

    // Map over the words array and capitalize the first letter of each word
    const capitalizedWords = words.map((word) => {
      if (word.length === 0) {
        return ""; // Handle empty words gracefully
      }
      const firstLetter = word[0].toUpperCase();
      const restOfWord = word.slice(1).toLowerCase();
      return firstLetter + restOfWord;
    });

    // Join the capitalized words back into a single string
    const resultString = capitalizedWords.join(" ");

    return resultString;
  }

  const brandTitles = brands[0] ? brands.map((b) => b.title) : null;

  useEffect(() => {
    if (brandURLParam.brand) {
      if (brands.find((b) => b.title === brandURLParam.brand))
        setBrand(brandURLParam.brand);
      else setBrand(capitalizeWords(brandURLParam.brand.replaceAll("-", " ")));
    }
  }, [brandURLParam]);

  filteredWatches = [...watches].filter((w) => {
    return w.brand === brand;
  });

  const mappedWatches =
    brand === "All"
      ? watches.map((w) => <WatchPreviewCard key={w._id} watch={w} />)
      : filteredWatches.map((w) => <WatchPreviewCard key={w._id} watch={w} />);
  console.log(watches);
  return (
    <div className="stories-page">
      <div className="stories-page-index">
        <IndexSubSection
          title={"brands"}
          options={brandTitles}
          includeAll={true}
          urlPrefix={"shop"}
        />
        <IndexSubSection
          title={"filter by"}
          options={[
            "Latest Arrivals",
            "Brynn's Basics",
            "Price: Low to High",
            "Price: High to Low",
          ]}
          includeAll={false}
          urlPrefix={"shop"}
        />
        <IndexSubSection
          title={"case size"}
          options={["Small", "Medium", "Large"]}
          includeAll={false}
          urlPrefix={"shop"}
        />
        <IndexSubSection
          title={"styles"}
          options={[
            "Gold",
            "Steel",
            "Gem-Set",
            "Leather Strap",
            "Colored Dial",
          ]}
          includeAll={false}
          urlPrefix={"shop"}
        />
      </div>
      <div className="stories-page-content">
        <h3 className="section-title-home">
          {brand === "All" ? "SHOP ALL" : brand.toUpperCase()}
        </h3>
        <p>
          {brand === "All"
            ? "This limited collection has been lovingly curated by Dimepiece, in partnership with Foundwell. Each watch has been expertly selected, carefully vetted and authenticated by Foundwell, which was founded in 2009 and has worked with retailers such as Bergdorf Goodman, Harrods, and Mr. Porter."
            : brands[0]
            ? brands.find((b) => b.title === brand).descriptor
            : null}
        </p>
        <div className="stories-page-card-container">{mappedWatches}</div>
      </div>
    </div>
  );
}

export default Watches;
