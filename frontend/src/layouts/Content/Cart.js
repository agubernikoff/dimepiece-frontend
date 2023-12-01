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
        transition={{ duration: 0.25, ease: "linear" }}
        key="cart-overlay"
        className="cart-overlay"
        onClick={() => dispatch(cartActions.toggleDisplayCart())}
      ></motion.div>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0, transition: { ease: "easeOut", duration: 0.25 } }}
        exit={{ x: "100%", transition: { ease: "easeIn", duration: 0.25 } }}
        key="cart"
        className={isMobile ? "mobile-cart-pop-up" : "cart-pop-up"}
      >
        <div
          className={
            isMobile ? "mobile-cart-title-container" : "cart-title-container"
          }
        >
          <p style={isMobile ? null : { marginLeft: "1vw" }}>
            {cart.length > 0 ? `CART (${cart.length})` : "CART"}
          </p>
          <button
            className="close-cart-btn"
            onClick={() => dispatch(cartActions.hideCart())}
          >
            <p>X</p>
          </button>
        </div>
        <div className="cart-product-cards-hold">
          <div className="cart-product-cards-container">{productCards}</div>
        </div>
        <div className={isMobile ? "mobile-cart-footer" : "cart-footer"}>
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
          <div
            className="watch-description-buttons-container"
            style={{ marginBottom: "1%" }}
          >
            <button
              onClick={() => {
                if (cart.length > 0)
                  window.open(`${url}`, "_blank", "noopener,noreferrer");
              }}
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Cart;
