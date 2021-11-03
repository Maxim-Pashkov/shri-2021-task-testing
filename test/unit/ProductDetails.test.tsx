import React from 'react';
import { it, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getApplication } from './getApplication';
import { ProductDetails } from '../../src/client/components/ProductDetails';

const product = {
    name: 'test name',
    price: 10,
    count: 1,
    id: 5,
    description: 'test description',
    color: 'test color',
    material: 'test material',
};

describe('ProductDetails test', () => {
    it('adding multiple to cart', () => {
        const { application, store } = getApplication(
            () => <ProductDetails product={product} />,
            {}
        );

        const { queryByRole } = render(application);

        const button = queryByRole('button', { name: /add to cart/i });

        userEvent.click(button);
        userEvent.click(button);

        const { cart } = store.getState();

        expect(cart[product.id]?.count).toBe(2);
    });
});
