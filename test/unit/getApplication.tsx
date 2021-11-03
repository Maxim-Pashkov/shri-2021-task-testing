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
    const {store} = getStore(cartState); 
    const application = (
        <Router history={history}>
            <Provider store={store}>{render()}</Provider>
        </Router>
    );

    return { application, store, history };
}

export function getStore(cartState: CartState) {
    const api = new ExampleApiStub('test');
    const cartApi = new CartApiStub(cartState);

    const store = initStore(
        api,
        cartApi,
    );

    return {api, cartApi, store};
}
