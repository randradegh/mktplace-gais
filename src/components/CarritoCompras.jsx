import React from 'react';

const CarritoCompras = ({ cartItems = [], setCartItems }) => {

    const handleIncrement = (id) => {
         console.log("handleIncrement", id)
        setCartItems(prevCartItems => {
          return prevCartItems.map(item => {
            if(item.id === id){
              return {...item, quantity: item.quantity + 1}
            }
             return item;
          });
        });
    };

    const handleDecrement = (id) => {
       console.log("handleDecrement", id);
        setCartItems(prevCartItems => {
            const itemToUpdate = prevCartItems.find(item => item.id === id);
            if (itemToUpdate) {
              if(itemToUpdate.quantity > 1){
                return prevCartItems.map(item => {
                  if(item.id === id){
                    return {...item, quantity: itemToUpdate.quantity - 1}
                  }
                  return item;
                })
              } else {
                return prevCartItems.filter(item => item.id !== id);
              }
           }
          return prevCartItems;
        });
    };

    const calculateProductTotal = (item) => {
        return item.price * item.quantity;
    };

   const calculateCartTotal = () => {
        const total = cartItems.reduce((total, item) => total + calculateProductTotal(item), 0);
         return total.toFixed(2); // Formatea el total a dos decimales
    };


    return (
        <div className="bg-white w-full p-4 rounded-lg">
            <p className="text-base mb-2 text-gray-700">Usa los botones + y - para ajustar las cantidades</p>
            {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between mb-2">
                   <span className="text-base text-gray-800">{item.name} - <span className="font-bold">${item.price} x {item.quantity} = ${calculateProductTotal(item)}</span></span>
                    <div className="flex items-center">
                        <button onClick={() => handleDecrement(item.id)} className="bg-orange-500 hover:bg-orange-700 text-white px-2 py-1 rounded">-</button>
                        <span className="mx-2 text-base text-gray-700">{item.quantity}</span>
                        <button onClick={() => handleIncrement(item.id)} className="bg-orange-500 hover:bg-orange-700 text-white px-2 py-1 rounded">+</button>
                    </div>
                </div>
            ))}
            <p className="font-bold mt-4 text-base text-gray-800">Total Carrito: <span className="text-red-600">${calculateCartTotal()}</span></p>
        </div>
    );
};

export default CarritoCompras;