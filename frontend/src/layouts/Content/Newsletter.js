import React from "react";

function Newsletter() {
  return (
    <div className="newsletter">
      <p className="section-title-home">NEWSLETTER</p>
      {/* <p>
        Sign up for the Dimepiece Newsletter to stay up to date on all our
        latest stories, products, and offerings.
      </p> */}
      <iframe
        src="https://dimepiece.substack.com/embed"
        width="480"
        height="320"
        style={{ border: "1px solid #EEE", background: "white" }}
        frameBorder="0"
        scrolling="no"
        title="Newsletter signup"
      />
    </div>
  );
}

export default Newsletter;
