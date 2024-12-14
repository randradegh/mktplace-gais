import React, { useState, useEffect } from 'react';

const CarritoCompras = ({ cartItems, setCartItems }) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(consolidatedItems());
    }, [cartItems]);

    const consolidatedItems = () => {
        const itemMap = new Map();
        for (const item of cartItems) {
            if (itemMap.has(item.id)) {
                const existingItem = itemMap.get(item.id);
                itemMap.set(item.id, { ...existingItem, quantity: existingItem.quantity + 1 });
            } else {
                itemMap.set(item.id, { ...item, quantity: 1 });
            }
        }
        return Array.from(itemMap.values());
    }

    const handleIncrement = (id) => {
        setCartItems(prevCartItems => {
          return  prevCartItems.map(item => {
                if(item.id === id){
                   return {...item, quantity: item.quantity + 1 }
                }
               return item
            })
         });
    };

    const handleDecrement = (id) => {
        setCartItems(prevCartItems => {
          return  prevCartItems.map(item => {
            if(item.id === id){
                 const newQuantity = item.quantity - 1;
                 if(newQuantity <= 0){
                    return null;
                 }
                  return {...item, quantity: newQuantity}
            }
             return item
           }).filter(item => item !== null);
          });
    };

    const calculateProductTotal = (item) => {
        return item.price * item.quantity;
    };

    const calculateCartTotal = () => {
        return items.reduce((total, item) => total + calculateProductTotal(item), 0);
    };

    return (
        <div className="bg-gray-50 w-96 p-4 rounded-lg">
            <p className="text-sm mb-2">Usa los botones + y - para ajustar las cantidades</p>
            {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between mb-2">
                    <span>{item.name} - ${item.price} x {item.quantity} = ${calculateProductTotal(item)}</span>
                    <div className="flex items-center">
                        <button onClick={() => handleDecrement(item.id)} className="bg-gray-200 px-2 py-1 rounded">-</button>
                        <span className="mx-2">{item.quantity}</span>
                        <button onClick={() => handleIncrement(item.id)} className="bg-gray-200 px-2 py-1 rounded">+</button>
                    </div>
                </div>
            ))}
            <p className="font-bold mt-4">Total Carrito: ${calculateCartTotal()}</p>
        </div>
    );
};

export default CarritoCompras;