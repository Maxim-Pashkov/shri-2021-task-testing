import React from 'react';
import { it, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { getApplication } from './getApplication';
import { Application } from '../../src/client/Application';

describe('Application test', () => {
    it('navbar is exists', () => {
        const { application } = getApplication(() => <Application />, {});

        const { container } = render(application);

        expect(container.querySelector('.navbar')).toMatchSnapshot();
    });

    it('Cart link output count items in cart', () => {
        const cartState = {
            5: {
                name: '123',
                price: 10,
                count: 3,
            },
            10: {
                name: '1234',
                price: 15,
                count: 5,
            },
        };

        const { application } = getApplication(
            () => <Application />,
            cartState
        );

        const { container } = render(application);

        expect(container.querySelector('.Application-Menu')).toMatchSnapshot();
    });
});
