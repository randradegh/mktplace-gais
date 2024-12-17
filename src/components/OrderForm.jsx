import React, { useState, useContext, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { CartContext } from './CartContext';
import { v4 as uuidv4 } from 'uuid';

function OrderForm({ onClose }) {
    const { cart, clearCart } = useContext(CartContext);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const userId = 'a5516a2f-f6e9-4717-9c69-b1b87dc197c6'; // ID del cliente

     useEffect(() => {
        const fetchUserAddress = async () => {
            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('address')
                    .eq('id', userId)
                    .single();

                if (error) {
                    setError('Error al obtener la dirección del usuario: ' + error.message);
                    return;
                }

                if(data && data.address){
                     setDeliveryAddress(data.address);
                } else {
                      setError('No se encontró la dirección del usuario.');
                }


            } catch (e) {
                setError('Error al obtener la dirección del usuario: ' + e.message);
            }
        };

        fetchUserAddress();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        const orderId = uuidv4();

        try {
            const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

            const { error: orderError } = await supabase
                .from('orders')
                .insert([
                    {
                        id: orderId,
                        customer_id: userId,
                        total_amount: totalAmount,
                        status: 'pendiente',
                        delivery_address: deliveryAddress,
                    },
                ]);

            if (orderError) {
                setError('Error al crear la orden: ' + orderError.message);
                return;
            }

            const orderItems = cart.map(item => ({
                id: uuidv4(),
                order_id: orderId,
                product_id: item.id,
                quantity: item.quantity,
                unit_price: item.price,
                subtotal: item.price * item.quantity,
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) {
                 setError('Error al crear los items de la orden: ' + itemsError.message);
                return;
            }

            setSuccess(true);
            clearCart();
            onClose();

        } catch (e) {
            setError('Error al crear la orden: ' + e.message);
        }
    };

    return (
         <div className="bg-white p-4 rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-md w-full border border-gray-200 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Finalizar Compra</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-500 mb-2">¡Orden creada con éxito!</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Dirección de entrega
                    </label>
                  {deliveryAddress ? (
                        <p className='text-gray-800'>{deliveryAddress}</p>
                    ) : (
                        <p className='text-gray-800'>Cargando dirección...</p>
                  )}

                </div>

                 <div className="flex justify-end">
                    <button
                        type="button"
                         onClick={onClose}
                         className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                        Cancelar
                    </button>
                     <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Crear Orden
                    </button>
                 </div>
            </form>
        </div>
    );
}

export default OrderForm;