// import React, { Suspense, lazy } from 'react';
import React, { Suspense } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import Header from './layouts/Header';
import Homepage from './layouts/Content/Homepage';
import Footer from './layouts/Footer';
import Stories from './layouts/Content/Stories';
import Article from './layouts/Content/Article';
import Watches from './layouts/Content/Watches';

// const Posts = lazy(() => import('./pages/Posts'));

function App() {
  return (
    <Suspense
      fallback={
        <div className={'loader'} data-text="Loading ...">
          Loading ...
        </div>
      }>
      <Header />
      <Routes>
        <Route path="" element={<Homepage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/stories" element={<Stories/>}/>
        <Route path="/stories/:category" element={<Stories/>}/>
        <Route path="/stories/:category/:id" element={<Article/>}/>
        <Route path="/shop" element={<Watches/>}/>
        <Route path="/shop/:brand" element={<Watches/>}/>
        <Route path="/shop/:brand/:id" element={<Watches/>}/>
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}

export default App;
