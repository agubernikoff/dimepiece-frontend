// import React, { Suspense, lazy } from 'react';
import React, { useEffect,Suspense } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import Header from './layouts/Header';
import Homepage from './layouts/Content/Homepage';
import {client} from './sanity/SanityClient';

// const Posts = lazy(() => import('./pages/Posts'));

function App() {
useEffect(() =>{client.fetch(`*[_type == "product"]`).then((response) =>console.log(response))});
  return (
    <Suspense
      fallback={
        <div className={'loader'} data-text="Loading ...">
          Loading ...
        </div>
      }>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
