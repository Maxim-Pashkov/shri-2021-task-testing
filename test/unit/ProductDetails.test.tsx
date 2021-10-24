import { it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
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

it('the name is exists', () => {
    const { application } = getApplication(
        () => <ProductDetails product={product} />,
        {}
    );

    const { getByText } = render(application);

    expect(getByText(product.name)).toBeTruthy();
});

it('the description is exists', () => {
    const { application } = getApplication(
        () => <ProductDetails product={product} />,
        {}
    );

    const { getByText } = render(application);

    expect(getByText(product.description)).toBeTruthy();
});

it('the price is exists', () => {
    const { application } = getApplication(
        () => <ProductDetails product={product} />,
        {}
    );

    const { getByText } = render(application);

    expect(getByText(new RegExp(product.price.toString()))).toBeTruthy();
});

it('the color is exists', () => {
    const { application } = getApplication(
        () => <ProductDetails product={product} />,
        {}
    );

    const { getByText } = render(application);

    expect(getByText(product.color)).toBeTruthy();
});

it('the material is exists', () => {
    const { application } = getApplication(
        () => <ProductDetails product={product} />,
        {}
    );

    const { getByText } = render(application);

    expect(getByText(product.material)).toBeTruthy();
});

it('button add to cart is exists', () => {
    const { application } = getApplication(
        () => <ProductDetails product={product} />,
        {}
    );

    const { queryByRole } = render(application);

    expect(queryByRole('button', { name: /add to cart/i })).toBeTruthy();
});

it('adding to cart', () => {
    const { application, store } = getApplication(
        () => <ProductDetails product={product} />,
        {}
    );

    const { queryByRole } = render(application);

    userEvent.click(queryByRole('button', { name: /add to cart/i }));

    const { cart } = store.getState();

    expect(cart[product.id]?.count).toBe(1);
});

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
