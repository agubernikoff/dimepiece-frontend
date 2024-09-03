import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import { getAnalytics, logEvent } from "firebase/analytics";

function Newsletter() {
  const dispatch = useDispatch();
  const inputContainer = useRef();
  const btn = useRef();
  const analytics = getAnalytics();
  const sendEmail = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(e.target.email.value)) {
      emailjs
        .sendForm(
          "dimepiece",
          "template_hfmoirr",
          e.target,
          "q5PPM5-H0N3HywCI-"
        )
        .then(
          (result) => {
            // Add success message or further actions here
            if (result.text === "OK") {
              logEvent(analytics, "newsletter_signup", {
                location: "Newsletter",
              });
              inputContainer.current.classList.add("success");
              btn.current.innerHTML = "Thank You!";
              btn.current.style.textDecoration = "none";
              setTimeout(() => {
                inputContainer.current.classList.remove("success");
                btn.current.innerHTML = "Join";
                btn.current.style.textDecoration = "underline";
              }, 1000);
              e.target.reset();
            }
          },
          (error) => {
            // Add error handling here
            inputContainer.current.classList.add("failure");
            setTimeout(
              () => inputContainer.current.classList.remove("failure"),
              1000
            );
          }
        );
    } else {
      inputContainer.current.classList.add("failure");
      setTimeout(
        () => inputContainer.current.classList.remove("failure"),
        1000
      );
    }
  };
  return (
    <div className="newsletter">
      <p className="section-title-home">NEWSLETTER</p>
      <p>
        Sign up for the Dimepiece Newsletter to stay up to date on all our
        latest stories, products, and offerings.
      </p>
      <form
        className="newsletter-input-container"
        onSubmit={sendEmail}
        ref={inputContainer}
      >
        <input
          placeholder="Email Address"
          name="email"
          onFocus={() => dispatch(cartActions.hideSearch())}
        ></input>
        <button type="submit" ref={btn}>
          Join
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
