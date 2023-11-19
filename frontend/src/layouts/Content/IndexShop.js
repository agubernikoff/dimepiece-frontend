import React from "react";
import IndexSubSection from "./IndexSubSection";

function IndexShop({ brandTitles, isMobile }) {
  return (
    <>
      <IndexSubSection
        title={"brands"}
        options={brandTitles}
        includeAll={true}
        urlPrefix={"shop"}
        isMobile={isMobile}
      />
      <IndexSubSection
        title={"filter by"}
        options={[
          "Latest Arrivals",
          "Price: Low to High",
          "Price: High to Low",
        ]}
        includeAll={false}
        urlPrefix={"shop"}
        useUSP={true}
      />
      <IndexSubSection
        title={"case size"}
        options={["Small", "Medium", "Large"]}
        includeAll={false}
        urlPrefix={"shop"}
        useUSP={true}
      />
      <IndexSubSection
        title={"styles"}
        options={["Gold", "Steel", "Gem-Set", "Leather Strap", "Colored Dial"]}
        includeAll={false}
        urlPrefix={"shop"}
        useUSP={true}
      />
    </>
  );
}

export default IndexShop;
