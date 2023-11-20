import React from "react";
import emailjs from "emailjs-com";

function Newsletter() {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_571yygo",
        "template_84i2kjw",
        e.target,
        "WPUweZAoXmamBd_kZ"
      )
      .then(
        (result) => {
          console.log(result.text);
          // Add success message or further actions here
        },
        (error) => {
          console.log(error.text);
          // Add error handling here
        }
      );
  };
  return (
    <div className="newsletter">
      <h3 className="section-title-home">NEWSLETTER</h3>
      <p>
        Sign up for the Dimepiece Newsletter to stay up to date on all our
        latest stories, products, and offerings.
      </p>
      <form className="newsletter-input-container" onSubmit={sendEmail}>
        <input type="email" placeholder="Email Address" name="email"></input>
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default Newsletter;
