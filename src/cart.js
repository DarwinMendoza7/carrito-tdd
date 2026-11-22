function validateIdAndName(id, name) {
    if (id === undefined || id === null || !name) {
        throw new Error('ID y nombre son obligatorios');
    }
}

function roundToCents(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
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
        const subtotal = this.#items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        return roundToCents(subtotal);
    }

    applyDiscount(percent) {
        if (percent < 0 || percent > 100) {
            throw new Error('El descuento debe estar entre 0 y 100');
        }
    this.#discount = percent;
    }

    getTotal() {
        return roundToCents(this.getSubtotal() * (1 - this.#discount / 100));
    }
}