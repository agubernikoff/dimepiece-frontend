import React, { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import LatestStoriesCard from "../../components/stories/LatestStoriesCard";
import { client } from "../../sanity/SanityClient";

function Stories() {
  const [stories, setStories] = useState([]);
  let filteredStories = [];
  const [category, setCategory] = useState("All");
  const categoryURLParam = useParams();
  const nav = useNavigate();
  useEffect(() => {
    client
      .fetch(
        `*[_type == "articles"]{_id,title,category,_createdAt,coverImage{asset->{url}}} | order(_createdAt desc)`
      )
      .then((response) => setStories(response));
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
    "Interviews",
  ];
  const mappedCategories = categories.map((c, i) => (
    <NavLink key={i} to={`/stories/${c.replaceAll(" ", "-")}`}>
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
  return (
    <div className="stories-page">
      <h3 className="section-title-home">LATEST STORIES</h3>
      {mappedCategories}
      {mappedStories}
    </div>
  );
}

export default Stories;
