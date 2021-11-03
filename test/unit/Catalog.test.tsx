import React from 'react';
import { it, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { getApplication } from './getApplication';
import { Application } from '../../src/client/Application';
import { Helmet } from 'react-helmet';

describe('Catalog test', () => {
    it('Catalog page loading is visible', () => {
        const { application, history } = getApplication(
            () => <Application />,
            {}
        );
        history.push('/catalog');

        const { container } = render(application);

        expect(container.querySelector('.Catalog')).toMatchSnapshot();
    });

    it('Catalog page is visible', async () => {
        const { application, history, store } = getApplication(
            () => <Application />,
            {
                2: {
                    name: 'test',
                    price: 10,
                    count: 1,
                },
            }
        );
        history.push('/catalog');

        const { container } = render(application);

        await new Promise((resolve) => store.subscribe(() => resolve(true)));

        const helmet = Helmet.peek();

        expect(container.querySelector('.Catalog')).toMatchSnapshot();
        expect(helmet.title).toMatchInlineSnapshot(`"Catalog — Example store"`);
    });
});
