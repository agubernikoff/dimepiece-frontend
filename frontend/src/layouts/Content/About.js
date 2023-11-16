import React, { useState, useEffect } from "react";
import { client } from "../../sanity/SanityClient";
import { PortableText } from "@portabletext/react";
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
  const [about, setAbout] = useState();
  const [press, setPress] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type == "about"][0]{...,brynnPortrait{asset->{url}},brands[]{asset->{url}}}`
      )
      .then((response) => setAbout(response));
    client
      .fetch(`*[_type == "dimepiecePress"]{...,image{asset->{url}}}`)
      .then((response) => setPress(response));
  }, []);

  const mappedPress = press.map((p) => <PressCard key={p._id} article={p} />);

  return (
    <div className="about-page">
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

          <div className="carousel-container">
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
          </div>
          <div className="about-page-container">
            <p className="about-brynn-portrait-title">Dimepiece Press</p>
            {mappedPress}
          </div>
          <div>
            <h3 className="section-title-home">SAY HELLO</h3>
            <div className="about-say-hello">
              <p>
                e. <a>hello@dimepiece.co</a>
              </p>
              <p>
                ig. <a>@dimepiece</a>
              </p>
            </div>
          </div>
          <div className="newsletter">
            <h3 className="section-title-home">STAY IN THE KNOW</h3>
            <div className="newsletter-input-container">
              <input placeholder="Email Address" type="email"></input>
              <button>Join</button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default About;
