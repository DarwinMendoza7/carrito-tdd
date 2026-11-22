import { describe, it, expect } from 'vitest';
import { Cart } from '../src/cart.js';

describe('RF-01: agregar productos', () => {
    it('C01: agrega un producto valido al carrito', () => {
        const cart = new Cart();
        cart.addItem({ id: 1, name: 'Lápiz', price: 2.5, quantity: 3 });
        expect(cart.getItems()).toEqual([
            { id: 1, name: 'Lápiz', price: 2.5, quantity: 3 },
        ]);
    });

    it('C02: acepta precio 0 y cantidad 1', () => {
        const cart = new Cart();
        cart.addItem({ id: 2, name: 'Muestra gratis', price: 0, quantity: 1 });
        expect(cart.getItems()).toHaveLength(1);
    });

    it('C04: rechaza producto sin ID o con nombre vacio', () => {
        const cart = new Cart();
        expect(() => cart.addItem({ name: 'Lápiz', price: 2, quantity: 1 }))
        .toThrow('ID y nombre son obligatorios');
        expect(() => cart.addItem({ id: 1, name: '', price: 2, quantity: 1 }))
        .toThrow('ID y nombre son obligatorios');
    });
});

describe('RF-02: subtotal y total', () => {
    it('C05: calcula el subtotal de varios productos', () => {
        const cart = new Cart();
        cart.addItem({ id: 1, name: 'A', price: 10, quantity: 2 });
        cart.addItem({ id: 2, name: 'B', price: 5.5, quantity: 1 });
        expect(cart.getSubtotal()).toBe(25.5);
    });

    it('C06: carrito vacio tiene subtotal 0 y total 0', () => {
        const cart = new Cart();
        expect(cart.getSubtotal()).toBe(0);
        expect(cart.getTotal()).toBe(0);
    });

    it('C07: precios decimales no producen error de coma flotante', () => {
        const cart = new Cart();
        cart.addItem({ id: 1, name: 'A', price: 0.1, quantity: 3 });
        expect(cart.getSubtotal()).toBe(0.3);
    });
});

describe('RF-03: descuento', () => {
    const cartWith100 = () => {
        const cart = new Cart();
        cart.addItem({ id: 1, name: 'A', price: 100, quantity: 1 });
        return cart;
    };

    it('C08: aplica 10% de descuento sobre 100', () => {
        const cart = cartWith100();
        cart.applyDiscount(10);
        expect(cart.getTotal()).toBe(90);
    });

    it('C09: descuento 0% deja el total igual al subtotal', () => {
        const cart = cartWith100();
        cart.applyDiscount(0);
        expect(cart.getTotal()).toBe(100);
    });

    it('C10: descuento 100% deja el total en 0, nunca negativo', () => {
        const cart = cartWith100();
        cart.applyDiscount(100);
        expect(cart.getTotal()).toBe(0);
    });

    it('C11: rechaza descuentos fuera del rango 0 a 100', () => {
        const cart = cartWith100();
        expect(() => cart.applyDiscount(101)).toThrow('El descuento debe estar entre 0 y 100');
        expect(() => cart.applyDiscount(-5)).toThrow('El descuento debe estar entre 0 y 100');
    });
});

describe('RF-01 (complemento): ID repetido', () => {
    it('C03: al agregar el mismo ID se suman las cantidades en una sola linea', () => {
        const cart = new Cart();
        cart.addItem({ id: 1, name: 'A', price: 10, quantity: 2 });
        cart.addItem({ id: 1, name: 'A', price: 10, quantity: 3 });
        expect(cart.getItems()).toHaveLength(1);
        expect(cart.getItems()[0].quantity).toBe(5);
    });
});

