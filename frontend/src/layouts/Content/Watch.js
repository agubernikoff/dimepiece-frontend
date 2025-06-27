import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../sanity/SanityClient";
import { PortableText } from "@portabletext/react";
import { shopifyClient } from "../../shopify/ShopifyClient.js";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cart-slice";

function Watch() {
  const [watch, setWatch] = useState();
  const URLParam = useParams();

  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  useEffect(() => {
    client
      .fetch(
        `*[_type == "product" && _id == "${URLParam.id}" && store.variants[0]._ref in *[_type == "productVariant"]._id][0]{...,store{...,variants[]{_type == 'reference' => @->}},productImages[]{_key,asset->{url}},brynnPickImage{asset->{url}}}`
      )
      .then((response) => setWatch(response));
  }, [URLParam.id]);

  const mappedImages =
    watch && watch.productImages
      ? watch.productImages.map((i) => (
          <img
            className="product-image"
            loading="lazy"
            key={i._key}
            src={`${i.asset.url}?auto=format&q=60`}
            alt={watch.title}
          />
        ))
      : null;

  const dispatch = useDispatch();
  const checkoutId = useSelector((state) => state.cart.checkoutId);
  const checkoutUrl = useSelector((state) => state.cart.checkoutUrl);
  const cart = useSelector((state) => state.cart.cart);
  const lines = useSelector((state) => state.cart.lines);
  const inCart = watch && cart.find((w) => w._id === watch._id) ? true : false;

  function addToCart() {
    console.log(shopifyClient.getHeaders());
    const lineItemsToAdd = [
      {
        merchandiseId: `${watch.store.variants[0].store.gid}`,
        quantity: 1,
      },
    ];
    if (!checkoutId)
      shopifyClient
        .request(createCartMutation, {
          variables: { cartInput: { lines: lineItemsToAdd } },
        })
        .then(({ data }) => {
          console.log(data.cartCreate.cart);
          if (data?.cartCreate?.cart) {
            dispatch(cartActions.setCheckoutId(data.cartCreate.cart.id));
            dispatch(
              cartActions.setCheckoutTotal(
                data.cartCreate.cart.cost.subtotalAmount.amount
              )
            );
            dispatch(cartActions.setLines(data.cartCreate.cart.lines.edges));
            dispatch(
              cartActions.setCheckoutUrl(data.cartCreate.cart.checkoutUrl)
            );
            fetch("https://dimepiece-api.web.app/checkoutId", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                checkoutId: data.cartCreate.cart.id,
              }),
            })
              .then((d) => d.json())
              .then((d) => console.log(d));
            dispatch(cartActions.addToCart(watch));
            dispatch(cartActions.showCart());
          }
        });
    else
      shopifyClient
        .request(cartLinesAdd, {
          variables: { cartId: checkoutId, lines: lineItemsToAdd },
        })
        .then(({ data }) => {
          console.log(data.cartLinesAdd.cart);
          if (data?.cartLinesAdd?.cart) {
            dispatch(
              cartActions.setCheckoutTotal(
                data.cartLinesAdd.cart.cost.subtotalAmount.amount
              )
            );
            dispatch(cartActions.setLines(data.cartLinesAdd.cart.lines.edges));
            dispatch(cartActions.addToCart(watch));
            dispatch(cartActions.showCart());
          }
        });
  }

  function removeFromCart() {
    shopifyClient
      .request(cartLinesRemove, {
        variables: {
          cartId: checkoutId,
          lineIds: [
            lines.find(
              (line) =>
                line.node.merchandise.id === watch.store.variants[0].store.gid
            ).node.id,
          ],
        },
      })
      .then(({ data }) => {
        if (data?.cartLinesRemove?.cart) {
          dispatch(
            cartActions.setCheckoutTotal(
              data.cartLinesRemove.cart.cost.subtotalAmount.amount
            )
          );
          dispatch(cartActions.setLines(data.cartLinesRemove.cart.lines.edges));
          dispatch(cartActions.removeFromCart(watch._id));
        }
      });
  }

  function buyNow() {
    const lineItemsToAdd = [
      {
        merchandiseId: `${watch.store.variants[0].store.gid}`,
        quantity: 1,
      },
    ];
    if (!inCart) {
      if (!checkoutId)
        shopifyClient
          .request(createCartMutation, {
            variables: { cartInput: { lines: lineItemsToAdd } },
          })
          .then(({ data }) => {
            console.log(data.cartCreate.cart);
            if (data?.cartCreate?.cart) {
              dispatch(cartActions.setCheckoutId(data.cartCreate.cart.id));
              dispatch(
                cartActions.setCheckoutTotal(
                  data.cartCreate.cart.cost.subtotalAmount.amount
                )
              );
              dispatch(cartActions.setLines(data.cartCreate.cart.lines.edges));
              dispatch(
                cartActions.setCheckoutUrl(data.cartCreate.cart.checkoutUrl)
              );
              fetch("https://dimepiece-api.web.app/checkoutId", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                  checkoutId: data.cartCreate.cart.id,
                }),
              })
                .then((d) => d.json())
                .then((d) => console.log(d));
              dispatch(cartActions.addToCart(watch));
              dispatch(cartActions.showCart());
              window.open(
                `${data?.cartLinesAdd?.cart.checkoutUrl}`,
                "_blank",
                "noopener,noreferrer"
              );
            }
          });
      else
        shopifyClient
          .request(cartLinesAdd, {
            variables: { cartId: checkoutId, lines: lineItemsToAdd },
          })
          .then(({ data }) => {
            console.log(data);
            if (data?.cartLinesAdd?.cart) {
              dispatch(
                cartActions.setCheckoutTotal(
                  data.cartLinesAdd.cart.cost.subtotalAmount.amount
                )
              );
              dispatch(
                cartActions.setLines(data.cartLinesAdd.cart.lines.edges)
              );
              dispatch(cartActions.addToCart(watch));
              dispatch(cartActions.showCart());
              window.open(
                `${data?.cartLinesAdd?.cart.checkoutUrl}`,
                "_blank",
                "noopener,noreferrer"
              );
            }
          });
    } else window.open(`${checkoutUrl}`, "_blank", "noopener,noreferrer");
  }
  if (watch)
    return (
      <>
        <div className="product-container">
          <div className="product-images-container">{mappedImages}</div>
          <div className="product-description-container">
            <div className="watch-preview-card-details">
              <p>{watch.brand.toUpperCase()}</p>
              <p>{watch.title}</p>
              <p>
                {watch.store.priceRange.maxVariantPrice.toLocaleString(
                  "en-US",
                  options
                )}
              </p>
            </div>
            <div className="watch-description-table">
              <div className="watch-description-table-row">
                <p className="watch-description-table-row-key">DATE OF BIRTH</p>
                <p className="watch-description-table-row-value">
                  {watch.dateOfBirth}
                </p>
              </div>
              <div className="watch-description-table-row">
                <p className="watch-description-table-row-key">MATERIAL</p>
                <p className="watch-description-table-row-value">
                  {watch.material}
                </p>
              </div>
              <div className="watch-description-table-row">
                <p className="watch-description-table-row-key">SIZE</p>
                <p className="watch-description-table-row-value">
                  {watch.size}
                </p>
              </div>
              <div className="watch-description-table-row">
                <p className="watch-description-table-row-key">MOVEMENT</p>
                <p className="watch-description-table-row-value">
                  {watch.movement}
                </p>
              </div>
              <div className="watch-description-table-row">
                <p className="watch-description-table-row-key">CONDITION</p>
                <p className="watch-description-table-row-value">
                  {watch.condition}
                </p>
              </div>
              <div className="watch-description-table-row">
                <p className="watch-description-table-row-key">BOX</p>
                <p className="watch-description-table-row-value">
                  {watch.box ? "Yes" : "No"}
                </p>
              </div>
              <div className="watch-description-table-row">
                <p className="watch-description-table-row-key">PAPERS</p>
                <p className="watch-description-table-row-value">
                  {watch.papers ? "Yes" : "No"}
                </p>
              </div>
            </div>
            <div className="watch-description-buttons-container">
              {watch.store.variants[0].store.inventory.isAvailable ? (
                <>
                  <button onClick={inCart ? removeFromCart : addToCart}>
                    {inCart ? "REMOVE FROM CART" : "ADD TO CART"}
                  </button>
                  <button onClick={buyNow}>BUY NOW</button>
                </>
              ) : (
                <button
                  style={{
                    backgroundColor: "#D8D8D8",
                    border: "none",
                    color: "black",
                    cursor: "default",
                  }}
                >
                  SOLD OUT
                </button>
              )}
            </div>
            <div className="watch-description-summary">
              <p>{"BRYNN'S DESCRIPTION:"}</p>
              <PortableText value={watch.description} />
              <p>THE NITTY GRITTY:</p>
              <PortableText value={watch.nittyGritty} />
            </div>
          </div>
        </div>
      </>
    );
}

export default Watch;

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
        }
      }
    } 
    userErrors {
      field
      message
    }
    warnings {
      code
      message
    }
  }
}`;

const cartLinesAdd = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
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
            }
          }
        } 
        userErrors {
          field
          message
        }
        warnings {
          code
          message
        }
      }
    }
  `;

const cartLinesRemove = `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
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
          }
        }
      } 
      userErrors {
        field
        message
      }
      warnings {
        code
        message
      }
    }
  }`;
