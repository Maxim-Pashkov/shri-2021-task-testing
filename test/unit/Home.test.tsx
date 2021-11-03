import React from 'react';
import { it, expect, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { getApplication } from './getApplication';
import { Application } from '../../src/client/Application';

describe('Home test', () => {
    it('Home page is visible', () => {
        const { application } = getApplication(
            () => <Application />,
            {}
        );

        const { container } = render(application);

        expect(container.querySelector('.Home')).toMatchSnapshot();
    });
});
