// import React, { Suspense, lazy } from 'react';
import React, { Suspense } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import Header from './layouts/Header';

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
        <Route path="/" element={<PageNotFound />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
