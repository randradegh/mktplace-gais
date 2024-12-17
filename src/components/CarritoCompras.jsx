import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import OrderForm from './OrderForm';

function CarritoCompras() { // Elimina las props cartItems y setCartItems
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, e) => {
    const quantity = parseInt(e.target.value, 10);
    if(quantity > 0){
       updateQuantity(productId, quantity);
    }
  };
  
   const toggleOrderForm = () => {
    setIsOrderFormOpen(!isOrderFormOpen);
  };
   const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div>
        {cart.length === 0 ? <p>No hay productos en el carrito</p> : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex items-center justify-between py-2 border-b border-gray-200">
                <div className='flex items-center'>
                     <img src={item.image_url} alt={item.name} className="w-12 h-12 object-cover rounded mr-4" />
                    <div>
                        <h3 className="font-semibold">{item.name}</h3>
                       <p className="text-gray-600 text-sm">
                        Precio: ${item.price}
                       </p>
                    </div>
                </div>
              <div className='flex items-center'>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center mr-2"
                    />
                 <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                        Eliminar
                    </button>
                </div>
             
            </li>
          ))}
        </ul>
       )}
         <div className="flex justify-between mt-4 items-center">
             <p className='font-bold text-xl'>Total: ${calculateTotal()}</p>
             <button
               onClick={toggleOrderForm}
               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
               Finalizar Compra
             </button>
        </div>
         {isOrderFormOpen && <OrderForm onClose={toggleOrderForm} />}
    </div>
  );
}

export default CarritoCompras;