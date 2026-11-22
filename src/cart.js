function validateIdAndName(id, name) {
    if (id === undefined || id === null || !name) {
        throw new Error('ID y nombre son obligatorios');
    }
}

export class Cart {
    #items = [];

    addItem({ id, name, price, quantity }) {
        validateIdAndName(id, name);
        this.#items.push({ id, name, price, quantity });
    }

    getItems() {
        return [...this.#items];
    }
}