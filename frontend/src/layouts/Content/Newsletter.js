import React from "react";

function Newsletter() {
  return (
    <div className="newsletter">
      <h3 className="section-title-home">NEWSLETTER</h3>
      <p>
        Sign up for the Dimepiece Newsletter to stay up to date on all our
        latest stories, products, and offerings.
      </p>
      <div className="newsletter-input-container">
        <input placeholder="Email Address" type="email"></input>
        <button>Join</button>
      </div>
    </div>
  );
}

export default Newsletter;
