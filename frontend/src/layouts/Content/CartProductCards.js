import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import { shopifyClient } from "../../shopify/ShopifyClient";

function CartProductCards({ watch }) {
  const dispatch = useDispatch();
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  const checkoutId = useSelector((state) => state.cart.checkoutId);

  function removeFromCart() {
    console.log(
      `gid://shopify/CheckoutLineItem/${
        watch.store.variants[0]._ref.split("-")[1]
      }0?checkout=${checkoutId.split("/")[4].split("?")[0]}`
    );
    const lineItemsToRemove = [
      `gid://shopify/CheckoutLineItem/${
        watch.store.variants[0]._ref.split("-")[1]
      }0?checkout=${checkoutId.split("/")[4].split("?")[0]}`,
    ];
    shopifyClient.checkout
      .removeLineItems(checkoutId, lineItemsToRemove)
      .then((checkout) => {
        console.log(checkout);
        dispatch(cartActions.setCheckoutTotal(checkout.subtotalPrice.amount));
      });
    dispatch(cartActions.removeFromCart(watch._id));
  }

  return (
    <div className="cart-product-card-content">
      <div className="cart-product-card-img-container">
        <img
          alt={`${watch.brand} ${watch.title}`}
          src={watch.store.previewImageUrl}
        />
      </div>
      <div className="cart-product-title-container">
        <div className="cart-product-brand-title">
          <p>
            <strong>{watch.brand.toUpperCase()}</strong>
          </p>
          <p>
            <strong>{watch.title}</strong>
          </p>
        </div>
        <div>
          <p>size</p>
        </div>
      </div>
      <div className="cart-price-container">
        <p>
          {watch.store.priceRange.maxVariantPrice.toLocaleString(
            "en-US",
            options
          )}
        </p>
        <div className="cart-price-container-button">
          <button onClick={removeFromCart}>Remove</button>
        </div>
      </div>
    </div>
  );
}

export default CartProductCards;
