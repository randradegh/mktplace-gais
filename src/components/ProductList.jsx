import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard';
import { supabase } from '../utils/supabaseClient';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import CarritoCompras from './CarritoCompras';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { CartContext } from './CartContext';


function ProductList({ isMobileView }) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
      const { cart } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*, categories(name)')
                     .order('name', { foreignTable: 'categories' });

                if (error) {
                    setError(error);
                    return;
                }
                 const productsWithCategoryName = data.map(product => ({
                        ...product,
                        category: product.categories.name
                    }));
                setProducts(productsWithCategoryName);
                 setFilteredProducts(productsWithCategoryName);
            } catch (e) {
                setError(e.message);
            }
        };

          const fetchCategories = async () => {
            try {
                 const { data, error } = await supabase
                    .from('categories')
                    .select('name')

                    if (error) {
                        setError(error);
                        return;
                    }

                const uniqueCategories = data.map(item => item.name);
                 setCategories(['all', ...uniqueCategories]);
            } catch (e) {
                setError(e.message);
            }
          };


        fetchProducts();
        fetchCategories();
    }, []);

   useEffect(() => {
    if(selectedCategory === 'all'){
        setFilteredProducts(products);
    } else {
         setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
   }, [selectedCategory, products]);


    const toggleCartModal = () => {
        setIsCartOpen(!isCartOpen);
    };


     const calculateTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="bg-orange-50 min-h-screen flex flex-col w-full">
            <div className="flex justify-between items-center p-4 bg-red-600 text-white w-full">
                <h1 className="text-xl font-bold">Comida Mexicana</h1>
                <div className="relative flex items-center">
                    <button className="flex items-center" onClick={toggleCartModal}>
                        <ShoppingCartIcon className="h-6 w-6 mr-1 text-gray-800" />
                        <span className="text-gray-800 font-bold">{calculateTotalItems()}</span>
                    </button>
                     <select
                        className="ml-4 px-2 py-1 rounded text-gray-800"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category === 'all' ? 'Todos' : category}
                          </option>
                        ))}
                      </select>
                </div>
            </div>
            {isCartOpen && (
                <div className="bg-white p-4 rounded-lg fixed top-20 right-4 z-50 max-w-md max-h-[80vh] overflow-y-auto border border-gray-200 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-800">Carrito de compras</h2>
                      <button onClick={toggleCartModal} className="text-gray-600 hover:text-gray-800">
                       <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>
                    <CarritoCompras />
                </div>
            )}
            <div className={`grid ${isMobileView ? 'grid-cols-1' : 'grid-cols-3'} grid-auto-rows-[min-content] gap-4 p-4 flex-grow w-full`}>
                {filteredProducts.length === 0 ? <p>No hay productos</p> : (
                    filteredProducts.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product}  />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ProductList;