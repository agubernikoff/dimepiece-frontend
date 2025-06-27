import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import { shopifyClient } from "../../shopify/ShopifyClient";
import { useNavigate } from "react-router-dom";

function CartProductCards({ watch }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  const lines = useSelector((state) => state.cart.lines);
  const checkoutId = useSelector((state) => state.cart.checkoutId);

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
        console.log(data);
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

  return (
    <div className="cart-product-card-content">
      <div className="cart-product-card-img-container">
        <img
          alt={`${watch.brand} ${watch.title}`}
          src={`${watch.productImages[0].asset.url}?auto=format&q=60`}
          onClick={() => {
            nav(`/shop/${watch.brand.replaceAll(" ", "-")}/${watch._id}`);
            dispatch(cartActions.toggleDisplayCart());
          }}
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
          <p>Size: {watch.size}</p>
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
