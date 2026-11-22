const MIN_DISCOUNT = 0;
const MAX_DISCOUNT = 100;

function validateIdAndName(id, name) {
    if (id === undefined || id === null || !name) {
        throw new Error('ID y nombre son obligatorios');
    }
}

function validateDiscount(percent) {
    if (percent < MIN_DISCOUNT || percent > MAX_DISCOUNT) {
        throw new Error('El descuento debe estar entre 0 y 100');
    }
}

function roundToCents(value) {
     return Math.round((value + Number.EPSILON) * 100) / 100;
}

function lineTotal({ price, quantity }) {
     return price * quantity;
}

export class Cart {
    #items = [];
    #discount = 0;

    addItem({ id, name, price, quantity }) {
        validateIdAndName(id, name);
        this.#items.push({ id, name, price, quantity });
    }

    getItems() {
        return [...this.#items];
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
        return roundToCents(this.getSubtotal() * (1 - this.#discount / 100));
    }
}