describe('RF-04: actualizar y eliminar', () => {
    const cartWithOne = () => {
        const cart = new Cart();
        cart.addItem({ id: 1, name: 'A', price: 10, quantity: 2 });
        return cart;
    };

    it('C12: actualiza la cantidad y recalcula el subtotal', () => {
        const cart = cartWithOne();
        cart.updateQuantity(1, 5);
        expect(cart.getItems()[0].quantity).toBe(5);
        expect(cart.getSubtotal()).toBe(50);
    });

    it('C13: elimina un producto existente', () => {
        const cart = cartWithOne();
        cart.removeItem(1);
        expect(cart.getItems()).toHaveLength(0);
    });

    it('C14: actualizar o eliminar un ID inexistente lanza error', () => {
        const cart = cartWithOne();
        expect(() => cart.updateQuantity(99, 1)).toThrow('Producto no encontrado');
        expect(() => cart.removeItem(99)).toThrow('Producto no encontrado');
    });

    it('C15: actualizar a cantidad 0 o negativa lanza error', () => {
        const cart = cartWithOne();
        expect(() => cart.updateQuantity(1, 0)).toThrow('La cantidad debe ser un entero positivo');
        expect(() => cart.updateQuantity(1, -1)).toThrow('La cantidad debe ser un entero positivo');
    });
});

describe('RF-05: validaciones con errores claros', () => {
    const add = (item) => new Cart().addItem(item);

    it('C16: rechaza precio negativo', () => {
        expect(() => add({ id: 1, name: 'A', price: -1, quantity: 1 }))
        .toThrow('El precio no puede ser negativo');
    });

    it('C17: rechaza cantidad 0, negativa o decimal', () => {
        for (const quantity of [0, -2, 1.5]) {
            expect(() => add({ id: 1, name: 'A', price: 1, quantity }))
            .toThrow('La cantidad debe ser un entero positivo');
        }
    });

    it('C18: rechaza precio o cantidad no numericos', () => {
        expect(() => add({ id: 1, name: 'A', price: 'abc', quantity: 1 }))
        .toThrow('El precio debe ser un número válido');
        expect(() => add({ id: 1, name: 'A', price: NaN, quantity: 1 }))
        .toThrow('El precio debe ser un número válido');
        expect(() => add({ id: 1, name: 'A', price: 1, quantity: 'abc' }))
        .toThrow('La cantidad debe ser un entero positivo');
    });

    it('C19: rechaza descuento no numerico', () => {
        const cart = new Cart();
        expect(() => cart.applyDiscount('abc')).toThrow('El descuento debe estar entre 0 y 100');
        expect(() => cart.applyDiscount(NaN)).toThrow('El descuento debe estar entre 0 y 100');
    });
});

describe('Fase C: casos negativos adicionales', () => {
    const cartWithOne = () => {
        const cart = new Cart();
        cart.addItem({ id: 1, name: 'A', price: 10, quantity: 2 });
        return cart;
    };

    it('C20: rechaza precio infinito', () => {
        const cart = new Cart();
        expect(() => cart.addItem({ id: 1, name: 'A', price: Infinity, quantity: 1 }))
        .toThrow('El precio debe ser un número válido');
    });

    it('C21: rechaza ID nulo y nombre indefinido', () => {
        const cart = new Cart();
        expect(() => cart.addItem({ id: null, name: 'A', price: 1, quantity: 1 }))
        .toThrow('ID y nombre son obligatorios');
        expect(() => cart.addItem({ id: 1, price: 1, quantity: 1 }))
        .toThrow('ID y nombre son obligatorios');
    });

    it('C22: updateQuantity rechaza cantidad decimal o en texto', () => {
        const cart = cartWithOne();
        expect(() => cart.updateQuantity(1, 1.5)).toThrow('La cantidad debe ser un entero positivo');
        expect(() => cart.updateQuantity(1, '3')).toThrow('La cantidad debe ser un entero positivo');
    });

    it('C23: applyDiscount rechaza null, undefined e infinito', () => {
        const cart = cartWithOne();
        expect(() => cart.applyDiscount(null)).toThrow('El descuento debe estar entre 0 y 100');
        expect(() => cart.applyDiscount(undefined)).toThrow('El descuento debe estar entre 0 y 100');
        expect(() => cart.applyDiscount(Infinity)).toThrow('El descuento debe estar entre 0 y 100');
    });

    it('C24: modificar lo devuelto por getItems no altera el carrito', () => {
        const cart = cartWithOne();
        cart.getItems()[0].quantity = 999;
        expect(cart.getItems()[0].quantity).toBe(2);
        expect(cart.getSubtotal()).toBe(20);
    });
});