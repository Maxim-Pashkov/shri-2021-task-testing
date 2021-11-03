import React from 'react';
import { it, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getApplication } from './getApplication';
import { Cart } from '../../src/client/pages/Cart';
import { checkoutComplete } from '../../src/client/store';
import { Helmet } from 'react-helmet';

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

        const { container } = render(application);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('produtcs added to cart are displayed', () => {
        const { application } = getApplication(() => <Cart />, cartState);

        const { container } = render(application);
        const helmet = Helmet.peek();

        expect(container.firstChild).toMatchSnapshot();
        expect(helmet.title).toMatchInlineSnapshot(`"Shopping cart"`);
    });

    it('after click on clear button Cart must be empty', () => {
        const { application } = getApplication(() => <Cart />, cartState);

        const { queryByRole, container } = render(application);

        const button = queryByRole('button', { name: /clear/i });

        userEvent.click(button);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Success message must be output when last ordered id is not empty', async () => {
        const { application, store } = getApplication(() => <Cart />, {});

        const { container } = render(application);

        store.dispatch(checkoutComplete(1));

        expect(container.firstChild).toMatchSnapshot();
    });
});
