import React, { useState, useEffect } from "react";
import { client } from "../../sanity/SanityClient";
import { PortableText } from "@portabletext/react";
import SanityEmailLink from "../../sanity/SanityEmailLink";

function Misc({ title }) {
  const [misc, setMisc] = useState();

  useEffect(() => {
    client
      .fetch(`*[_type == "miscellaneous" && title == "${title}"][0]`)
      .then((response) => setMisc(response));
  }, [title]);
  console.log(misc);
  return (
    <div className="misc-page">
      {misc ? (
        <>
          <h3 className="section-title-home">{misc.title}</h3>
          <PortableText
            value={misc.text}
            components={{ marks: { annotationLinkEmail: SanityEmailLink } }}
          />
        </>
      ) : null}
    </div>
  );
}

export default Misc;
