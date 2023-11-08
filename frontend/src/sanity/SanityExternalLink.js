import React from "react";

function SanityExternalLink({ value, children }) {
  console.log(value, children);
  return <a href={value.url}>{children[0]}</a>;
}

export default SanityExternalLink;
