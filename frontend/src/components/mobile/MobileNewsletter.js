import React from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

function MobileNewsletter() {
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
    <motion.div
      className="mobile-newsletter-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "backInOut" }}
      key={"newsletterPage"}
    >
      <div className="mobile-newsletter">
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
    </motion.div>
  );
}

export default MobileNewsletter;
