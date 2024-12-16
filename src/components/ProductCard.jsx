import React from 'react';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 m-2 w-96 flex flex-col">
      <img src={product.image_url} alt={product.name} className="w-full h-60 object-cover rounded-t-lg mb-4" />
      <div className="px-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-700 text-base mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
            <span className="text-green-500 font-bold text-lg">${product.price}</span>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
              onClick={() => onAddToCart(product)}
            >
              Añadir
            </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;