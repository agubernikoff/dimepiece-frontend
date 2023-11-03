import React from "react";
import IndexSubSection from "./IndexSubSection";

function IndexShop({ brandTitles }) {
  return (
    <>
      <IndexSubSection
        title={"brands"}
        options={brandTitles}
        includeAll={true}
        urlPrefix={"shop"}
      />
      <IndexSubSection
        title={"filter by"}
        options={[
          "Latest Arrivals",
          "Brynn's Basics",
          "Price: Low to High",
          "Price: High to Low",
        ]}
        includeAll={false}
        urlPrefix={"shop"}
      />
      <IndexSubSection
        title={"case size"}
        options={["Small", "Medium", "Large"]}
        includeAll={false}
        urlPrefix={"shop"}
      />
      <IndexSubSection
        title={"styles"}
        options={["Gold", "Steel", "Gem-Set", "Leather Strap", "Colored Dial"]}
        includeAll={false}
        urlPrefix={"shop"}
      />
    </>
  );
}

export default IndexShop;
