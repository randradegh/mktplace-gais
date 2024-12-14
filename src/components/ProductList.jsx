import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { supabase } from '../utils/supabaseClient';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import CarritoCompras from './CarritoCompras'; // Importa el componente CarritoCompras

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
        setCart(prevCart => [...prevCart, {...product, quantity: 1}]);
    };

    const toggleCartModal = () => {
        setIsCartOpen(!isCartOpen);
    };

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <div className="flex justify-between items-center p-4">
                <div></div>
                <div className="relative">
                    <button className="flex items-center" onClick={toggleCartModal}>
                        <ShoppingCartIcon className="h-6 w-6 mr-1" />
                        <span className="text-gray-700 font-bold">{cart.length}</span>
                    </button>
                </div>
            </div>
            {isCartOpen && (
                <div className="bg-gray-100 p-4 rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-lg max-h-96 overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-2">Carrito de compras</h2>
                    <CarritoCompras cartItems={cart} setCartItems={setCart} />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                        onClick={toggleCartModal}
                    >
                        Cerrar Carrito
                    </button>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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