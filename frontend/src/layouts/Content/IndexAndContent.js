import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { capitalizeWords } from "../../helpers/CapitalizeWords";
import { filterWatches } from "../../helpers/FilterWatches";
import LatestStoriesCard from "../../components/stories/LatestStoriesCard";
import WatchPreviewCard from "../../components/products/WatchPreviewCard";
import Watch from "./Watch";
import { scrollToTop } from "../../helpers/ScrollToTop";
import NoResults from "./NoResults";
import { useSelector } from "react-redux";

function IndexAndContent({ contentType }) {
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const URLParam = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterBy = searchParams.get("filter by");
  const caseSizeFilter = searchParams.get("case size");
  const stylesFilter = searchParams.get("styles");

  useEffect(() => {
    if (URLParam.category)
      setCategory(capitalizeWords(URLParam.category.replaceAll("-", " ")));
    else setCategory("");
  }, [URLParam]);

  const types = useSelector((state) => state.article.types);
  const stories = useSelector((state) => state.article.stories);

  let filteredStories = [];
  filteredStories = [...stories].filter((s) => {
    return s.category === category;
  });

  const mappedStories =
    category === "All"
      ? stories.map((s) => <LatestStoriesCard key={s._id} story={s} />)
      : filteredStories.map((s) => <LatestStoriesCard key={s._id} story={s} />);

  const brands = useSelector((state) => state.cart.brands);

  useEffect(() => {
    if (URLParam.brand && brands[0]) {
      if (brands.find((b) => b.title === URLParam.brand))
        setBrand(URLParam.brand);
      else setBrand(capitalizeWords(URLParam.brand.replaceAll("-", " ")));
    } else setBrand("");
  }, [URLParam, brands]);

  const watches = useSelector((state) => state.cart.watches);

  const mappedWatches = filterWatches(
    [...watches],
    brand,
    filterBy,
    caseSizeFilter,
    stylesFilter
  ).map((w) => <WatchPreviewCard key={w._id} watch={w} />);

  return (
    <motion.div
      className="content-index-container"
      // style={{ width: "82%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "backInOut" }}
      key={"stories-page"}
    >
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
            <p className="section-title-home">
              {category === "All" ? "LATEST STORIES" : category.toUpperCase()}
            </p>
            <p>
              {category === "All"
                ? "Explore all past and present Dimepiece content, from in-depth interviews and 101 information."
                : types[0]
                ? types.find((t) => t.title === category).descriptor
                : null}
            </p>
            <div className="stories-page-card-container">{mappedStories}</div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait" onExitComplete={scrollToTop}>
        {brand && !URLParam.id ? (
          <motion.div
            className="stories-page-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "backInOut" }}
            key={`${brand}${filterBy}${caseSizeFilter}${stylesFilter}`}
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
            <AnimatePresence mode="wait">
              <motion.div
                className="watches-page-card-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "backInOut" }}
                key={`${brand}${filterBy}${caseSizeFilter}${stylesFilter}`}
              >
                {mappedWatches[0] ? mappedWatches : <NoResults />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence mode="popLayout">
        {contentType === "shop" && URLParam.id && (
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
    </motion.div>
  );
}

export default IndexAndContent;
