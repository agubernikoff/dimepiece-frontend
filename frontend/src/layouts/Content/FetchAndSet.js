import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { aboutActions } from "../../redux/about-slice";
import { articleActions } from "../../redux/article-slice";
import { cartActions } from "../../redux/cart-slice";
import { client } from "../../sanity/SanityClient";
import { shopifyClient } from "../../shopify/ShopifyClient";

function FetchAndSet() {
  const dispatch = useDispatch();
  useEffect(() => {
    client
      .fetch(
        `*[_type == "articles" && isFeatured == true]{_id,title,datePublished,category,_createdAt,previewDescription,coverImage{...,asset->{url}}} | order(datePublished desc)[0]`
      )
      .then((response) => dispatch(articleActions.setFeatured(response)));
    client
      .fetch(`*[_type == "product" && isFeatured == true][0]`)
      .then((response) => dispatch(articleActions.setBrynnsPick(response)));
    client
      .fetch(
        `*[_type == "articles"]{_id,title,isFeatured,category,datePublished,previewDescription,mostDiscussed, coverImage{asset->{url}}} | order(datePublished desc)`
      )
      .then((response) => dispatch(articleActions.setStories(response)));
    client
      .fetch(`*[_type == "categories"]{_id,descriptor,title}`)
      .then((response) => dispatch(articleActions.setTypes(response)));
    client
      .fetch(`*[_type == "brands"]{_id,descriptor,title}`)
      .then((response) => dispatch(cartActions.setBrands(response)));
    client
      .fetch(
        `*[_type == "product" && store.variants[0]._ref in *[_type == "productVariant" && store.inventory.isAvailable]._id]{...,store{...,variants[]{_type == 'reference' => @->}},productImages[]{_key,asset->{url}},brynnPickImage{asset->{url}}}`
      )
      .then((response) => {
        dispatch(cartActions.setWatches(response.filter((w) => w.brand)));
      });
    client
      .fetch(
        `*[_type == "about"][0]{...,brynnPortrait{asset->{url}},brands[]{asset->{url}},text1[]{...,modules[]{...,image{asset->{url}}}},text2[]{...,modules[]{...,image{asset->{url}}}}}`
      )
      .then((response) => dispatch(aboutActions.setAbout(response)));
    client
      .fetch(`*[_type == "dimepiecePress"]{...,image{asset->{url}}}`)
      .then((response) => dispatch(aboutActions.setPress(response)));

    // cart
    fetch("https://dimepiece-api.web.app/checkoutId", {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        if (data.checkoutId) {
          shopifyClient.checkout.fetch(data.checkoutId).then((checkout) => {
            if (!checkout.completedAt) {
              dispatch(cartActions.setCheckoutId(checkout.id));
              dispatch(
                cartActions.setCheckoutTotal(checkout.subtotalPrice.amount)
              );
              dispatch(cartActions.setCheckoutUrl(checkout.webUrl));
              dispatch(
                cartActions.addToCartFromLineItems(
                  checkout.lineItems.map(
                    (lineItem) => lineItem.variant.id.split("/")[4]
                  )
                )
              );
            } else
              shopifyClient.checkout.create().then((checkout) => {
                dispatch(cartActions.setCheckoutId(checkout.id));
                dispatch(
                  cartActions.setCheckoutTotal(checkout.subtotalPrice.amount)
                );
                dispatch(cartActions.setCheckoutUrl(checkout.webUrl));
                fetch("https://dimepiece-api.web.app/checkoutId", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  credentials: "include",
                  body: JSON.stringify({ checkoutId: checkout.id }),
                })
                  .then((r) => r.json())
                  .then((data) => console.log("new ", data));
              });
          });
        } else {
          shopifyClient.checkout.create().then((checkout) => {
            dispatch(cartActions.setCheckoutId(checkout.id));
            dispatch(
              cartActions.setCheckoutTotal(checkout.subtotalPrice.amount)
            );
            dispatch(cartActions.setCheckoutUrl(checkout.webUrl));
            fetch("https://dimepiece-api.web.app/checkoutId", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ checkoutId: checkout.id }),
            })
              .then((r) => r.json())
              .then((data) => console.log("new ", data));
          });
        }
      });
  }, []);
}

export default FetchAndSet;
