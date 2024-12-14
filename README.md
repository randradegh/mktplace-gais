# Marketplace de Comida Mexicana Local

## Descripción General

Este proyecto es una webapp diseñada para conectar a pequeños negocios de comida mexicana en la Ciudad de México con sus clientes. La plataforma permitirá a los usuarios visualizar los menús, personalizar sus pedidos y realizar compras para entrega a domicilio, con pago en efectivo al recibir los productos.

## Público Objetivo

*   **Vendedores:** Pequeños negocios locales de comida mexicana (quesadillas, tostadas, gorditas, tacos, etc.) en la Ciudad de México.
*   **Compradores:** Clientes que buscan opciones de comida mexicana a domicilio en la Ciudad de México.

## Funcionalidades Principales (Versión 1)

### Lado del Cliente

*   **Visualización del Menú:** Los clientes podrán explorar los menús de los diferentes negocios.
*   **Selección de Productos:** Capacidad de elegir la cantidad de cada producto y personalizar los ingredientes (salsa picante, salsa, queso, etc.).
*   **Carrito de Compras:** Los productos seleccionados se agregarán a un carrito de compras.
*   **Visualización del Total:** El cliente podrá ver el total de su pedido antes de finalizar la compra.
*   **Registro de Clientes:** Los clientes podrán registrarse proporcionando su nombre completo, dirección, teléfono y señas de la localización para la entrega.

### Lado del Negocio

*   **Módulo de Pedidos:** Los negocios podrán visualizar los pedidos entrantes para que los cocineros preparen los alimentos.
*   **Módulo de Envíos:** Los negocios podrán gestionar el envío de los pedidos.
*   **Módulo de Cobro:** El negocio tendrá un registro para controlar los cobros realizados en efectivo en la entrega de los productos.

## Tecnologías Utilizadas

*   **Frontend:** React, Vite, Tailwind CSS
*   **Backend:** Supabase (base de datos existente)

## Limitaciones (Versión 1)

*   **Pagos:** En esta primera versión, los pagos se realizarán exclusivamente en efectivo al momento de la entrega. No se implementará un módulo de pago en línea.

## Próximos Pasos

1.  **Diseño de la base de datos en Supabase:** Definición de las tablas y relaciones necesarias.
2.  **Implementación del frontend con React:** Desarrollo de componentes para el listado de productos, el carrito de compras, el formulario de registro de clientes, etc.
3.  **Integración del frontend con la base de datos de Supabase:** Conexión y manipulación de datos.
4.  **Implementación de los módulos del lado del negocio:** Desarrollo de la gestión de pedidos, envíos y cobros.
5.  **Pruebas:** Pruebas exhaustivas para asegurar la estabilidad y el funcionamiento de la aplicación.

## Contribuciones

Si deseas contribuir a este proyecto, por favor sigue las siguientes pautas:

1.  Haz un fork de este repositorio.
2.  Crea una rama para tu funcionalidad.
3.  Realiza tus cambios y crea un pull request.

## Licencia

[Aquí irá la licencia del proyecto]