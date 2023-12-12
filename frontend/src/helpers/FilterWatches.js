import { toCamelCase } from "./ToCamelCase";
export function filterWatches(
  initialArray,
  brand,
  filterBy,
  caseSizeFilter,
  stylesFilter
) {
  let filteredWatches = initialArray;

  if (brand)
    filteredWatches = filteredWatches.filter((w) => {
      if (brand === "All") return true;
      return w.brand.toUppercase() === brand.toUppercase();
    });

  switch (filterBy) {
    case "Latest Arrivals":
      filteredWatches.sort(
        (a, b) => new Date(a._createdAt) - new Date(b._createdAt)
      );
      break;
    case "Price: Low to High":
      filteredWatches.sort(
        (a, b) =>
          a.store.priceRange.maxVariantPrice -
          b.store.priceRange.maxVariantPrice
      );
      break;
    case "Price: High to Low":
      filteredWatches.sort(
        (a, b) =>
          b.store.priceRange.maxVariantPrice -
          a.store.priceRange.maxVariantPrice
      );
      break;
  }

  if (caseSizeFilter) {
    filteredWatches = filteredWatches.filter(
      (w) => w.caseSize === caseSizeFilter.toLowerCase()
    );
  }

  if (stylesFilter) {
    filteredWatches = filteredWatches.filter((w) => {
      if (w.style.includes(toCamelCase(stylesFilter))) return true;
      else return false;
    });
  }

  return filteredWatches;
}
