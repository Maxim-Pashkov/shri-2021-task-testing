import React from 'react';
import { it, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getApplication } from './getApplication';
import { Cart } from '../../src/client/pages/Cart';
import { checkoutComplete } from '../../src/client/store';

const cartState = {
    5: {
        price: 10,
        name: 'test 1',
        count: 4,
    },
    6: {
        price: 20,
        name: 'test 2',
        count: 8,
    },
};

describe('Cart test', () => {
    it('link to Catalog displayed when Cart is empty', () => {
        const { application } = getApplication(() => <Cart />, {});

        const { queryByRole } = render(application);

        expect(queryByRole('link', { name: /catalog/i })).toBeTruthy();
    });

    it('link to Catalog not displayed when Cart is not empty', () => {
        const { application } = getApplication(() => <Cart />, cartState);

        const { queryByRole } = render(application);

        expect(queryByRole('link', { name: /catalog/i })).toBeFalsy();
    });

    it('produtcs added to cart are displayed', () => {
        const { application } = getApplication(() => <Cart />, cartState);

        const { queryByTestId } = render(application);

        const ids = Object.keys(cartState);
        const elements = ids.map((id) =>
            queryByTestId(id)?.getAttribute('data-testid')
        );

        expect(ids).toEqual(expect.arrayContaining(elements));
    });

    it('product name is displayed', () => {
        const { application } = getApplication(() => <Cart />, cartState);

        const { queryByText } = render(application);

        const values = Object.values(cartState)[0];

        expect(queryByText(values.name)).toBeTruthy();
    });

    it('product price is displayed', () => {
        const { application } = getApplication(() => <Cart />, cartState);

        const { queryByText } = render(application);

        const values = Object.values(cartState)[0];

        expect(queryByText(new RegExp(values.price + '$', 'i'))).toBeTruthy();
    });

    it('product count is displayed', () => {
        const { application } = getApplication(() => <Cart />, cartState);

        const { queryByText } = render(application);

        const values = Object.values(cartState)[0];

        expect(queryByText(values.count)).toBeTruthy();
    });

    it('product sum is displayed', () => {
        const { application } = getApplication(() => <Cart />, cartState);

        const { queryByText } = render(application);

        const values = Object.values(cartState)[0];

        expect(
            queryByText(new RegExp(values.price * values.count + '$', 'i'))
        ).toBeTruthy();
    });

    it('total sum is displayed', () => {
        const { application } = getApplication(() => <Cart />, cartState);

        const { queryByText } = render(application);

        const total = Object.values(cartState).reduce(
            (acc, item) => acc + item.count * item.price,
            0
        );

        expect(queryByText(new RegExp(total + '$', 'i'))).toBeTruthy();
    });

    it('clear button is not displayed when Cart is empty', () => {
        const { application } = getApplication(() => <Cart />, {});

        const { queryByRole } = render(application);

        expect(queryByRole('button', { name: /clear/i })).toBeFalsy();
    });

    it('clear button is displayed when Cart is not empty', () => {
        const { application } = getApplication(() => <Cart />, cartState);

        const { queryByRole } = render(application);

        expect(queryByRole('button', { name: /clear/i })).toBeTruthy();
    });

    it('after click on clear button Cart must be empty', () => {
        const { application } = getApplication(() => <Cart />, cartState);

        const { queryByRole, queryByTestId } = render(application);

        const button = queryByRole('button', { name: /clear/i });

        userEvent.click(button);

        expect(queryByTestId(Object.keys(cartState)[0])).toBeFalsy();
    });

    it('Checkout section must be not output when Cart is empty', () => {
        const { application } = getApplication(() => <Cart />, {});

        const { queryByRole } = render(application);

        expect(queryByRole('heading', { name: /сheckout/i })).toBeFalsy();
    });

    it('Checkout section must be output when Cart is not empty', () => {
        const { application } = getApplication(() => <Cart />, cartState);

        const { queryByRole } = render(application);

        expect(queryByRole('heading', { name: /сheckout/i })).toBeTruthy();
    });

    it('Success message must be not output when last ordered id is empty', () => {
        const { application } = getApplication(() => <Cart />, {});

        const { queryByRole } = render(application);

        expect(queryByRole('heading', { name: /well done/i })).toBeFalsy();
    });

    it('Success message must be output when last ordered id is not empty', async () => {
        const { application, store } = getApplication(() => <Cart />, {});

        const { queryByRole } = render(application);

        store.dispatch(checkoutComplete(1));

        expect(queryByRole('heading', { name: /well done/i })).toBeTruthy();
    });
});
