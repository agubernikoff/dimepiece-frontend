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
    // client
    //   .fetch(
    //     `*[_type == "articles" && isFeatured == true]{_id,title,datePublished,category,_createdAt,previewDescription,coverImage{...,asset->{url}}} | order(datePublished desc)[0]`
    //   )
    //   .then((response) => dispatch(articleActions.setFeatured(response)));
    client
      .fetch(`*[_type == "product" && isFeatured == true][0]`)
      .then((response) => dispatch(articleActions.setBrynnsPick(response)));
    client
      .fetch(
        `*[_type == "articles"]{_id,title,isFeatured,category,datePublished,previewDescription,author,mostDiscussed, coverImage{asset->{url}}} | order(datePublished desc)`
      )
      .then((response) => {
        dispatch(articleActions.setStories(response));
        dispatch(
          articleActions.setFeatured(
            response.find((article) => article.isFeatured)
          )
        );
      });
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

    const createCartMutation = `mutation createCart($cartInput: CartInput) {
        cartCreate(input: $cartInput) {
          cart {
            id
            checkoutUrl
            lines(first: 10) {
              edges {
                node {
                  id
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                    }
                  }
                }
              }
            }
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
            }
            # any other cart object fields
          }
        }
      }`;
    const CART_QUERY = `query cart($id: ID!){
        cart(id: $id){
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                  }
                }
              }
            }
          }
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
          }
          # any other cart object fields
        }
      }`;
    // cart
    fetch("https://dimepiece-api.web.app/checkoutId", {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.checkoutId) {
          shopifyClient
            .request(CART_QUERY, { variables: { id: data.checkoutId } })
            .then(({ data, errors }) => {
              console.log(data.cart);
              if (data.cart) {
                dispatch(cartActions.setCheckoutId(data.cart.id));
                dispatch(
                  cartActions.setCheckoutTotal(
                    data.cart.cost.subtotalAmount.amount
                  )
                );
                dispatch(cartActions.setCheckoutUrl(data.cart.checkoutUrl));
                dispatch(
                  cartActions.addToCartFromLineItems(
                    data?.cart?.lines?.edges?.map(
                      (lineItem) => lineItem.node.merchandise.id.split("/")[4]
                    )
                  )
                );
                dispatch(cartActions.setLines(data.cart.lines.edges));
              }
              // else
              //   shopifyClient.request(createCartMutation).then(({ data }) => {
              //     dispatch(cartActions.setCheckoutId(data.cartCreate.cart.id));
              //     dispatch(
              //       cartActions.setCheckoutTotal(
              //         data.cartCreate.cart.cost.subtotalAmount.amount
              //       )
              //     );
              //     dispatch(
              //       cartActions.setCheckoutUrl(data.cartCreate.cart.checkoutUrl)
              //     );
              //     fetch("https://dimepiece-api.web.app/checkoutId", {
              //       method: "POST",
              //       headers: { "Content-Type": "application/json" },
              //       credentials: "include",
              //       body: JSON.stringify({
              //         checkoutId: data.cartCreate.cart.id,
              //       }),
              //     });
              //   });
            });
        } else {
          // shopifyClient.request(createCartMutation).then(({ data }) => {
          //   dispatch(cartActions.setCheckoutId(data.cartCreate.cart.id));
          //   dispatch(
          //     cartActions.setCheckoutTotal(
          //       data.cartCreate.cart.cost.subtotalAmount.amount
          //     )
          //   );
          //   dispatch(
          //     cartActions.setCheckoutUrl(data.cartCreate.cart.checkoutUrl)
          //   );
          //   fetch("https://dimepiece-api.web.app/checkoutId", {
          //     method: "POST",
          //     headers: { "Content-Type": "application/json" },
          //     credentials: "include",
          //     body: JSON.stringify({
          //       checkoutId: data.cartCreate.cart.id,
          //     }),
          //   });
          // });
          // .then((data) => console.log("new ", data));
        }
      });
  }, []);
}

export default FetchAndSet;
