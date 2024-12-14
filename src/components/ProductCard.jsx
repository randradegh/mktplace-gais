import React from 'react';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 m-2 w-80 flex flex-col">
      <img src={product.image_url} alt={product.name} className="w-full h-52 object-cover rounded-t-lg mb-2" />
      <div className="px-2">
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-gray-700 text-sm mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
            <span className="text-green-500 font-bold text-base">${product.price}</span>
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