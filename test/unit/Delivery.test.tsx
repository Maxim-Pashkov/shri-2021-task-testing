import React from 'react';
import { it, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { getApplication } from './getApplication';
import { Application } from '../../src/client/Application';
import { Helmet } from 'react-helmet';

describe('Delivery test', () => {
    it('Delivery page is visible', () => {
        const { application, history } = getApplication(
            () => <Application />,
            {}
        );
        history.push('/delivery');

        const { container } = render(application);
        const helmet = Helmet.peek();

        expect(container.querySelector('.Delivery')).toMatchSnapshot();
        expect(helmet.title).toMatchInlineSnapshot(
            `"Delivery — Example store"`
        );
    });
});
