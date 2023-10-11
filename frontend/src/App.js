import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import Header from './layouts/Header';

const Posts = lazy(() => import('./pages/Posts'));

function App() {
  return (
    <Suspense
      fallback={
        <div className={'loader'} data-text="Loading ...">
          Loading ...
        </div>
      }>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/post-manager-tool" element={<Posts />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
