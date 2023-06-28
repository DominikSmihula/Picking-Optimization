import { IProductPosition, IMappedProducts } from '../optimizedPicking.interface'
export const productsInput: IProductPosition[] = [
    {
        positionId: '1',
        x: 0,
        y: 0,
        z: 0,
        productId: '1',
        quantity: 1,
        picked: false,
    },
    {
        positionId: '2',
        x: 1,
        y: 1,
        z: 1,
        productId: '2',
        quantity: 1,
        picked: false,
    },
    {
        positionId: '3',
        x: 2,
        y: 2,
        z: 2,
        productId: '3',
        quantity: 1,
        picked: false,
    },
];
export const sortedProducts: IMappedProducts[] = [
    {
        distance: 0,
        element: {
            positionId: '1',
            x: 0,
            y: 0,
            z: 0,
            productId: '1',
            quantity: 1,
            picked: true
        }
    },
    {
        distance: 1.7320508075688772,
        element: {
            positionId: '2',
            x: 1,
            y: 1,
            z: 1,
            productId: '2',
            quantity: 1,
            picked: true
        }
    },
    {
        distance: 1.7320508075688772,
        element: {
            positionId: '3',
            x: 2,
            y: 2,
            z: 2,
            productId: '3',
            quantity: 1,
            picked: true
        }
    }
]