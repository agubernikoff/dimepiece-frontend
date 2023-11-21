import React, { useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

function MobileNewsletter() {
  const ref = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(emailPattern.test(e.target.email.value));
    console.log(e.target.email.value);
    if (emailPattern.test(e.target.email.value)) {
      emailjs
        .sendForm(
          "service_571yygo",
          "template_84i2kjw",
          e.target,
          "WPUweZAoXmamBd_kZ"
        )
        .then(
          (result) => {
            // Add success message or further actions here
            if (result.text === "OK") {
              console.log(result.text);
              ref.current.classList.add("success");
              setTimeout(() => ref.current.classList.remove("success"), 1000);
              e.target.reset();
            }
          },
          (error) => {
            console.log(error.text);
            // Add error handling here
            ref.current.classList.add("failure");
            setTimeout(() => ref.current.classList.remove("failure"), 1500);
          }
        );
    } else {
      ref.current.classList.add("failure");
      setTimeout(() => ref.current.classList.remove("failure"), 1500);
    }
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
        <form
          className="newsletter-input-container"
          onSubmit={sendEmail}
          ref={ref}
        >
          <input placeholder="Email Address" name="email"></input>
          <button type="submit">Join</button>
        </form>
      </div>
    </motion.div>
  );
}

export default MobileNewsletter;
