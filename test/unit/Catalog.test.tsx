import { it, expect, describe } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { getApplication } from './getApplication';
import { Application } from '../../src/client/Application';

describe('Catalog test', () => {
    it('Catalog page loading is visible', () => {
        const { application, history } = getApplication(
            () => <Application />,
            {}
        );
        history.push('/catalog');

        const { queryByText } = render(application);

        expect(queryByText(/loading/i)).toBeTruthy();
    });

    it('Catalog page is visible', async () => {
        const { application, history, store } = getApplication(
            () => <Application />,
            {}
        );
        history.push('/catalog');

        const { queryByText } = render(application);

        await new Promise((resolve) => store.subscribe(() => resolve(true)));

        expect(queryByText(/loading/i)).toBeFalsy();
    });

    it('Product are displayed in Catalog', async () => {
        const { application, history, store } = getApplication(
            () => <Application />,
            {}
        );
        history.push('/catalog');

        const { queryAllByTestId } = render(application);

        await new Promise((resolve) => store.subscribe(() => resolve(true)));

        const ids = store.getState().products.map((product) => product.id);
        const elements = ids.map(
            (id) => +queryAllByTestId(id)[0]?.getAttribute('data-testid')
        );

        expect(ids).toEqual(expect.arrayContaining(elements));
    });
});
