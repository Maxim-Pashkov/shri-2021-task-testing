import React from 'react';
import { it, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { getApplication } from './getApplication';
import { Application } from '../../src/client/Application';
import { Helmet } from 'react-helmet';

describe('Home test', () => {
    it('Home page is visible', () => {
        const { application } = getApplication(() => <Application />, {});

        const { container } = render(application);

        const helmet = Helmet.peek();
        expect(container.querySelector('.Home')).toMatchSnapshot();
        expect(helmet.title).toMatchInlineSnapshot(`"Welcome — Example store"`);
    });
});
