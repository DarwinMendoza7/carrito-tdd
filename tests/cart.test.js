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