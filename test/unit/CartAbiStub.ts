import { CartApi } from '../../src/client/api';
import { CartState } from '../../src/common/types';

export class CartApiStub extends CartApi {
    state: CartState;

    constructor(state: CartState) {
        super();
        this.state = state;
    }

    getState() {
        return this.state;
    }

    setState() {
        return;
    }
}
