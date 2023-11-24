import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import IndexShop from "./IndexShop";
import IndexStories from "./IndexStories";

function Index({ displayIndex }) {
  const categories = useSelector((state) => state.article.categories);
  const stories = useSelector((state) => state.article.stories);
  const brynnsPick = useSelector((state) => state.article.brynnsPick);
  const brandTitles = useSelector((state) => state.cart.brandTitles);
  const watches = useSelector((state) => state.cart.watches);

  const filteredBrandTitles = [...brandTitles].filter((title) =>
    watches.map((w) => w.brand).includes(title)
  );
  console.log(categories);
  return (
    <>
      {displayIndex && (
        <motion.div
          style={{ width: "9%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "backInOut" }}
          key={"i"}
        >
          {displayIndex === "stories" && (
            <motion.div
              className="stories-page-index"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "backInOut" }}
              key={"category"}
            >
              <IndexStories
                categories={[...categories]}
                stories={stories}
                brynnsPick={brynnsPick}
              />
            </motion.div>
          )}
          {/* </AnimatePresence>
      <AnimatePresence mode="popLayout"> */}
          {displayIndex === "shop" && (
            <motion.div
              className="stories-page-index"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              key={"brand"}
            >
              <IndexShop brandTitles={filteredBrandTitles} />
            </motion.div>
          )}
        </motion.div>
      )}
      {/* </AnimatePresence> */}
    </>
  );
}

export default Index;
