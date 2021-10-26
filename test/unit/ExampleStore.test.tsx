import {it, expect, describe} from '@jest/globals';
import {ExampleStore} from '../../src/server/data';

describe('ExampleStore test', () => {
    it('products are filled', () => {
        const store = new ExampleStore();
        const products = store.getAllProducts();

        expect(Array.isArray(products)).toBeTruthy();
        expect(products.length).toBeTruthy();
        expect(products.every(product => 'id' in product && 'name' in product && 'price' in product)).toBeTruthy();
        expect(products.map(({id}) => id).length).toBe([...new Set(products.map(({id}) => id))].length);
    });

    it('product found', () => {
        const store = new ExampleStore();
        const products = store.getAllProducts();
        const productFromArray = products[Math.floor(products.length / 2)];
        const product = store.getProductById(productFromArray.id);

        expect(product.id).toBe(productFromArray.id);
        expect(product.name).toBe(productFromArray.name);
        expect(product.price).toBe(productFromArray.price);
    });

    it('product not found', () => {
        const store = new ExampleStore();
        const products = store.getAllProducts();
        const maxId = Math.max(...products.map(({id}) => id));
        const product = store.getProductById(maxId + 1);
        expect(product).toBe(undefined);
    });
});