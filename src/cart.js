import { validateItem, validateQuantity, validateDiscount } from './validators.js';

const PERCENT_BASE = 100;

function roundToCents(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

function lineTotal({ price, quantity }) {
    return price * quantity;
}

function calculateTotal(subtotal, discountPercent) {
    const discountFactor = 1 - discountPercent / PERCENT_BASE;
    return roundToCents(subtotal * discountFactor);
}

export class Cart {
    #items = [];
    #discount = 0;

    #findIndex(id) {
        return this.#items.findIndex((item) => item.id === id);
    }

    #requireIndex(id) {
        const index = this.#findIndex(id);
        if (index === -1) {
            throw new Error('Producto no encontrado');
        }
        return index;
    }

    #setQuantity(index, quantity) {
        this.#items[index] = { ...this.#items[index], quantity };
    }

    addItem(item) {
        validateItem(item);
        const { id, name, price, quantity } = item;
        const index = this.#findIndex(id);

        if (index === -1) {
            this.#items.push({ id, name, price, quantity });
        } else {
            this.#setQuantity(index, this.#items[index].quantity + quantity);
        }
    }

    updateQuantity(id, quantity) {
        const index = this.#requireIndex(id);
        validateQuantity(quantity);
        this.#setQuantity(index, quantity);
    }

    removeItem(id) {
        const index = this.#requireIndex(id);
        this.#items.splice(index, 1);
    }

    getItems() {
        return this.#items.map((item) => ({ ...item }));
    }

    getSubtotal() {
        const subtotal = this.#items.reduce((sum, item) => sum + lineTotal(item), 0);
        return roundToCents(subtotal);
    }

    applyDiscount(percent) {
        validateDiscount(percent);
        this.#discount = percent;
    }

    getTotal() {
        return calculateTotal(this.getSubtotal(), this.#discount);
    }
}