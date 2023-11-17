import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { client } from "../../sanity/SanityClient";
import { PortableText } from "@portabletext/react";
import SanityArticleImage from "../../sanity/SanityArticleImage";
import SanityProductLink from "../../sanity/SanityProductLink";

function Article() {
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

  const components = {
    marks: { annotationProduct: SanityProductLink },
    types: { "module.images": SanityArticleImage },
  };
  return (
    <motion.div
      className="article"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "backInOut" }}
      key={"article"}
    >
      {article.title ? (
        <>
          <p>{article.title}</p>
          <p>{formattedDate.toUpperCase()}</p>
          <div className="author-photog-container">
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
        </>
      ) : null}
    </motion.div>
  );
}

export default Article;
