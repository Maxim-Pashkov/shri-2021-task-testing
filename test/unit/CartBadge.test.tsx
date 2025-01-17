import React from 'react';
import { it, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { getApplication } from './getApplication';
import { CartBadge } from '../../src/client/components/CartBadge';

const cartState = {
    5: {
        name: 'test',
        price: 10,
        count: 1,
    },
};

describe('CartBadge test', () => {
    it('if an item is in the cart, a badge will be displayed', () => {
        const { application } = getApplication(
            () => <CartBadge id={5} />,
            cartState
        );

        const { container } = render(application);

        expect(container.firstChild).toMatchSnapshot();
    });

    it("if an item is't in the cart, a badge will't be displayed", () => {
        const { application } = getApplication(
            () => <CartBadge id={6} />,
            cartState
        );

        const { container } = render(application);
        
        expect(container.firstChild).toMatchSnapshot();
    });
});
