import React from 'react';
import { it, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { getApplication } from './getApplication';
import { Application } from '../../src/client/Application';
import { Helmet } from 'react-helmet';

describe('Product test', () => {
    it('Product page loading is visible', () => {
        const { application, history } = getApplication(
            () => <Application />,
            {}
        );
        history.push('/catalog/10');

        const { container } = render(application);

        expect(container.querySelector('.Product')).toMatchSnapshot();
    });

    it('Product page is visible', async () => {
        const { application, history, store } = getApplication(
            () => <Application />,
            {}
        );
        history.push('/catalog/10');

        const { container } = render(application);

        await new Promise((resolve) => store.subscribe(() => resolve(true)));

        expect(container.querySelector('.Product')).toMatchSnapshot();
    });

    it('Product page selected item is visible', async () => {
        const { application, history, store } = getApplication(
            () => <Application />,
            {
                10: {
                    price: 10,
                    count: 1,
                    name: 'test',
                },
            }
        );
        history.push('/catalog/10');

        const { container } = render(application);

        await new Promise((resolve) => store.subscribe(() => resolve(true)));

        const helmet = Helmet.peek();

        expect(
            container.querySelector('.ProductDetails-AddToCart')
                .nextElementSibling
        ).toMatchSnapshot();
        
        expect(helmet.title).toMatchInlineSnapshot(
            `"test name — Example store"`
        );
    });
});
