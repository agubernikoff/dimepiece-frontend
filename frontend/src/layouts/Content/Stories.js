import React, { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import LatestStoriesCard from "../../components/stories/LatestStoriesCard";
import { client } from "../../sanity/SanityClient";

function Stories() {
  const [stories, setStories] = useState([]);
  const [brynnsPick, setBrynnsPick] = useState();
  let filteredStories = [];
  const [category, setCategory] = useState("All");
  const categoryURLParam = useParams();
  const [types, setTypes] = useState();
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

  const categories = [
    "All",
    "Dial Dimepiece",
    "Digital Dimes",
    "Dream Watch",
    "First Dimers",
    "Brynn's Tips",
    "In The Field",
    "Interview",
  ];
  const activeStyle = ({ isActive }) =>
    isActive
      ? {
          textDecoration: "underline",
        }
      : null;
  const mappedCategories = categories.map((c, i) => (
    <NavLink
      className="index-link"
      style={activeStyle}
      key={i}
      to={`/stories/${c.replaceAll(" ", "-")}`}
    >
      {c}
    </NavLink>
  ));
  useEffect(() => {
    if (categoryURLParam.category)
      setCategory(
        capitalizeWords(categoryURLParam.category.replaceAll("-", " "))
      );
  }, [categoryURLParam]);

  filteredStories = [...stories].filter((s) => {
    console.log(s.category === category);
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

  if (brynnsPick) {
    return (
      <div className="stories-page">
        <div className="stories-page-index">
          <div className="stories-page-index-list">
            <p className="stories-page-index-category-header">
              <strong>CATEGORIES</strong>
            </p>
            {mappedCategories}
          </div>
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
            <p className="stories-page-index-brynns-pick">
              {brynnsPick.featuredHeadline}
            </p>
          </div>
        </div>
        <div className="stories-page-content">
          <h3 className="section-title-home">
            {category === "All" ? "LATEST STORIES" : category.toUpperCase()}
          </h3>
          <p>
            {category === "All"
              ? 'Explore all past and present Dimpiece content, from in-depth interviews and 101 information like "What is a bezel?" "What size is good for my wrist?" "What other brands should be on my radar besides Rolex?" This is your gateway to the captivating universe of timepieces.'
              : types.find((t) => t.title === category).descriptor}
          </p>
          <div className="stories-page-card-container">{mappedStories}</div>
        </div>
      </div>
    );
  }
}

export default Stories;
