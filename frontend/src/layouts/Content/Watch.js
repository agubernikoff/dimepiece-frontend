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
            src={i.asset.url}
            alt={watch.title}
          />
        ))
      : null;

  const dispatch = useDispatch();
  const checkoutId = useSelector((state) => state.cart.checkoutId);
  const checkoutUrl = useSelector((state) => state.cart.checkoutUrl);
  const cart = useSelector((state) => state.cart.cart);
  const inCart = watch && cart.find((w) => w._id === watch._id) ? true : false;

  function addToCart() {
    const lineItemsToAdd = [
      {
        variantId: `${watch.store.variants[0].store.gid}`,
        quantity: 1,
      },
    ];
    shopifyClient.checkout
      .addLineItems(checkoutId, lineItemsToAdd)
      .then((checkout) => {
        // console.log(checkout);
        dispatch(cartActions.setCheckoutTotal(checkout.subtotalPrice.amount));
      });
    dispatch(cartActions.addToCart(watch));
    dispatch(cartActions.showCart());
  }

  function removeFromCart() {
    const lineItemsToRemove = [
      `gid://shopify/CheckoutLineItem/${
        watch.store.variants[0].store.id
      }0?checkout=${checkoutId.split("/")[4].split("?")[0]}`,
    ];
    shopifyClient.checkout
      .removeLineItems(checkoutId, lineItemsToRemove)
      .then((checkout) => {
        // console.log(checkout);
        dispatch(cartActions.setCheckoutTotal(checkout.subtotalPrice.amount));
      });
    dispatch(cartActions.removeFromCart(watch._id));
  }

  function buyNow() {
    const lineItemsToAdd = [
      {
        variantId: `${watch.store.variants[0].store.gid}`,
        quantity: 1,
      },
    ];
    if (!inCart) {
      dispatch(cartActions.addToCart(watch));
      shopifyClient.checkout
        .addLineItems(checkoutId, lineItemsToAdd)
        .then((checkout) => {
          // console.log(checkout);
          dispatch(cartActions.setCheckoutTotal(checkout.subtotalPrice.amount));
          window.open(`${checkout.webUrl}`, "_blank", "noopener,noreferrer");
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
