const MIN_DISCOUNT = 0;
const MAX_DISCOUNT = 100;

function validateIdAndName(id, name) {
    if (id === undefined || id === null || !name) {
        throw new Error('ID y nombre son obligatorios');
    }
}

function validatePrice(price) {
    if (typeof price !== 'number' || Number.isNaN(price)) {
        throw new Error('El precio debe ser un número válido');
    } 
    if (price < 0) {
        throw new Error('El precio no puede ser negativo');
    }
}

function validateQuantity(quantity) {
    if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error('La cantidad debe ser un entero positivo');
    }
}

function validateDiscount(percent) {
    if (
        typeof percent !== 'number' ||
        Number.isNaN(percent) ||
        percent < MIN_DISCOUNT ||
        percent > MAX_DISCOUNT
    ) {
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

    #indexOf(id) {
        const index = this.#items.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new Error('Producto no encontrado');
        }
        return index;
    }

    addItem({ id, name, price, quantity }) {
        validateIdAndName(id, name);
        validatePrice(price);
        validateQuantity(quantity);

        const existing = this.#items.findIndex((item) => item.id === id);
        if (existing !== -1) {
            const current = this.#items[existing];
            this.#items[existing] = { ...current, quantity: current.quantity + quantity };
            return;
        }
        this.#items.push({ id, name, price, quantity });
    }

    updateQuantity(id, quantity) {
        const index = this.#indexOf(id);
        validateQuantity(quantity);
        this.#items[index] = { ...this.#items[index], quantity };
    }

    removeItem(id) {
        const index = this.#indexOf(id);
        this.#items.splice(index, 1);
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