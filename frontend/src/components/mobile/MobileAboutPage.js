import React, { useState, useEffect, useRef } from "react";
import { client } from "../../sanity/SanityClient";
import { PortableText } from "@portabletext/react";
import MobilePressCard from "./MobilePressCard";
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
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cart-slice";

function MobileAboutPage() {
  const [about, setAbout] = useState();
  const [press, setPress] = useState([]);
  const dispatch = useDispatch();
  const ref = useRef();
  useEffect(() => {
    client
      .fetch(
        `*[_type == "about"][0]{...,brynnPortrait{asset->{url}},brands[]{asset->{url}},text1[]{...,modules[]{...,image{asset->{url}}}},text2[]{...,modules[]{...,image{asset->{url}}}}}`
      )
      .then((response) => setAbout(response));
    client
      .fetch(`*[_type == "dimepiecePress"]{...,image{asset->{url}}}`)
      .then((response) => setPress(response));
  }, []);

  const mappedPress = [...press]
    .sort((a, b) => a.datePublished - b.datePublished)
    .map((p) => <MobilePressCard key={p._id} article={p} />);

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
    <motion.div
      className="mobile-about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "backInOut" }}
      key={"about-page"}
    >
      {about ? (
        <>
          <div>
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
              <p className="about-header-title">{about.text3Header}</p>

              <img
                alt="Brynn Wallner Portrait"
                src={about.brynnPortrait.asset.url}
                style={{
                  backgroundImage: `url(${about.brynnPortrait.asset.url}?blur=50)`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
              <div className="about-brynn-portrait">
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
            <p className="about-brynn-portrait-title-tobias">
              Dimepiece works with Brands, Businesses, and Individuals alike
            </p>
          </div>
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
          <div>
            <p className="about-brynn-portrait-title"> PRESS</p>
            {mappedPress}
          </div>
          <div>
            <p
              // style={{ fontFamily: "swall-diatype-bold", fontSize: "1.4rem" }}
              className="about-brynn-portrait-title"
            >
              SAY HELLO
            </p>
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
            <p
              // style={{ fontFamily: "swall-diatype-bold", fontSize: "1.4rem" }}
              className="about-brynn-portrait-title"
            >
              NEWSLETTER
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
        </>
      ) : null}
    </motion.div>
  );
}

export default MobileAboutPage;
