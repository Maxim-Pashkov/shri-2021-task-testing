import { it, expect } from '@jest/globals';
import { CartApi, LOCAL_STORAGE_CART_KEY } from '../../src/client/api';

const cartData = {
    5: {
        name: 'test name',
        price: 10,
        count: 1,
    },
};

it('save cart data in local storage', () => {
    new CartApi().setState(cartData);

    expect(localStorage.getItem(LOCAL_STORAGE_CART_KEY)).toEqual(
        JSON.stringify(cartData)
    );
});

it('read cart data from local storage', () => {
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartData));

    const state = new CartApi().getState();

    expect(state).toEqual(cartData);
});
