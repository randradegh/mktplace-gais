import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { supabase } from '../utils/supabaseClient';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import CarritoCompras from './CarritoCompras'; // Importa el componente CarritoCompras
import { XMarkIcon } from '@heroicons/react/24/solid';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*');

                if (error) {
                    setError(error);
                    return;
                }
                setProducts(data);
            } catch (e) {
                setError(e.message);
            }
        };
        fetchProducts();
    }, []);

   const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item => {
                  if(item.id === product.id){
                    return { ...item, quantity: item.quantity + 1 };
                  }
                  return item;
                });
            } else {
                return [...prevCart, {...product, quantity: 1}];
            }
        });
    };

    const toggleCartModal = () => {
        setIsCartOpen(!isCartOpen);
    };

     const calculateTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="bg-orange-50 min-h-screen flex flex-col w-full">
            <div className="flex justify-between items-center p-4 bg-red-600 text-white w-full">
                <h1 className="text-xl font-bold">Comida Mexicana</h1>
                <div className="relative">
                    <button className="flex items-center" onClick={toggleCartModal}>
                        <ShoppingCartIcon className="h-6 w-6 mr-1 text-gray-800" />
                        <span className="text-gray-800 font-bold">{calculateTotalItems()}</span>
                    </button>
                </div>
            </div>
            {isCartOpen && (
                <div className="bg-white p-4 rounded-lg fixed top-20 right-4 z-50 max-w-md max-h-[80vh] overflow-y-auto border border-gray-200 shadow-lg"> {/* Modificado para mover y aumentar la altura del carrito */}
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-800">Carrito de compras</h2>
                      <button onClick={toggleCartModal} className="text-gray-600 hover:text-gray-800">
                       <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>
                    <CarritoCompras cartItems={cart} setCartItems={setCart} />
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 flex-grow w-full">
                {products.length === 0 ? <p>No hay productos</p> : (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                    ))
                )}
            </div>
        </div>
    );
}

export default ProductList;