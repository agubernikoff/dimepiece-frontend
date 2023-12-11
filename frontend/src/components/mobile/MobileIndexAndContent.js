import React, { useSate, useEffect, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { client } from "../../sanity/SanityClient";
import { capitalizeWords } from "../../helpers/CapitalizeWords";
import { filterWatches } from "../../helpers/FilterWatches";
import MobileLatestStoriesCard from "./MobileLatestStoriesCard";
import MobileLatestWatchesCard from "./MobileLatestWatchesCard";
import { AnimatePresence, motion } from "framer-motion";
import MobileIndexFilterDialogue from "./MobileIndexFilterDialogue";
import { useDispatch, useSelector } from "react-redux";
import { mobileFilterActions } from "../../redux/mobile-filter-slice";
import NoResults from "../../layouts/Content/NoResults";

function MobileIndexAndContent({ contentType }) {
  const isDialogueOpen = useSelector(
    (state) => state.mobileFilter.isDialogueOpen
  );
  const dispatch = useDispatch();
  const URLParam = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const content =
    contentType === "stories"
      ? useSelector((state) => state.article.stories)
      : useSelector((state) => state.cart.watches);
  const [filters, setFilters] = useState([]);
  const [primaryFilter, setPrimaryFilter] = useState("All");
  const categories = useSelector((state) => state.article.categories);
  const brandTitles = useSelector((state) => state.cart.brandTitles);

  useEffect(() => {
    if (contentType === "stories") {
      client
        .fetch(`*[_type == "categories"]{_id,descriptor,title}`)
        .then((response) => setFilters(response));
    } else if (contentType === "shop") {
      client
        .fetch(`*[_type == "brands"]{_id,descriptor,title}`)
        .then((response) => setFilters(response));
    }
  }, [contentType]);

  useEffect(() => {
    if (!isDialogueOpen) {
      if (URLParam.category)
        setPrimaryFilter(
          capitalizeWords(URLParam.category.replaceAll("-", " "))
        );
      else if (URLParam.brand && brandTitles[0]) {
        console.log(brandTitles, URLParam);
        if (brandTitles.find((b) => b === URLParam.brand))
          setPrimaryFilter(URLParam.brand);
        else
          setPrimaryFilter(
            capitalizeWords(URLParam.brand.replaceAll("-", " "))
          );
      }
    }
  }, [URLParam, isDialogueOpen]);

  useEffect(() => {
    const body = document.querySelector("body");

    if (isDialogueOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }

    return () => {
      body.style.overflow = "";
    };
  }, [isDialogueOpen]);

  const watches = useSelector((state) => state.cart.watches);

  const filterTitles =
    contentType === "stories"
      ? [...categories]
      : [...brandTitles].filter((title) =>
          watches.map((w) => w.brand).includes(title)
        );

  let filteredStories = [];
  filteredStories =
    contentType === "stories"
      ? [...content].filter((s) => {
          if (primaryFilter === "All") {
            return true;
          }
          return s.category === primaryFilter;
        })
      : null;

  const mappedStories =
    content[0] && contentType === "stories"
      ? filteredStories.map((s) => (
          <MobileLatestStoriesCard key={s._id} story={s} />
        ))
      : null;

  const filterBy = searchParams.get("filter by");
  const caseSizeFilter = searchParams.get("case size");
  const stylesFilter = searchParams.get("styles");
  const mappedWatches =
    content[0] && contentType === "shop"
      ? filterWatches(
          content,
          primaryFilter,
          filterBy,
          caseSizeFilter,
          stylesFilter
        ).map((w) => <MobileLatestWatchesCard key={w._id} watch={w} />)
      : null;

  const descriptor =
    primaryFilter === "All"
      ? contentType === "shop"
        ? "This limited collection has been lovingly curated by Dimepiece, in partnership with Foundwell. Each watch has been expertly selected, carefully vetted and authenticated by Foundwell, which was founded in 2009 and has worked with retailers such as Bergdorf Goodman, Harrods, and Mr. Porter."
        : "Explore all past and present Dimepiece content, from in-depth interviews and 101 information."
      : filters.find((b) => b.title === primaryFilter)
      ? filters.find((b) => b.title === primaryFilter).descriptor
      : null;

  const key2 = `${contentType}2`;

  function openDialogue() {
    dispatch(mobileFilterActions.setIsDialogueOpen(true));
  }
  function closeDialogue() {
    dispatch(mobileFilterActions.setIsDialogueOpen(false));
  }

  return (
    <motion.div
      className="mobile-index-and-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "backInOut" }}
      key={"mobile-index-and-content"}
    >
      {(contentType === "shop" && content[0] && content[0].brand) ||
      (contentType === "stories" && content[0] && !content[0].brand) ? (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={contentType}
            className="mobile-index"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "backInOut" }}
          >
            <p
              style={{ fontFamily: "swall-diatype-bold" }}
              className="stories-page-index-category-header"
            >
              {primaryFilter.toUpperCase()}
            </p>
            <p
              style={{ fontFamily: "swall-diatype-bold" }}
              className="stories-page-index-category-header"
              onClick={openDialogue}
            >
              FILTER BY
            </p>
            <AnimatePresence>
              {isDialogueOpen && (
                <MobileIndexFilterDialogue
                  titles={filterTitles}
                  closeDialogue={closeDialogue}
                  contentType={contentType}
                />
              )}
            </AnimatePresence>
          </motion.div>
          {!isDialogueOpen && (
            <motion.div
              key={key2}
              className="mobile-content-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "backInOut" }}
            >
              {mappedWatches.length > 0 ? (
                <div className="mobile-descriptor">
                  <p
                    style={{
                      fontFamily: "swall-diatype-bold",
                      fontSize: "1.4rem",
                      marginBottom: "5%",
                    }}
                    className="section-title-home"
                  >
                    {primaryFilter === "All"
                      ? contentType === "shop"
                        ? "SHOP ALL"
                        : "LATEST STORIES"
                      : primaryFilter.toUpperCase()}
                  </p>
                  <p>{descriptor}</p>
                </div>
              ) : (
                <NoResults />
              )}
              {content[0] ? (
                <div className="mobile-content-mapped">
                  {contentType === "shop" ? mappedWatches : mappedStories}
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      ) : null}
    </motion.div>
  );
}

export default MobileIndexAndContent;
