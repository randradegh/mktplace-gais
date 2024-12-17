import React, { useState } from 'react';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';
import { ComputerDesktopIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/solid';

function Home() {
  const [isMobileView, setIsMobileView] = useState(false);

  const toggleView = () => {
    setIsMobileView(!isMobileView);
  };

  return (
    <Layout>
      <div className={`mx-auto py-8 w-full ${isMobileView ? 'max-w-sm' : ''}`}>
         <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Nuestros Productos</h1>
           <button onClick={toggleView} >
              {isMobileView ? (
                  <ComputerDesktopIcon className="h-6 w-6 text-gray-800" />
              ) : (
                <DevicePhoneMobileIcon className="h-6 w-6 text-gray-800" />
              )}
            </button>
          </div>
        <ProductList isMobileView={isMobileView} />
      </div>
    </Layout>
  );
}

export default Home;