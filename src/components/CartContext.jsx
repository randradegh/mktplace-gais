import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

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

    const removeFromCart = (productId) => {
       setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };


     const updateQuantity = (productId, quantity) => {
        setCart(prevCart => prevCart.map(item => {
            if(item.id === productId){
                return {...item, quantity: quantity};
            }
            return item;
        }));
     };

    const clearCart = () => {
        setCart([]);
    };

    const cartContextValue = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
};