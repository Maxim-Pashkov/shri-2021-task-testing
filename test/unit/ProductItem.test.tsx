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

        const { container } = render(application);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('selected item is exists', () => {
        const cartState = {
            [product.id]: product,
        };

        const { application } = getApplication(
            () => <ProductItem product={product} />,
            cartState
        );

        const { container } = render(application);

        expect(container.firstChild).toMatchSnapshot();
    });
});
