import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { ShoppingBagIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline'; // Importamos íconos

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const userId = 'a5516a2f-f6e9-4717-9c69-b1b87dc197c6'; // ID del cliente

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data, error } = await supabase
                    .from('orders')
                  .select('*, order_items(*, products(name,price,image_url)), users!orders_customer_id_fkey(full_name, address)')
                    .eq('customer_id', userId);


                if (error) {
                    setError('Error al obtener las órdenes: ' + error.message);
                    return;
                }
                console.log('data', data);
                setOrders(data);

            } catch (e) {
                setError('Error al obtener las órdenes: ' + e.message);
            }
        };

        fetchOrders();
    }, [userId]);

    if (error) {
        return <p className="text-red-500">Error al obtener las órdenes: {error}</p>;
    }

    return (
        <div className="bg-cyan-800 container mx-auto py-8">
            <header className="ml-8 mb-6">
                <h2 className="text-3xl font-bold text-gray-50 mb-2 flex items-center">
                  <ShoppingBagIcon className='h-8 w-8 mr-2'/>
                 Mis Órdenes
                </h2>
                <p className="text-gray-50">Aquí puedes ver el detalle de tus órdenes.</p>
            </header>
             {orders.length === 0 ? <p>No tienes órdenes</p> : (
               <ul>
                {orders.map((order) => (
                     <li key={order.id} className="ml-4 mr-4 bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4">
                         <div className="flex items-center mb-2">
                               <h3 className="font-bold text-lg mr-2">Orden #{order.id}</h3>
                               <TagIcon className='h-5 w-5'/>
                         </div>
                         <div className='bg-blue-100 p-4 rounded-lg'>
                         <div className='flex items-center mb-1'>
                            <UserIcon className='h-5 w-5 mr-1'/>
                            <p className="font-bold">Cliente: <span className="italic">{order.users.full_name}</span></p>
                        </div>
                        <div>
                            <p className="mb-1 ml-6 font-bold">Dirección: <span className="italic">{order.users.address}</span></p>
                            <p className="text-gray-700 mb-1 ml-6 font-bold">Estado: <span className="italic">{order.status}</span></p>
                        </div>
                        </div>
                         <p className="text-gray-800 font-semibold mt-2">Total: ${order.total_amount}</p>
                           <h4 className='font-semibold mt-2 mb-1'>Productos:</h4>
                           <ul>
                             {order.order_items.map((item) => (
                                 <li key={item.id} className="border-b border-gray-200 py-2 flex justify-between items-center">
                                     <div className='flex items-center'>
                                         <img src={item.products.image_url} alt={item.products.name} className="w-12 h-12 object-cover rounded mr-4" />
                                        <div>
                                            <p className='font-semibold'>{item.products.name}</p>
                                            <p>Cantidad: {item.quantity} - Precio: ${item.products.price}</p>
                                        </div>
                                    </div>
                                 
                                   
                                 </li>
                             ))}
                           </ul>
                       </li>
                  ))}
                </ul>
           )}
        </div>
    );
}

export default OrderList;