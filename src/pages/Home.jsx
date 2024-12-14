import React from 'react';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';

function Home() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Nuestros Productos</h1>
        <ProductList />
      </div>
    </Layout>
  );
}

export default Home;