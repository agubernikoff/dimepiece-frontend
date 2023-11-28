import React, { useState, useEffect } from "react";
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

function MobileAboutPage() {
  const [about, setAbout] = useState();
  const [press, setPress] = useState([]);
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

  const mappedPress = press.map((p) => (
    <MobilePressCard key={p._id} article={p} />
  ));

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
          <div>
            <p className="about-brynn-portrait-title"> PRESS</p>
            {mappedPress}
          </div>
          <div>
            <h3 className="about-brynn-portrait-title">SAY HELLO</h3>
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
            <h3 className="about-brynn-portrait-title">NEWSLETTER</h3>
            <div className="newsletter-input-container">
              <input placeholder="Email Address" type="email"></input>
              <button>Join</button>
            </div>
          </div>
        </>
      ) : null}
    </motion.div>
  );
}

export default MobileAboutPage;
