import { ExampleApi } from '../../src/client/api';
import { Product, ProductShortInfo } from '../../src/common/types';
import { AxiosResponse } from 'axios';

export class ExampleApiStub extends ExampleApi {
    async getProducts() {
        return await Promise.resolve<AxiosResponse<ProductShortInfo[]>>({
            data: [
                {
                    id: 2,
                    name: 'test name 2',
                    price: 10,
                },
                {
                    id: 3,
                    name: 'test name 3',
                    price: 11,
                },
                {
                    id: 4,
                    name: 'test name 4',
                    price: 12,
                },
            ],
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        });
    }

    async getProductById(id: number) {
        return await Promise.resolve<AxiosResponse<Product>>({
            data: {
                id,
                name: 'test name',
                price: 120,
                description: 'test description',
                material: 'test material',
                color: 'test color',
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        });
    }
}
