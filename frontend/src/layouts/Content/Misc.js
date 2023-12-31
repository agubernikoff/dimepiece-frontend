import React, { useState, useEffect } from "react";
import { client } from "../../sanity/SanityClient";
import { PortableText } from "@portabletext/react";
import SanityEmailLink from "../../sanity/SanityEmailLink";
import { motion } from "framer-motion";

function Misc({ title }) {
  const [misc, setMisc] = useState();

  useEffect(() => {
    client
      .fetch(`*[_type == "miscellaneous" && title == "${title}"][0]`)
      .then((response) => setMisc(response));
  }, [title]);

  const isMobile = window.innerWidth <= 768;

  return (
    <motion.div
      className={isMobile ? "mobile-misc-page" : "misc-page"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "backInOut" }}
      key={title}
    >
      {misc ? (
        <>
          <p
            style={{ fontFamily: "swall-diatype-bold" }}
            className="section-title-home"
          >
            {misc.title}
          </p>
          <PortableText
            value={misc.text}
            components={{ marks: { annotationLinkEmail: SanityEmailLink } }}
          />
        </>
      ) : null}
    </motion.div>
  );
}

export default Misc;
