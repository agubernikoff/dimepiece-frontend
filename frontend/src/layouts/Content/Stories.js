import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LatestStoriesCard from "../../components/stories/LatestStoriesCard";
import { client } from "../../sanity/SanityClient";
import IndexSubSection from "./IndexSubSection";
import { capitalizeWords } from "../../helpers/CapitalizeWords";
import { motion, AnimatePresence } from "framer-motion";

function Stories() {
  const [stories, setStories] = useState([]);
  const [brynnsPick, setBrynnsPick] = useState();
  let filteredStories = [];
  const [category, setCategory] = useState("All");
  const categoryURLParam = useParams();
  const [types, setTypes] = useState([]);
  const nav = useNavigate();
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

  useEffect(() => {
    if (categoryURLParam.category)
      setCategory(
        capitalizeWords(categoryURLParam.category.replaceAll("-", " "))
      );
  }, [categoryURLParam]);

  filteredStories = [...stories].filter((s) => {
    return s.category === category;
  });

  const mappedStories =
    category === "All"
      ? stories.map((s) => <LatestStoriesCard key={s._id} story={s} />)
      : filteredStories.map((s) => <LatestStoriesCard key={s._id} story={s} />);

  const mappedFeaturedTitles = [...stories]
    .filter((s) => s.isFeatured)
    .map((fs, i) => (
      <li
        key={i}
        onClick={() =>
          nav(`/stories/${fs.category.replaceAll(" ", "-")}/${fs._id}`)
        }
      >
        {fs.title}
      </li>
    ));

  return (
    <div className="stories-page">
      <div className="stories-page-index">
        <IndexSubSection
          title={"categories"}
          options={categories}
          includeAll={true}
          urlPrefix={"stories"}
        />
        <div className="stories-page-index-list">
          <p className="stories-page-index-category-header">
            <strong>FEATURED</strong>
          </p>
          <ol>{mappedFeaturedTitles}</ol>
        </div>
        <div className="stories-page-index-list">
          <p className="stories-page-index-category-header">
            <strong>{"BRYNN'S PICK"}</strong>
          </p>
          {brynnsPick ? (
            <p
              className="stories-page-index-brynns-pick"
              onClick={() =>
                nav(
                  `/shop/${brynnsPick.brand.replaceAll(" ", "-")}/${
                    brynnsPick._id
                  }`
                )
              }
            >
              {brynnsPick.featuredHeadline}
            </p>
          ) : null}
        </div>
      </div>
      <AnimatePresence mode="popLayout">
        <motion.div
          className="stories-page-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "backInOut" }}
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
      </AnimatePresence>
    </div>
  );
}

export default Stories;
