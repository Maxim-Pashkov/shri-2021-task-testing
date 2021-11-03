import React from 'react';
import { it, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { getApplication } from './getApplication';
import { Application } from '../../src/client/Application';
import { Helmet } from 'react-helmet';

describe('Contacts test', () => {
    it('Contacts page is visible', () => {
        const { application, history } = getApplication(
            () => <Application />,
            {}
        );
        history.push('/contacts');

        const { container } = render(application);
        const helmet = Helmet.peek();

        expect(container.querySelector('.Contacts')).toMatchSnapshot();
        expect(helmet.title).toMatchInlineSnapshot(
            `"Contacts — Example store"`
        );
    });
});
