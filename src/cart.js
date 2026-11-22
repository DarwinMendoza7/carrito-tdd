export class Cart {
    constructor () {
        this.items = [];
    }

    addItem({ id, name, price, quantity }) {
        if (id === undefined || id === null || !name) {
            throw new Error ('ID y nombre son obligatorios');
        }
        this.items.push({ id, name, price, quantity });
    }

    getItems() {
        return this.items;
    }
}