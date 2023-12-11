import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WatchPreviewCard from "../../components/products/WatchPreviewCard";
import { client } from "../../sanity/SanityClient";
import IndexSubSection from "./IndexSubSection";
import { capitalizeWords } from "../../helpers/CapitalizeWords";
import Watch from "./Watch";
import { motion, AnimatePresence } from "framer-motion";

function Watches() {
  const [watches, setWatches] = useState([]);
  let filteredWatches = [];
  const [brand, setBrand] = useState("All");
  const URLParam = useParams();
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

  const brandTitles = brands[0] ? brands.map((b) => b.title).sort() : null;

  useEffect(() => {
    if (URLParam.brand) {
      if (brands.find((b) => b.title === URLParam.brand))
        setBrand(URLParam.brand);
      else setBrand(capitalizeWords(URLParam.brand.replaceAll("-", " ")));
    }
  }, [URLParam]);

  filteredWatches = [...watches].filter((w) => {
    return w.brand === brand;
  });

  const mappedWatches =
    brand === "All"
      ? watches.map((w) => <WatchPreviewCard key={w._id} watch={w} />)
      : filteredWatches.map((w) => <WatchPreviewCard key={w._id} watch={w} />);

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
      {URLParam.id ? <Watch /> : null}
      <AnimatePresence mode="popLayout">
        {!URLParam.id && (
          <motion.div
            className="stories-page-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "backInOut" }}
            key={`${brand}${URLParam.id}`}
          >
            <p className="section-title-home">
              {brand === "All" ? "SHOP ALL" : brand.toUpperCase()}
            </p>
            <p>
              {brand === "All"
                ? "This limited collection has been lovingly curated by Dimepiece, in partnership with Foundwell. Each watch has been expertly selected, carefully vetted and authenticated by Foundwell, which was founded in 2009 and has worked with retailers such as Bergdorf Goodman, Harrods, and Mr. Porter."
                : brands[0]
                ? brands.find((b) => b.title === brand).descriptor
                : null}
            </p>

            <div className="watches-page-card-container">{mappedWatches}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Watches;
