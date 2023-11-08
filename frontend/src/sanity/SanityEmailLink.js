import React from "react";

function SanityEmailLink({ value }) {
  console.log(value);
  return <a href={`mailto:${value.email}`}>{value.email}</a>;
}

export default SanityEmailLink;
