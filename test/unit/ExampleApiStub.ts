import { ExampleApi } from '../../src/client/api';
import { Product, ProductShortInfo } from '../../src/common/types';
import { AxiosResponse } from 'axios';
import { product, products } from '../data';

export class ExampleApiStub extends ExampleApi {
    async getProducts() {
        return await Promise.resolve<AxiosResponse<ProductShortInfo[]>>({
            data: products(),
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        });
    }

    async getProductById(id: number) {
        return await Promise.resolve<AxiosResponse<Product>>({
            data: product(id),
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        });
    }
}
