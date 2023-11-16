import React, { useSate, useEffect, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { client } from "../../sanity/SanityClient";
import { capitalizeWords } from "../../helpers/CapitalizeWords";
import { filterWatches } from "../../helpers/FilterWatches";
import MobileLatestStoriesCard from "./MobileLatestStoriesCard";
import MobileLatestWatchesCard from "./MobileLatestWatchesCard";

function MobileIndexAndContent({ contentType }) {
  const URLParam = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [content, setContent] = useState([]);
  const [filters, setFilters] = useState([]);
  const [primaryFilter, setPrimaryFilter] = useState("All");

  useEffect(() => {
    if (contentType === "stories") {
      client
        .fetch(
          `*[_type == "articles"]{_id,title,isFeatured,category,datePublished,coverImage{asset->{url}}} | order(datePublished desc)`
        )
        .then((response) => setContent(response));
      client
        .fetch(`*[_type == "categories"]{_id,descriptor,title}`)
        .then((response) => setFilters(response));
    } else if (contentType === "shop") {
      client
        .fetch(
          `*[_type == "product" && store.variants[0]._ref in *[_type == "productVariant" && store.inventory.isAvailable]._id]`
        )
        .then((response) => {
          setContent(response);
          client
            .fetch(`*[_type == "brands"]{_id,descriptor,title}`)
            .then((response) => setFilters(response));
        });
    }
  }, [contentType]);

  useEffect(() => {
    if (URLParam.category)
      setPrimaryFilter(capitalizeWords(URLParam.category.replaceAll("-", " ")));
    else if (URLParam.brand && filters[0]) {
      if (filters.find((b) => b.title === URLParam.brand))
        setPrimaryFilter(URLParam.brand);
      else
        setPrimaryFilter(capitalizeWords(URLParam.brand.replaceAll("-", " ")));
    }
  }, [URLParam, filters]);

  const activeStyle = ({ isActive }) =>
    isActive
      ? {
          textDecoration: "underline",
        }
      : null;
  const filterTitles = filters[0] ? filters.map((b) => b.title).sort() : [];
  const mappedTitles = ["All", ...filterTitles].map((t) => (
    <NavLink
      className="index-link"
      style={activeStyle}
      key={t}
      to={`/${contentType}/${t.replaceAll(" ", "-")}${
        searchParams ? `?${searchParams}` : null
      }`}
    >
      {t}
    </NavLink>
  ));

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
        : 'Explore all past and present Dimpiece content, from in-depth interviews and 101 information like "What is a bezel?" "What size is good for my wrist?" "What other brands should be on my radar besides Rolex?" This is your gateway to the captivating universe of timepieces.'
      : filters.find((b) => b.title === primaryFilter)
      ? filters.find((b) => b.title === primaryFilter).descriptor
      : null;

  // if (
  //   (contentType === "shop" && content[0] && content[0].brand) ||
  //   (contentType === "stories" && content[0] && !content[0].brand)
  // )
  return (
    <div className="mobile-index-and-content">
      {(contentType === "shop" && content[0] && content[0].brand) ||
      (contentType === "stories" && content[0] && !content[0].brand) ? (
        <>
          {" "}
          <div className="mobile-index">{mappedTitles}</div>
          <div className="mobile-content-container">
            <div className="mobile-descriptor">
              <h3 className="section-title-home">
                {primaryFilter === "All"
                  ? contentType === "shop"
                    ? "SHOP ALL"
                    : "LATEST STORIES"
                  : primaryFilter.toUpperCase()}
              </h3>
              <p>{descriptor}</p>
            </div>
            {content[0] ? (
              <div className="mobile-content-mapped">
                {contentType === "shop" ? mappedWatches : mappedStories}
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default MobileIndexAndContent;
