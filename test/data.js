function products() {
    return  [{
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
    }];
}

function product(id) {
    return {
        id,
        name: 'test name',
        price: 120,
        description: 'test description',
        material: 'test material',
        color: 'test color',
    }
}

module.exports = {product, products};