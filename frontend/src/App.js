// import React, { Suspense, lazy } from 'react';
import React, { Suspense, useEffect } from "react";
import "./App.css";
import "./App-mobile.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Header from "./layouts/Header";
import Homepage from "./layouts/Content/Homepage";
import Footer from "./layouts/Footer";
import Article from "./layouts/Content/Article";
import IndexAndContent from "./layouts/Content/IndexAndContent";
import MobileHeader from "./components/mobile/MobileHeader";
import Misc from "./layouts/Content/Misc";
import NewsletterPage from "./layouts/Content/NewsletterPage";
import About from "./layouts/Content/About";
import Cart from "./layouts/Content/Cart";
import MobileHome from "./components/mobile/MobileHome";
import MobileFooter from "./components/mobile/MobileFooter";
import MobileIndexAndContent from "./components/mobile/MobileIndexAndContent";
import MobileWatchPage from "./components/mobile/MobileWatchPage";
import MobileStoryPage from "./components/mobile/MobileStoryPage";
import MobileAboutPage from "./components/mobile/MobileAboutPage";
import MobileNewsletter from "./components/mobile/MobileNewsletter";
import { shopifyClient } from "./shopify/ShopifyClient";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "./redux/cart-slice";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToTop } from "./helpers/ScrollToTop";
import { mobileFilterActions } from "./redux/mobile-filter-slice";
import { client } from "./sanity/SanityClient";
import SearchResults from "./layouts/Content/SearchResults";
import MobileSearchResults from "./components/mobile/MobileSearchResults";

// const Posts = lazy(() => import('./pages/Posts'));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    shopifyClient.checkout.create().then((checkout) => {
      dispatch(cartActions.setCheckoutId(checkout.id));
      dispatch(cartActions.setCheckoutTotal(checkout.subtotalPrice.amount));
      dispatch(cartActions.setCheckoutUrl(checkout.webUrl));
    });
    client
      .fetch(
        `*[_type == "product" && store.variants[0]._ref in *[_type == "productVariant" && store.inventory.isAvailable]._id]`
      )
      .then((response) => {
        dispatch(cartActions.setWatches(response));
      });
  }, []);
  const displayCart = useSelector((state) => state.cart.displayCart);
  const isMobile = window.innerWidth <= 768;
  const location = useLocation();
  return (
    <Suspense
      fallback={
        <div className={"loader"} data-text="Loading ...">
          Loading ...
        </div>
      }
    >
      {isMobile ? <MobileHeader /> : <Header />}
      <AnimatePresence>
        {displayCart && <Cart isMobile={isMobile} />}
      </AnimatePresence>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          scrollToTop();
          if (isMobile) dispatch(mobileFilterActions.setIsDialogueOpen(false));
        }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="" element={isMobile ? <MobileHome /> : <Homepage />} />
          <Route path="/" element={isMobile ? <MobileHome /> : <Homepage />} />
          <Route
            path="/newsletter"
            element={isMobile ? <MobileNewsletter /> : <NewsletterPage />}
          />
          <Route
            path="/stories"
            element={
              isMobile ? (
                <MobileIndexAndContent contentType={"stories"} />
              ) : (
                <IndexAndContent contentType={"stories"} />
              )
            }
          />
          <Route
            path="/stories/:category"
            element={
              isMobile ? (
                <MobileIndexAndContent contentType={"stories"} />
              ) : (
                <IndexAndContent contentType={"stories"} />
              )
            }
          />
          <Route
            path="/stories/:category/:id"
            element={isMobile ? <MobileStoryPage /> : <Article />}
          />
          <Route
            path="/shop"
            element={
              isMobile ? (
                <MobileIndexAndContent contentType={"shop"} />
              ) : (
                <IndexAndContent contentType={"shop"} />
              )
            }
          />
          <Route
            path="/shop/:brand"
            element={
              isMobile ? (
                <MobileIndexAndContent contentType={"shop"} />
              ) : (
                <IndexAndContent contentType={"shop"} />
              )
            }
          />
          <Route
            path="/shop/:brand/:id"
            element={
              isMobile ? (
                <MobileWatchPage />
              ) : (
                <IndexAndContent contentType={"shop"} />
              )
            }
          />
          <Route
            path="/search"
            element={isMobile ? <MobileSearchResults /> : <SearchResults />}
          />
          <Route
            path="/about"
            element={isMobile ? <MobileAboutPage /> : <About />}
          />
          <Route
            path="/shipping_and_returns"
            element={<Misc title={"SHIPPING AND RETURNS"} />}
          />
          <Route path="/faq" element={<Misc title={"FAQ"} />} />
          <Route
            path="/terms_and_conditions"
            element={<Misc title={"TERMS AND CONDITIONS"} />}
          />
          <Route path="/warranty" element={<Misc title={"WARRANTY"} />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </AnimatePresence>
      {isMobile ? <MobileFooter /> : <Footer />}
    </Suspense>
  );
}

export default App;
