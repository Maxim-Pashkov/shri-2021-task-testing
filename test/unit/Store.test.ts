import { describe, it, expect } from '@jest/globals';
import { addToCart, checkoutComplete, clearCart, productDetailsLoad, productDetailsLoaded, productsLoad, productsLoaded } from '../../src/client/store';
import { getStore } from './getApplication';

describe('Store test', () => {
    it('products load test', () => {
        const {store} = getStore({});

        store.dispatch(productsLoad());

        expect(store.getState()).toStrictEqual({details: {}, cart: {}, products: undefined});
    });

    it('products loaded test', async () => {
        const {store, api} = getStore({});

        const {data: productsInfo} = await api.getProducts();

        store.dispatch(productsLoaded(productsInfo));

        expect(store.getState()).toStrictEqual({details: {}, cart: {}, products: productsInfo});
    });

    it('products detail load test', () => {
        const {store} = getStore({});

        store.dispatch(productDetailsLoad(2));

        expect(store.getState()).toStrictEqual({details: {}, cart: {}});
    });

    it('products detail loaded test', async () => {
        const {store, api} = getStore({});

        const {data: productInfo} = await api.getProductById(1);

        store.dispatch(productDetailsLoaded(productInfo));

        expect(store.getState()).toStrictEqual({details: {1: productInfo}, cart: {}});
    });

    it('add to cart test', async () => {
        const {store, api} = getStore({
            2: {
                name: 'test',
                price: 3,
                count: 2,
            }
        });

        const {data: productInfo} = await api.getProductById(2);

        store.dispatch(addToCart(productInfo));

        expect(store.getState()).toStrictEqual({
            details: {}, 
            cart: {
                2: {
                    name: 'test',
                    price: 3,
                    count: 3,
                }
            },
            latestOrderId: undefined,
        });
    });

    it('add exist to cart test', () => {
        const {store} = getStore({
            2: {
                name: 'test',
                price: 10,
                count: 2,
            }
        });

        store.dispatch(clearCart());

        expect(store.getState()).toStrictEqual({
            details: {}, 
            cart: {},
            latestOrderId: undefined,
        });
    });

    it('checkout complete test', () => {
        const {store} = getStore({
            2: {
                name: 'test',
                price: 10,
                count: 2,
            }
        });

        store.dispatch(checkoutComplete(10));

        expect(store.getState()).toStrictEqual({
            details: {}, 
            cart: {},
            latestOrderId: 10,
        });
    });
});