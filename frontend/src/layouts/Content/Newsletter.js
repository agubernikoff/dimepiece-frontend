import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cart-slice";

function Newsletter() {
  const dispatch = useDispatch();
  const ref = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
              ref.current.classList.add("success");
              setTimeout(() => ref.current.classList.remove("success"), 1000);
              e.target.reset();
            }
          },
          (error) => {
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
    <div className="newsletter">
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
        <input
          placeholder="Email Address"
          name="email"
          onFocus={() => dispatch(cartActions.hideSearch())}
        ></input>
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default Newsletter;
