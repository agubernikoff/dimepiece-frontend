import React, { useState, useEffect, useRef } from "react";
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
import { getAnalytics, logEvent } from "firebase/analytics";

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
  const analytics = getAnalytics();

  useEffect(() => {
    client
      .fetch(
        `*[_type == "articles" && _id == "${URLParam.id}"][0]{...,body[]{...,_type == "module.images" => {...,modules[]{...,image{asset->{url}}}}},coverImage{asset->{url}}}`
      )
      .then((response) => {
        setArticle(response);
        logEvent(analytics, "page_view", {
          page_location: window.location.href,
          page_title: response.title,
        });
      });
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
  const articleContentContainer = useRef();
  useEffect(() => {
    if (article.title)
      [...articleContentContainer.current.children].forEach((child) => {
        if (child.firstChild.localName == "br")
          child.firstChild.style.display = "none";
      });
  }, [articleContentContainer, article]);

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
          <p style={{ fontFamily: "swall-diatype" }}>
            {formattedDate.toUpperCase()}
          </p>
          <div
            className="author-photog-container"
            style={{ fontFamily: "swall-diatype" }}
          >
            <p>
              Text:{" "}
              {article.authorLink ? (
                <a
                  href={article.authorLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {article.author}
                </a>
              ) : (
                <>{article.author}</>
              )}
            </p>
            {article.photographer ? (
              <p>
                Photos:{" "}
                {article.photographerLink ? (
                  <a
                    href={article.photographerLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {article.photographer}
                  </a>
                ) : (
                  article.photographer
                )}
              </p>
            ) : null}
          </div>
          <img
            loading="lazy"
            className="article-cover-img"
            src={`${article.coverImage.asset.url}?auto=format&q=60`}
            alt={article.title}
          />
          <div className="article-sanity-content" ref={articleContentContainer}>
            <PortableText value={article.body} components={components} />
          </div>
          <p className="blue">{article.category.toUpperCase()}</p>
          <p>{formattedDate.toUpperCase()}</p>
          <div className="author-photog-container">
            <p>
              Text:{" "}
              {article.authorLink ? (
                <a
                  href={article.authorLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {article.author}
                </a>
              ) : (
                <>{article.author}</>
              )}
            </p>
            {article.photographer ? (
              <p>
                Photos:{" "}
                {article.photographerLink ? (
                  <a
                    href={article.photographerLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {article.photographer}
                  </a>
                ) : (
                  article.photographer
                )}
              </p>
            ) : null}
          </div>
        </>
      ) : null}
    </motion.div>
  );
}

export default MobileStoryPage;
