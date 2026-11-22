export const MIN_DISCOUNT = 0;
export const MAX_DISCOUNT = 100;

function isValidNumber(value) {
    return typeof value === 'number' && Number.isFinite(value);
}

export function validateIdAndName(id, name) {
    if (id === undefined || id === null || !name) {
        throw new Error('ID y nombre son obligatorios');
    }
}

export function validatePrice(price) {
    if (!isValidNumber(price)) {
        throw new Error('El precio debe ser un número válido');
    }
    if (price < 0) {
        throw new Error('El precio no puede ser negativo');
    }
}

export function validateQuantity(quantity) {
    if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error('La cantidad debe ser un entero positivo');
    }
}

export function validateDiscount(percent) {
    if (!isValidNumber(percent) || percent < MIN_DISCOUNT || percent > MAX_DISCOUNT) {
        throw new Error('El descuento debe estar entre 0 y 100');
    }
}

export function validateItem({ id, name, price, quantity }) {
    validateIdAndName(id, name);
    validatePrice(price);
    validateQuantity(quantity);
}