import { it, expect, describe } from '@jest/globals';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getApplication } from './getApplication';
import { Application } from '../../src/client/Application';

describe('Application test', () => {
    it('link to Home is exists', () => {
        const { application } = getApplication(() => <Application />, {});

        const { container } = render(application);

        expect(container.querySelector('a[href="/"]')).toBeTruthy();
    });

    it('link to Home on brand is exists', () => {
        const { application } = getApplication(() => <Application />, {});

        const { container } = render(application);

        expect(container.querySelector('a.navbar-brand[href="/"]')).toBeTruthy();
    });

    it('link to Catalog is exists', () => {
        const { application } = getApplication(() => <Application />, {});

        const { container } = render(application);

        expect(container.querySelector('a[href="/catalog"]')).toBeTruthy();
    });

    it('link to Delivery is exists', () => {
        const { application } = getApplication(() => <Application />, {});

        const { container } = render(application);

        expect(container.querySelector('a[href="/delivery"]')).toBeTruthy();
    });

    it('link to Contacts is exists', () => {
        const { application } = getApplication(() => <Application />, {});

        const { container } = render(application);

        expect(container.querySelector('a[href="/contacts"]')).toBeTruthy();
    });

    it('link to Cart is exists', () => {
        const { application } = getApplication(() => <Application />, {});

        const { container } = render(application);

        expect(container.querySelector('a[href="/cart"]')).toBeTruthy();
    });

    it('Home page is visible by default', () => {
        const { application } = getApplication(() => <Application />, {});

        const { getByRole } = render(application);

        expect(getByRole('heading', { name: /Quickly/i })).toBeTruthy();
    });

    it('Catalog page is visible after click on link', () => {
        const { application } = getApplication(() => <Application />, {});

        const { container, getByRole } = render(application);

        const link = container.querySelector('a[href="/catalog"]');

        userEvent.click(link);

        expect(getByRole('heading', { name: /Catalog/i })).toBeTruthy();
    });

    it('Delivery page is visible after click on link', () => {
        const { application } = getApplication(() => <Application />, {});

        const { container, getByRole } = render(application);

        const link = container.querySelector('a[href="/delivery"]');

        userEvent.click(link);

        expect(getByRole('heading', { name: /Delivery/i })).toBeTruthy();
    });

    it('Contacts page is visible after click on link', () => {
        const { application } = getApplication(() => <Application />, {});

        const { container, getByRole } = render(application);

        const link = container.querySelector('a[href="/contacts"]');

        userEvent.click(link);

        expect(getByRole('heading', { name: /Contacts/i })).toBeTruthy();
    });

    it('Cart page is visible after click on link', () => {
        const { application } = getApplication(() => <Application />, {});

        const { container, getByRole } = render(application);

        const link = container.querySelector('a[href="/cart"]');

        userEvent.click(link);

        expect(getByRole('heading', { name: /Cart/i })).toBeTruthy();
    });

    it('Cart link not output () when cart is empty', () => {
        const { application } = getApplication(() => <Application />, {});

        const { container } = render(application);

        const link = container.querySelector('a[href="/cart"]');

        userEvent.click(link);

        expect(link.textContent).not.toMatch(/\(.*\)/);
    });

    it('Cart link output count items in cart', () => {
        const cartState = {
            5: {
                name: '123',
                price: 10,
                count: 2,
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

        const link = container.querySelector('a[href="/cart"]');

        userEvent.click(link);

        expect(link.textContent).toContain('(2)');
    });
});
