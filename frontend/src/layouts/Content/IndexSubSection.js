import { prepareCssVars } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";
import { mobileFilterActions } from "../../redux/mobile-filter-slice";

function IndexSubSection({
  title,
  options,
  includeAll,
  urlPrefix,
  useUSP,
  isMobile,
}) {
  const dispatch = useDispatch();
  const primaryFilter = useSelector(
    (state) => state.mobileFilter.primaryFilter
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const activeStyle = ({ isActive }) =>
    isActive
      ? {
          textDecoration: "underline",
        }
      : null;

  if (includeAll && options && !options.find((o) => o === "All"))
    options.unshift("All");

  const mappedOptions = options
    ? useUSP
      ? options.map((o, i) => (
          <p
            key={i}
            className="index-link"
            onClick={() => {
              if (searchParams.get(title) === o) {
                searchParams.delete(title);
                setSearchParams(searchParams);
              } else
                setSearchParams((p) => {
                  p.set(title, o);
                  return p;
                });
            }}
            style={
              searchParams.get(title) === o
                ? { textDecoration: "underline" }
                : null
            }
          >
            {o}
          </p>
        ))
      : isMobile
      ? options.map((o) => (
          <p
            className="index-link"
            key={o}
            onClick={() =>
              dispatch(
                mobileFilterActions.setPrimaryFilter(o.replaceAll(" ", "-"))
              )
            }
            style={
              primaryFilter === o.replaceAll(" ", "-")
                ? { textDecoration: "underline" }
                : null
            }
          >
            {o}
          </p>
        ))
      : options.map((o, i) => (
          <NavLink
            className="index-link"
            style={activeStyle}
            key={i}
            to={`/${urlPrefix}/${o.replaceAll(" ", "-")}${
              searchParams ? `?${searchParams}` : null
            }`}
          >
            {o}
          </NavLink>
        ))
    : null;
  console.log(searchParams);
  if (isMobile) {
    dispatch(mobileFilterActions.setUrlPrefix(urlPrefix));
  }

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
