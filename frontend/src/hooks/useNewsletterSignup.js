import { useRef } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";

export function useNewsletterSignup(location = "Newsletter") {
  const ref = useRef();
  const btnRef = useRef();
  const analytics = getAnalytics();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = e.target.email.value;

    if (!emailPattern.test(email)) {
      ref.current.classList.add("failure");
      setTimeout(() => ref.current.classList.remove("failure"), 1500);
      return;
    }

    try {
      const response = await fetch(
        "https://dimepiece.substack.com/api/v1/free",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      if (response.ok) {
        logEvent(analytics, "newsletter_signup", { location });
        ref.current.classList.add("success");
        if (btnRef.current) {
          btnRef.current.innerHTML = "Check your inbox!";
          btnRef.current.style.textDecoration = "none";
        }
        setTimeout(() => {
          ref.current.classList.remove("success");
          if (btnRef.current) {
            btnRef.current.innerHTML = "Join";
            btnRef.current.style.textDecoration = "underline";
          }
        }, 3000);
        e.target.reset();
      } else {
        throw new Error("Failed");
      }
    } catch {
      ref.current.classList.add("failure");
      setTimeout(() => ref.current.classList.remove("failure"), 1500);
    }
  };

  return { ref, btnRef, handleSubmit };
}
