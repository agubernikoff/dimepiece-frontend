import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import { AnimatePresence, motion } from "framer-motion";
import CartProductCards from "./CartProductCards";

function Cart() {
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
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
      transition={{ duration: 1, ease: "backInOut" }}
      key="cart"
      className="cart-pop-up"
    >
      <button
        className="close-cart-btn"
        onClick={() => dispatch(cartActions.hideCart())}
      >
        X
      </button>
      <h2>CART</h2>
      <div className="cart-product-cards-container">{productCards}</div>
      <motion.p
        layout="position"
        className="cart-total"
      >{`TOTAL: ${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(total)}`}</motion.p>
      <motion.div
        layout="position"
        className="watch-description-buttons-container"
      >
        <button
          onClick={() => window.open(`${url}`, "_blank", "noopener,noreferrer")}
        >
          CHECK OUT
        </button>
      </motion.div>
    </motion.div>
  );
}

export default Cart;
