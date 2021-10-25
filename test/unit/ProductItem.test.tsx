import { it, expect, describe } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { getApplication } from './getApplication';
import { ProductItem } from '../../src/client/components/ProductItem';

const product = {
    name: 'test name',
    price: 10,
    count: 1,
    id: 5,
};

describe('ProductItem test', () => {
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
});
