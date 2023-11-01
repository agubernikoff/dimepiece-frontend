import React from "react";
import { NavLink } from "react-router-dom";

function IndexSubSection({ title, options, includeAll, urlPrefix }) {
  const activeStyle = ({ isActive }) =>
    isActive
      ? {
          textDecoration: "underline",
        }
      : null;

  if (includeAll && options) options.unshift("All");

  const mappedOptions = options
    ? options.map((c, i) => (
        <NavLink
          className="index-link"
          style={activeStyle}
          key={i}
          to={`/${urlPrefix}/${c.replaceAll(" ", "-")}`}
        >
          {c}
        </NavLink>
      ))
    : null;

  return (
    <div className="stories-page-index-list">
      <p className="stories-page-index-category-header">
        <strong>{title.toUpperCase()}</strong>
      </p>
      {mappedOptions}
    </div>
  );
}

export default IndexSubSection;
