# Casos de prueba - Carrito de compras

## Decisiones de diseño  

- `Cart` es una clase con `addItem`, `updateQuantity`, `removeItem`, `getSubtotal`, `applyDiscount` y `getTotal`.  
- La cantidad debe ser un entero mayor que 0.  
- El precio debe ser un número mayor o igual que 0 (el 0 se permite).
- El descuento va de 0 a 100. ambos incluidos.  
- Total = subtotal * (1 - descuento/100), redondeado a 2 decimales.  
- Todos los errores son `Error` con un mensaje claro.

## Tabla de casos

| ID | Req. | Tipo | Caso | Resultado esperado |  
|----|------|------|------|--------------------|
| C01 | RF-01 | Normal | Agregar `{id:1, name:"Lápiz", price:2.5, quantity:3}` |  El carrito contiene 1 producto con esos datos |
| C02 | RF-01 | Borde | Agregar producto con cantidad 1 y precio 0 | Se acepta |
| C03 | RF-01 | Borde | Agregar dos veces el mismo ID | Una sola línea con las cantidades sumadas | 
| C04 | RF-01 | Inválido | Falta ID o nombre vacío | Error: "ID y nombre son obligatorios" |
| C05 | RF-02 | Normal | 2 * 10 y 1 * 5.50 | Subtotal 25.50 |
| C06 | RF-02 | Borde | Carrito vacío | Subtotal 0 y total 0 |
| C07 | RF-02 | Borde | Precios decimales (0.1 * 3) | Subtotal 0.3, sin error de coma flotante | 
| C08 | RF-03 | Normal | Subtotal 100 con 10% | Total 90 |
| C09 | RF-03 | Borde | Descuento 0% | Total igual al subtotal |
| C10 | RF-03 | Borde | Descuento 100 % | Total 0, nunca negativo |
| C11 | RF-03 | Inválido | Descuento 101 o -5 | Error: "El descuento debe estar entre 0 y 100" |
| C12 | RF-04 | Normal | Actualizar cantidad de un producto de 2 a 5 | Cantidad 5 y subtotal recalculado |
| C13 | RF-04 | Normal |  Eliminar un producto existente |  Ya no está en el carrito |
| C14 | RF-04 | Borde | Actualizar o eliminar un ID inexistente | Error: "Producto no encontrado" |
| C15 | RF-04 | Inválido | Actualizar cantidad a 0 o -1 | Error: "La cantidad debe ser un entero positivo" |
| C16 | RF-05 | Inválido | Precio negativo (-1) | Error: "El precio no puede ser negativo" |
| C17 | RF-05 | Inválido | Cantidad 0, negativa o decimal (1.5) | Error: "La cantidad debe ser un entero positivo" |
| C18 | RF-05 | Inválido | Precio o cantidad no numéricos (`"abc"`, `Nan`) | Error con mensaje claro | 
| C19 | RF-05 | Inválido | Descuento fuera de rango o no numérico | Error: "El descuento debe estar entre 0 y 100" | 