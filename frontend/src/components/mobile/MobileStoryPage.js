import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../sanity/SanityClient";
import { PortableText } from "@portabletext/react";
import SanityArticleImage from "../../sanity/SanityArticleImage";
import SanityProductLink from "../../sanity/SanityProductLink";

function MobileStoryPage() {
  const [article, setArticle] = useState({
    title: "",
    datePublished: "",
    author: "",
    photographer: "",
    coverImage: { asset: { url: "" } },
    category: "",
  });

  const URLParam = useParams();

  useEffect(() => {
    client
      .fetch(
        `*[_type == "articles" && _id == "${URLParam.id}"][0]{...,coverImage{asset->{url}}}`
      )
      .then((response) => setArticle(response));
  }, [URLParam.title]);

  const dateObject = article.datePublished
    ? new Date(article.datePublished)
    : new Date(article._createdAt);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adds smooth scrolling animation
    });
  };
  const components = {
    marks: { annotationProduct: SanityProductLink },
    types: { "module.images": SanityArticleImage },
  };
  return (
    <div className="mobile-article">
      {article.title ? (
        <>
          <p className="mobile-article-title">{article.title}</p>
          <p>{formattedDate.toUpperCase()}</p>
          <div className="mobile-author-photog-container">
            <p>Text: {article.author}</p>
            <p>Photos: {article.photographer}</p>
          </div>
          <img
            loading="lazy"
            className="article-cover-img"
            src={article.coverImage.asset.url}
            alt={article.title}
          />
          <div className="article-sanity-content">
            <PortableText value={article.body} components={components} />
          </div>
          <p className="blue">{article.category.toUpperCase()}</p>
          <p>{formattedDate.toUpperCase()}</p>
          <div className="author-photog-container">
            <p>Text: {article.author}</p>
            <p>Photos: {article.photographer}</p>
          </div>
          <div className="article-button-container">
            <button>Next Story</button>
            <button onClick={scrollToTop}>Back To Top</button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default MobileStoryPage;
