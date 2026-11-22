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