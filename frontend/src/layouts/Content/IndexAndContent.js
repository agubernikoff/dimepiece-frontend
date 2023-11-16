import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { client } from "../../sanity/SanityClient";
import { motion, AnimatePresence } from "framer-motion";
import { capitalizeWords } from "../../helpers/CapitalizeWords";
import { filterWatches } from "../../helpers/FilterWatches";
import IndexStories from "./IndexStories";
import IndexShop from "./IndexShop";
import LatestStoriesCard from "../../components/stories/LatestStoriesCard";
import WatchPreviewCard from "../../components/products/WatchPreviewCard";
import Watch from "./Watch";
import { scrollToTop } from "../../helpers/ScrollToTop";

function IndexAndContent() {
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const URLParam = useParams();

  useEffect(() => {
    if (URLParam.category)
      setCategory(capitalizeWords(URLParam.category.replaceAll("-", " ")));
    else setCategory("");
  }, [URLParam]);

  const [types, setTypes] = useState([]);
  const [stories, setStories] = useState([]);
  const [brynnsPick, setBrynnsPick] = useState();

  useEffect(() => {
    client
      .fetch(`*[_type == "product" && isFeatured == true][0]`)
      .then((response) => setBrynnsPick(response));
  }, []);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "articles"]{_id,title,isFeatured,category,datePublished,coverImage{asset->{url}}} | order(datePublished desc)`
      )
      .then((response) => setStories(response));
  }, []);

  useEffect(() => {
    client
      .fetch(`*[_type == "categories"]{_id,descriptor,title}`)
      .then((response) => setTypes(response));
  }, []);

  const categories = types[0] ? types.map((t) => t.title) : null;

  let filteredStories = [];
  filteredStories = [...stories].filter((s) => {
    return s.category === category;
  });

  const mappedStories =
    category === "All"
      ? stories.map((s) => <LatestStoriesCard key={s._id} story={s} />)
      : filteredStories.map((s) => <LatestStoriesCard key={s._id} story={s} />);

  const [brands, setBrands] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "brands"]{_id,descriptor,title}`)
      .then((response) => setBrands(response));
  }, []);

  const brandTitles = brands[0] ? brands.map((b) => b.title).sort() : null;

  useEffect(() => {
    if (URLParam.brand && brands[0]) {
      if (brands.find((b) => b.title === URLParam.brand))
        setBrand(URLParam.brand);
      else setBrand(capitalizeWords(URLParam.brand.replaceAll("-", " ")));
    } else setBrand("");
  }, [URLParam, brands]);

  const [watches, setWatches] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterBy = searchParams.get("filter by");
  const caseSizeFilter = searchParams.get("case size");
  const stylesFilter = searchParams.get("styles");
  useEffect(() => {
    client
      .fetch(
        `*[_type == "product" && store.variants[0]._ref in *[_type == "productVariant" && store.inventory.isAvailable]._id]`
      )
      .then((response) => {
        setWatches(response);
      });
  }, []);

  const mappedWatches = filterWatches(
    watches,
    brand,
    filterBy,
    caseSizeFilter,
    stylesFilter
  ).map((w) => <WatchPreviewCard key={w._id} watch={w} />);

  // useEffect(() => {
  //   setTimeout(() => scrollToTop(), 500);
  // }, [URLParam, URLSearchParams]);
  return (
    <div className="stories-page">
      <AnimatePresence mode="popLayout">
        {category && (
          <motion.div
            className="stories-page-index"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "backInOut" }}
            key={"category"}
          >
            <IndexStories
              categories={categories}
              stories={stories}
              brynnsPick={brynnsPick}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="popLayout">
        {brand && (
          <motion.div
            className="stories-page-index"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            key={"brand"}
          >
            <IndexShop brandTitles={brandTitles} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="popLayout">
        {category && (
          <motion.div
            className="stories-page-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "backInOut" }}
            key={category}
          >
            <h3 className="section-title-home">
              {category === "All" ? "LATEST STORIES" : category.toUpperCase()}
            </h3>
            <p>
              {category === "All"
                ? 'Explore all past and present Dimpiece content, from in-depth interviews and 101 information like "What is a bezel?" "What size is good for my wrist?" "What other brands should be on my radar besides Rolex?" This is your gateway to the captivating universe of timepieces.'
                : types.find((t) => t.title === category).descriptor}
            </p>
            <div className="stories-page-card-container">{mappedStories}</div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="popLayout">
        {brand && !URLParam.id ? (
          <motion.div
            className="stories-page-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "backInOut" }}
            key={`${brand}${filterBy}${caseSizeFilter}${stylesFilter}`}
          >
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
            <AnimatePresence mode="popLayout">
              <motion.div
                className="watches-page-card-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "backInOut" }}
                key={`${brand}${filterBy}${caseSizeFilter}${stylesFilter}`}
              >
                {mappedWatches}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence mode="popLayout">
        {brand && URLParam.id && (
          <motion.div
            className="stories-page-content watch-modifier"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "backInOut" }}
            key={`${brand}${URLParam.id}`}
          >
            <Watch />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default IndexAndContent;
