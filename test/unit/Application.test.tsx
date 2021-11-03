import React from 'react';
import { it, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { getApplication } from './getApplication';
import { Application } from '../../src/client/Application';
import userEvent from '@testing-library/user-event';

describe('Application test', () => {
    it('navbar is exists', () => {
        const { application } = getApplication(() => <Application />, {});

        const { container } = render(application);

        expect(container.querySelector('.navbar')).toMatchSnapshot();
    });

    it('navbar active links', () => {
        const { application } = getApplication(() => <Application />, {});

        const { container } = render(application);

        const nav = container.querySelector('.navbar-nav');

        const links = ['/catalog', '/delivery', '/delivery', '/cart']
            .map(href => nav?.querySelector(`a[href="${href}"]`))
            .filter(Boolean);

        links.forEach(link => {
            userEvent.click(link);
            links.forEach(otherLink => {
                expect(otherLink.classList.contains('active')).toBe(otherLink === link);
            });
        });
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
