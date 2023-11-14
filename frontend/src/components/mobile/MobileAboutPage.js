import React, { useState, useEffect } from "react";
import { client } from "../../sanity/SanityClient";
import { PortableText } from "@portabletext/react";
import MobilePressCard from "./MobilePressCard";
import SanityArticleImage from "../../sanity/SanityArticleImage";
import SanityEmailLink from "../../sanity/SanityEmailLink";
import SanityExternalLink from "../../sanity/SanityExternalLink";

function MobileAboutPage() {
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

  const mappedPress = press.map((p) => (
    <MobilePressCard key={p._id} article={p} />
  ));

  if (about)
    return (
      <div className="mobile-about-page">
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
            <p className="about-brynn-portrait-title">{about.text3Header}</p>

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
        <div>
          <p className="about-brynn-portrait-title"> PRESS</p>
          {mappedPress}
        </div>
        <div>
          <h3 className="about-brynn-portrait-title">SAY HELLO</h3>
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
          <h3 className="about-brynn-portrait-title">NEWSLETTER</h3>
          <div className="newsletter-input-container">
            <input placeholder="Email Address" type="email"></input>
            <button>Join</button>
          </div>
        </div>
      </div>
    );
}

export default MobileAboutPage;
