import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { initStore } from '../../src/client/store';
import { ExampleApiStub } from './ExampleApiStub';
import { CartApiStub } from './CartAbiStub';
import { CartState } from '../../src/common/types';
import React, { ReactElement } from 'react';

export function getApplication(
    render: () => ReactElement,
    cartState: CartState
) {
    const history = createMemoryHistory();
    const store = initStore(
        new ExampleApiStub('test'),
        new CartApiStub(cartState)
    );
    const application = (
        <Router history={history}>
            <Provider store={store}>{render()}</Provider>
        </Router>
    );

    return { application, store, history };
}
