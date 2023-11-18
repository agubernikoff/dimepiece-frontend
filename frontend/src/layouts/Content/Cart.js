import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import { AnimatePresence, motion } from "framer-motion";
import CartProductCards from "./CartProductCards";

function Cart({ isMobile }) {
  const dispatch = useDispatch();
  const total = useSelector((state) => state.cart.checkoutTotal);
  const url = useSelector((state) => state.cart.checkoutUrl);
  const cart = useSelector((state) => state.cart.cart);
  const productCards = cart.map((w) => (
    <motion.div layout="position" key={w._id}>
      <CartProductCards watch={w} />
    </motion.div>
  ));

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "linear" }}
        key="cart-overlay"
        className="cart-overlay"
      ></motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.5, ease: "linear" }}
        key="cart"
        className={isMobile ? "mobile-cart-pop-up" : "cart-pop-up"}
      >
        <div className="cart-title-container">
          <h2>CART</h2>
          <button
            className="close-cart-btn"
            onClick={() => dispatch(cartActions.hideCart())}
          >
            <h2>X</h2>
          </button>
        </div>
        <div className="cart-product-cards-container">{productCards}</div>
        <div className="cart-footer">
          <div className="cart-subtotal-container">
            <p>Subtotal</p>
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(total)}
            </p>
          </div>
          <div className="watch-description-buttons-container">
            <button
              onClick={() =>
                window.open(`${url}`, "_blank", "noopener,noreferrer")
              }
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Cart;
