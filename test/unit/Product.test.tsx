import { it, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { getApplication } from './getApplication';
import { Application } from '../../src/client/Application';

it('Product page loading is visible', () => {
    const { application, history } = getApplication(() => <Application />, {});
    history.push('/catalog/10');

    const { queryByText } = render(application);

    expect(queryByText(/loading/i)).toBeTruthy();
});

it('Product page is visible', async () => {
    const { application, history, store } = getApplication(
        () => <Application />,
        {}
    );
    history.push('/catalog/10');

    const { queryByText } = render(application);

    await new Promise((resolve) => store.subscribe(() => resolve(true)));

    expect(queryByText(/loading/i)).toBeFalsy();
});
