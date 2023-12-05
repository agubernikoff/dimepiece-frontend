import { prepareCssVars } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { cartActions } from "../../redux/cart-slice";
import { mobileFilterActions } from "../../redux/mobile-filter-slice";

function IndexSubSection({
  title,
  options,
  includeAll,
  urlPrefix,
  useUSP,
  isMobile,
}) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const primaryFilter = useSelector(
    (state) => state.mobileFilter.primaryFilter
  );

  const [searchParams, setSearchParams] = useSearchParams();

  if (includeAll && options && !options.find((o) => o === "All"))
    options.unshift("All");

  const activeStyle = ({ isActive }) =>
    isActive
      ? {
          textDecoration: "underline",
        }
      : null;

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
              dispatch(cartActions.hideSearch());
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
            onClick={() => dispatch(cartActions.hideSearch())}
          >
            {o}
          </NavLink>
        ))
    : null;

  useEffect(() => {
    if (isMobile) {
      dispatch(mobileFilterActions.setUrlPrefix(urlPrefix));
    }
  }, []);

  function clearFilters() {
    if (useUSP) {
      if (title === "filter by")
        setSearchParams((p) => {
          p.set(title, "Latest Arrivals");
          return p;
        });
      else {
        searchParams.delete(title);
        setSearchParams(searchParams);
      }
    } else if (title === "brands" && isMobile) {
      dispatch(mobileFilterActions.setPrimaryFilter("All"));
    } else nav(`/${urlPrefix}/All${searchParams ? `?${searchParams}` : null}`);
  }

  return (
    <div className="stories-page-index-list">
      <p
        style={{ fontFamily: "swall-diatype-bold" }}
        className="stories-page-index-category-header"
        onClick={() => {
          clearFilters();
          dispatch(cartActions.hideSearch());
        }}
      >
        {title.toUpperCase()}
      </p>
      {mappedOptions}
    </div>
  );
}

export default IndexSubSection;
