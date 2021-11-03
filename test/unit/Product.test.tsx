import React from 'react';
import { it, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { getApplication } from './getApplication';
import { Application } from '../../src/client/Application';

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
});
