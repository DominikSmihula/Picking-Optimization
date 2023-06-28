export interface IProductPosition {
    positionId: string;
    x: number;
    y: number;
    z: number;
    productId: string;
    quantity: number;
    picked?: boolean
}
export interface IPosition {
    x: number;
    y: number;
    z: number;
}
export interface IResponse {
    pickingOrder: IProduct[];
    distance: number;
}
interface IProduct {
    productId: string;
    positionId: string;
}
export interface IMappedProducts {
    element: {
        positionId: string;
        x: number;
        y: number;
        z: number;
        productId: string;
        quantity: number;
        picked?: boolean
    },
    distance: number
}

