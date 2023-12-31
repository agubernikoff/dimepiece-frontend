import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import IndexShop from "../../layouts/Content/IndexShop";
import IndexStories from "../../layouts/Content/IndexStories";
import { motion } from "framer-motion";

function MobileIndexFilterDialogue({ closeDialogue, titles, contentType }) {
  const nav = useNavigate();
  const primaryFilter = useSelector(
    (state) => state.mobileFilter.primaryFilter
  );
  const urlPrefix = useSelector((state) => state.mobileFilter.urlPrefix);
  const [searchParams, setSearchParams] = useSearchParams();
  const existingPrimaryFilter = useRef();
  useEffect(() => {
    existingPrimaryFilter.current = primaryFilter;
    return () => (existingPrimaryFilter.current = null);
  }, []);
  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.25, ease: "linear" }}
      key="cart"
      className="mobile-index-filter-dialogue"
    >
      <div className="mobile-index">
        <div className="mobile-index-filter-dialogue-left">
          {contentType === "shop" ? (
            <IndexShop brandTitles={titles} isMobile={true} />
          ) : (
            <IndexStories categories={titles} stories={[]} isMobile={true} />
          )}
        </div>
        <p
          style={{ fontFamily: "swall-diatype-bold" }}
          className="stories-page-index-category-header"
          onClick={() => {
            closeDialogue();
            if (primaryFilter)
              nav(
                `/${urlPrefix}/${primaryFilter}${
                  searchParams ? `?${searchParams}` : null
                }`
              );
          }}
        >
          CLOSE
        </p>
      </div>
    </motion.div>
  );
}

export default MobileIndexFilterDialogue;
