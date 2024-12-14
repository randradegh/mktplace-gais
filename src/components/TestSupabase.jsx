import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

function TestSupabase() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => { // Corregido aquí: fetchProductos
            try {
              const { data, error } = await supabase
                .from('products')
                .select('*');

              if (error) {
                setError(error);
                return;
              }

              setProducts(data);
            } catch(e) {
                setError(e.message);
            }
        };
        
        fetchProducts(); // Corregido aquí: fetchProductos
    }, []);

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <div>
            <h2>Productos</h2>
            {products.length === 0 ? <p>No hay productos</p> : (
                <ul>
                    {products.map(product => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TestSupabase;