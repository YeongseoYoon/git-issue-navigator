import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Layout from './components/Layout';
import { ErrorBoundary } from './components';

function App() {
  return (
    <Layout>
      <Header />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </Layout>
  );
}

export default App;
