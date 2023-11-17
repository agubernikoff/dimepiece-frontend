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

  return (
    <motion.div
      className="misc-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "backInOut" }}
      key={title}
    >
      {misc ? (
        <>
          <h3 className="section-title-home">{misc.title}</h3>
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
