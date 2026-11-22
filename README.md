# Carrito de compras con TDD

Módulo de carrito de compras en JavaScript desarrollado con Desarrollo Dirigido por Pruebas (TDD), Vitest y GitHub Actions. Proyecto de la Unidad 3 de Verificación y Validación de Software.  

## Requisitos funcionales  

- **RF-01:** agregar productos con ID, nombre, precio y cantidad positiva.
- **RF-02:** calcular total y subtotal.
- **RF-03:** aplicar descuento válido de 0 a 100 % sin totales negativos.
- **RF-04:** actualizar cantidades y eliminar productos.
- **RF-05:** rechazar precios negativos, cantidades inválidas y descuentos fuera de rango con errores claros.

## Requisitos previos  

- [Node.js](https://nodejs.org/) 20 o superior.  
- [Git](https://git-scm.com/).

Para comprobar las versiones instaladas:  

```bash
node --version
git --version
```

## Instalación y reproducción desde cero  

```bash
git clone https://github.com/DarwinMendoza7/carrito-tdd.git
cd carrito-tdd
npm install
```

## Ejecutar las pruebas  

```bash
npm test
```

**Resultado esperado:** 24 pruebas aprobadas.  

## Medir la cobertura   


```bash
npm run coverage
```

Resultado esperado: 100 % en sentencias, ramas, funciones y líneas. El reporte HTML se genera en la carpeta `coverage/` (no se sube al repositorio).

## Estructura del proyecto

```
carrito-tdd/
├── .github/workflows/ci.yml   Workflow de integración continua
├── docs/
│   ├── casos-de-prueba.md     Diseño y tabla de casos (Fase A)
│   └── evidencia/             Salidas de pruebas de cada ciclo TDD
├── src/
│   ├── cart.js                Clase Cart
│   └── validators.js          Funciones de validación
├── tests/cart.test.js         Pruebas con Vitest
├── vitest.config.js           Configuración de cobertura
└── package.json
```

## Uso del módulo

```javascript
import { Cart } from './src/cart.js';

const cart = new Cart();
cart.addItem({ id: 1, name: 'Lápiz', price: 2.5, quantity: 3 });
cart.updateQuantity(1, 5);
cart.applyDiscount(10);

cart.getSubtotal(); // 12.5
cart.getTotal();    // 11.25
```

## Ciclos TDD

El historial de commits muestra la secuencia RED, GREEN y REFACTOR de cada ciclo:

| Ciclo | Requisitos | Resumen |
|---|---|---|
| 1 | RF-01 | Agregar productos |
| 2 | RF-02, RF-03 | Subtotal, total y descuento (incluye corrección de coma flotante) |
| 3 | RF-04, RF-05 | Actualizar, eliminar y validaciones |

Después se amplió la batería con casos negativos adicionales (Fase C) y se refactorizó `getTotal`. Las salidas de cada ejecución están en `docs/evidencia/`.

## Integración continua

El workflow `.github/workflows/ci.yml` se ejecuta en cada `push` y `pull_request` hacia `main`: instala dependencias con `npm ci`, ejecuta `npm test` y mide la cobertura con `npm run coverage`.

## Autor

Darwin Mendoza
