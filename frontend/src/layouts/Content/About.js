import React, { useState, useEffect } from "react";
import { client } from "../../sanity/SanityClient";
import { PortableText } from "@portabletext/react";
import PressCard from "./PressCard";
import SanityArticleImage from "../../sanity/SanityArticleImage";
import SanityEmailLink from "../../sanity/SanityEmailLink";
import SanityExternalLink from "../../sanity/SanityExternalLink";

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
  if (about)
    return (
      <div>
        <div>
          <div>
            <PortableText
              value={about.text1}
              components={{ types: { "module.images": SanityArticleImage } }}
            />
          </div>
          <div>
            <PortableText
              value={about.text2}
              components={{ types: { "module.images": SanityArticleImage } }}
            />
          </div>
          <div>
            <p>{about.text3Header}</p>
            <div>
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
          <p>Dimepiece works with Brands, Businesses, and Individuals alike</p>
        </div>
        <div>
          <p>Dimepiece Press</p>
          {mappedPress}
        </div>
        <div>
          <h3 className="section-title-home">SAY HELLO</h3>
          <div>
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
          <p>
            Sign up for the Dimepiece Newsletter to stay up to date on all our
            latest stories, products, and offerings.
          </p>
          <div className="newsletter-input-container">
            <input placeholder="Email Address" type="email"></input>
            <button>Join</button>
          </div>
        </div>
      </div>
    );
}

export default About;
