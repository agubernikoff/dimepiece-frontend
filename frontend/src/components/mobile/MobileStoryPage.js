import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../sanity/SanityClient";
import { PortableText } from "@portabletext/react";
import SanityArticleImage from "../../sanity/SanityArticleImage";
import SanityProductLink from "../../sanity/SanityProductLink";
import { motion } from "framer-motion";
import { articleActions } from "../../redux/article-slice";
import { useDispatch } from "react-redux";
import SanityEmailLink from "../../sanity/SanityEmailLink";
import SanityExternalLink from "../../sanity/SanityExternalLink";

function MobileStoryPage() {
  const dispatch = useDispatch();
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
        `*[_type == "articles" && _id == "${URLParam.id}"][0]{...,body[]{...,_type == "module.images" => {...,modules[]{...,image{asset->{url}}}}},coverImage{asset->{url}}}`
      )
      .then((response) => setArticle(response));
    dispatch(articleActions.setIsArticleLoaded(true));
  }, [URLParam.title]);

  const dateObject = article.datePublished
    ? new Date(article.datePublished)
    : new Date(article._createdAt);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  const components = {
    marks: {
      annotationProduct: SanityProductLink,
      annotationLinkEmail: SanityEmailLink,
      annotationLinkExternal: SanityExternalLink,
    },
    types: { "module.images": SanityArticleImage },
  };
  return (
    <motion.div
      className="mobile-article"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "backInOut" }}
      key={"article"}
    >
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
        </>
      ) : null}
    </motion.div>
  );
}

export default MobileStoryPage;
