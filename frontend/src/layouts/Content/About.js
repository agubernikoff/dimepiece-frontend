import React, { useState, useEffect, useRef } from "react";
import { client } from "../../sanity/SanityClient";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import PressCard from "./PressCard";
import SanityArticleImage from "../../sanity/SanityArticleImage";
import SanityEmailLink from "../../sanity/SanityEmailLink";
import SanityExternalLink from "../../sanity/SanityExternalLink";
import ap from "../../assets/ap.png";
import breda from "../../assets/breda.png";
import ebay from "../../assets/ebay.png";
import foundwell from "../../assets/foundwell.png";
import hodinkee from "../../assets/hodinkee.png";
import jcrew from "../../assets/jcrew.png";
import watchesandwonders from "../../assets/watchesandwonders.png";

function About() {
  const about = useSelector((state) => state.about.about);
  const press = useSelector((state) => state.about.press);
  const dispatch = useDispatch();
  const ref = useRef();

  const mappedPress = press.map((p) => <PressCard key={p._id} article={p} />);

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

  // const carouselRef = useRef(null);

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.5,
  //   };

  //   const observer = new IntersectionObserver((entries) => {
  //     console.log("Observer triggered:", entries);
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         startCarousel();
  //       } else {
  //         stopCarousel();
  //       }
  //     });
  //   }, options);

  //   if (carouselRef.current) {
  //     observer.observe(carouselRef.current);
  //   }

  //   return () => {
  //     if (carouselRef.current) {
  //       observer.unobserve(carouselRef.current);
  //     }
  //   };
  // }, []);

  // const startCarousel = () => {
  //   // Start the carousel animation
  //   const slideTrack = carouselRef.current.querySelector(".slide-track");
  //   slideTrack.style.animation = "scroll 25s linear infinite";
  //   console.log("Carousel started");
  // };

  // const stopCarousel = () => {
  //   // Stop the carousel animation
  //   const slideTrack = carouselRef.current.querySelector(".slide-track");
  //   slideTrack.style.animation = "none";
  //   console.log("Carousel stopped");
  // };

  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "backInOut" }}
      key={"about"}
    >
      {about ? (
        <>
          <div className="about-page-container">
            <div className="about-header-title-full">
              <PortableText
                value={about.text1}
                components={{ types: { "module.images": SanityArticleImage } }}
              />
            </div>
            <div className="about-header-title">
              <PortableText
                value={about.text2}
                components={{ types: { "module.images": SanityArticleImage } }}
              />
            </div>
            <div>
              <p className="about-brynn-portrait-title">{about.text3Header}</p>
              <div className="about-brynn-portrait">
                <img
                  alt="Brynn Wallner Portrait"
                  src={about.brynnPortrait.asset.url}
                />
                <PortableText
                  value={about.text3Body}
                  components={
                    ({ types: { "module.images": SanityArticleImage } },
                    {
                      marks: {
                        annotationLinkEmail: SanityEmailLink,
                        annotationLinkExternal: SanityExternalLink,
                      },
                    })
                  }
                />
              </div>
            </div>
            <p className="about-brynn-portrait-title">
              Dimepiece works with Brands, Businesses, and Individuals alike
            </p>
          </div>
          {/* <div className="carousel-wrapper" ref={carouselRef}> */}
          <div className="slider">
            <div className="gradient"></div>
            <div className="slide-track">
              <div className="slide">
                <img src={ap} alt="AP" />
              </div>
              <div className="slide">
                <img src={breda} alt="ebay" />
              </div>
              <div className="slide">
                <img src={ebay} alt="ebay" />
              </div>
              <div className="slide">
                <img src={foundwell} alt="foundwell" />
              </div>
              <div className="slide">
                <img src={hodinkee} alt="hodinkee" />
              </div>
              <div className="slide">
                <img src={jcrew} alt="jcrew" />
              </div>
              <div className="slide">
                <img src={watchesandwonders} alt="watches and wonders" />
              </div>
              <div className="slide">
                <img src={ap} alt="AP" />
              </div>
              <div className="slide">
                <img src={breda} alt="ebay" />
              </div>
              <div className="slide">
                <img src={ebay} alt="ebay" />
              </div>
              <div className="slide">
                <img src={foundwell} alt="foundwell" />
              </div>
              <div className="slide">
                <img src={hodinkee} alt="hodinkee" />
              </div>
              <div className="slide">
                <img src={jcrew} alt="jcrew" />
              </div>
              <div className="slide">
                <img src={watchesandwonders} alt="watches and wonders" />
              </div>
            </div>
          </div>
          {/* </div> */}
          {/* <div className="carousel-container">
            <div className="gradient"></div>
            <div className="slider">
              <img id="brand1" src={ap} alt="AP" />
              <img id="brand2" src={breda} alt="Breda" />
              <img id="brand3" src={ebay} alt="Ebay" />
              <img id="brand4" src={foundwell} alt="Foundwell" />
              <img id="brand5" src={hodinkee} alt="Hodinkee" />
              <img id="brand6" src={jcrew} alt="J Crew" />
              <img
                id="brand7"
                src={watchesandwonders}
                alt="Watches And Wonders"
              />
              <img id="brand1" src={ap} alt="AP" />
              <img id="brand2" src={breda} alt="Breda" />
              <img id="brand3" src={ebay} alt="Ebay" />
              <img id="brand4" src={foundwell} alt="Foundwell" />
              <img id="brand5" src={hodinkee} alt="Hodinkee" />
              <img id="brand6" src={jcrew} alt="J Crew" />
              <img
                id="brand7"
                src={watchesandwonders}
                alt="Watches And Wonders"
              />
            </div>
          </div> */}
          <p className="about-brynn-portrait-title">Dimepiece Press</p>
          <div className="about-section-container">{mappedPress}</div>
          <div>
            <p className="section-title-home">SAY HELLO</p>
            <div className="about-say-hello">
              <p>
                e. <a href={`mailto:hello@dimepiece.co`}>hello@dimepiece.co</a>
              </p>
              <p>
                ig.{" "}
                <a
                  href="https://www.instagram.com/dimepiece.co/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  @dimepiece
                </a>
              </p>
            </div>
          </div>
          <div className="newsletter">
            <p className="section-title-home">STAY IN THE KNOW</p>
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
        </>
      ) : null}
    </motion.div>
  );
}

export default About;
