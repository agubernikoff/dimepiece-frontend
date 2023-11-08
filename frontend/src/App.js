// import React, { Suspense, lazy } from 'react';
import React, { Suspense } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import Header from './layouts/Header';
import Homepage from './layouts/Content/Homepage';
import Footer from './layouts/Footer';
import Article from './layouts/Content/Article';
import IndexAndContent from './layouts/Content/IndexAndContent';
import MobileHeader from './components/mobile/MobileHeader';
import Misc from './layouts/Content/Misc';

// const Posts = lazy(() => import('./pages/Posts'));

function App() {
  const isMobile = window.innerWidth <= 768;
  return (
    <Suspense
      fallback={
        <div className={'loader'} data-text="Loading ...">
          Loading ...
        </div>
      }>
      {isMobile ? <MobileHeader /> :<Header />} 
      <Routes>
        <Route path="" element={<Homepage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/stories" element={<IndexAndContent/>}/>
        <Route path="/stories/:category" element={<IndexAndContent/>}/>
        <Route path="/stories/:category/:id" element={<Article/>}/>
        <Route path="/shop" element={<IndexAndContent/>}/>
        <Route path="/shop/:brand" element={<IndexAndContent/>}/>
        <Route path="/shop/:brand/:id" element={<IndexAndContent/>}/>
        <Route path="/shipping_and_returns" element={<Misc title={"SHIPPING AND RETURNS"}/>} />
        <Route path="/faq" element={<Misc title={"FAQ"}/>} />
        <Route path="/terms_and_conditions" element={<Misc title={"TERMS AND CONDITIONS"}/>} />
        <Route path="/warranty" element={<Misc title={"WARRANTY"}/>} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}

export default App;
