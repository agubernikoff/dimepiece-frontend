// import React, { Suspense, lazy } from 'react';
import React, { Suspense, useEffect, useRef } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { scrollToTop } from "./helpers/ScrollToTop";
import { mobileFilterActions } from "./redux/mobile-filter-slice";
import SearchResults from "./layouts/Content/SearchResults";
import MobileSearchResults from "./components/mobile/MobileSearchResults";
import Index from "./layouts/Content/Index";
import FetchAndSet from "./layouts/Content/FetchAndSet";
import { useState } from "react";
import Firebase from "./firebase/Firebase";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window
      .matchMedia("(max-width:700px)")
      .addEventListener("change", (e) => setIsMobile(e.matches));
    if (window.matchMedia("(max-width:700px)").matches) setIsMobile(true);
  }, []);

  const contentWrapper = useRef();
  const dispatch = useDispatch();

  const displayCart = useSelector((state) => state.cart.displayCart);

  const location = useLocation();

  const [displayIndex, setDisplayIndex] = useState(false);

  function hideIndex() {
    if (displayIndex) setDisplayIndex(false);
  }
  function toggleDisplayIndex() {
    if (!isMobile && location.pathname.includes("shop")) {
      setDisplayIndex("shop");
    } else if (
      !isMobile &&
      location.pathname.includes("stories") &&
      location.pathname.split("/").length < 4
    ) {
      setDisplayIndex("stories");
    } else {
      setDisplayIndex(false);
    }
  }
  useEffect(() => {
    if (!isMobile) {
      if (location.pathname.includes("shop")) {
        setDisplayIndex("shop");
      } else if (
        location.pathname.includes("stories") &&
        location.pathname.split("/").length < 4
      ) {
        setDisplayIndex("stories");
      }
    } else {
      setDisplayIndex(false);
    }
  }, [isMobile]);

  return (
    <Suspense
      fallback={
        <div className={"loader"} data-text="Loading ...">
          Loading ...
        </div>
      }
    >
      <Firebase />
      <FetchAndSet />
      {isMobile ? <MobileHeader /> : <Header />}
      <AnimatePresence>
        {displayCart && <Cart isMobile={isMobile} />}
      </AnimatePresence>
      <div
        ref={contentWrapper}
        style={{ minHeight: "calc(100vh - 54px)" }}
        className={displayIndex ? "stories-page" : ""}
      >
        {displayIndex ? (
          <AnimatePresence mode="wait">
            <Index displayIndex={displayIndex} hideIndex={hideIndex} />
          </AnimatePresence>
        ) : null}
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            scrollToTop();
            if (isMobile)
              dispatch(mobileFilterActions.setIsDialogueOpen(false));
            toggleDisplayIndex();
          }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="" element={isMobile ? <MobileHome /> : <Homepage />} />
            <Route
              path="/"
              element={isMobile ? <MobileHome /> : <Homepage />}
            />
            <Route
              path="/newsletter"
              element={isMobile ? <MobileNewsletter /> : <NewsletterPage />}
            />
            <Route path="/stories" element={<Navigate to="/stories/All" />} />
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
              element={<Navigate to="/shop/All?filter+by=Latest+Arrivals" />}
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
              element={<Misc title={"SHIPPING & RETURNS"} />}
            />
            <Route path="/faq" element={<Misc title={"FAQ"} />} />
            <Route
              path="/terms_and_conditions"
              element={<Misc title={"TERMS & CONDITIONS"} />}
            />
            <Route path="/warranty" element={<Misc title={"WARRANTY"} />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </AnimatePresence>
      </div>
      {isMobile ? <MobileFooter /> : <Footer />}
    </Suspense>
  );
}

export default App;
