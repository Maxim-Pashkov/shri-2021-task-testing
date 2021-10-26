import React from 'react';
import { it, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { getApplication } from './getApplication';
import { ProductItem } from '../../src/client/components/ProductItem';

const product = {
    name: 'test name',
    price: 10,
    count: 1,
    id: 5,
};

describe('ProductItem test', () => {
    it('item is exists', () => {
        const { application } = getApplication(
            () => <ProductItem product={product} />,
            {}
        );

        const { queryByTestId } = render(application);

        expect(queryByTestId(product.id)).toBeTruthy();
    });

    it('the name is exists', () => {
        const { application } = getApplication(
            () => <ProductItem product={product} />,
            {}
        );

        const { getByText } = render(application);

        expect(getByText(product.name)).toBeTruthy();
    });

    it('the price is exists', () => {
        const { application } = getApplication(
            () => <ProductItem product={product} />,
            {}
        );

        const { getByText } = render(application);

        expect(getByText(new RegExp(product.price.toString()))).toBeTruthy();
    });

    it('the link to details is exists', () => {
        const { application } = getApplication(
            () => <ProductItem product={product} />,
            {}
        );

        const { queryByRole } = render(application);

        expect(queryByRole('link', { name: /details/i })).toBeTruthy();
    });

    it('cart badge is not exists by default', () => {
        const { application } = getApplication(
            () => <ProductItem product={product} />,
            {}
        );

        const { container } = render(application);

        expect(container.querySelector('.text-success')).toBeFalsy();
    });

    it('cart badge is exists when item in cart', () => {
        const cartState = {
            [product.id]: product,
        };

        const { application } = getApplication(
            () => <ProductItem product={product} />,
            cartState
        );

        const { container } = render(application);

        expect(container.querySelector('.text-success')).toBeTruthy();
    });
});
