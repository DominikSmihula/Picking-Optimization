# Optimized Picking Data Service

The Optimized Picking Data Service is a Nest.js service that optimizes the picking order of products based on their positions. It provides methods to calculate the optimized picking order and total distance traveled.

## Installation

To use the Optimized Picking Data Service, follow these steps:

1. Clone the repository.
2. Install the dependencies by running the following command:
   npm install
3. Run with following command:
   npm run start

## Unit tests

npm run test

# File: app.controller.ts

This file contains the implementation of the `AppController` class, which serves as the controller for handling HTTP requests in the application.

## Table of Contents

- [Controller](#controller)
- [Endpoints](#endpoints)
  - [1. `POST /pickingOrder`](#post-pickingorder)
  - [2. `GET /positions/:productId`](#get-positionsproductid)
  - [3. `POST /pickingOptions`](#post-pickingoptions)

## Controller

The `AppController` class is decorated with `@Controller()` to indicate that it is a controller class in NestJS.

It has the following dependencies injected through the constructor:

- `pickingService`: An instance of the `OptimizedPickingService` class.
- `data`: An instance of the `OptimizedPickingData` class.
- `positions`: An instance of the `ProductsService` class.

## Endpoints

### 1. `POST /pickingOrder`

Optimizes the picking order based on the provided positions.

- Request body:

  - `orders` (array of `PossitionsDTO`): An array of positions to optimize the picking order.

- Example request:

```
  HTTP/1.1 200 OK
  Content-Type: application/json

[
{
"positionId": "position-332",
"x": 6,
"y": 2,
"z": 100,
"productId": "product-13",
"quantity": 19
},
{
"positionId": "position-672",
"x": 36,
"y": 6,
"z": 200,
"productId": "product-12",
"quantity": 20
}
]
```

- Example response:

  ```
  HTTP/1.1 200 OK
  Content-Type: application/json

  {
  "pickingOrder": [
  {
  "positionId": "position-11",
  "productId": "product-23"
  },
  {
  "positionId": "position-76",
  "productId": "product-13"
  },
  ],
  "distance": 54.21
  }


  ```

```

```

### 2. `GET /positions/:productId`

Retrieves positions for a given product ID.

- Path parameter:

  - `productId` (string): The ID of the product.

- Example request:

```

GET /positions/123

```

- Example response:

```

HTTP/1.1 200 OK
Content-Type: application/json

[
{
"positionId": "position-332",
"x": 6,
"y": 2,
"z": 100,
"productId": "product-13",
"quantity": 19
},
{
"positionId": "position-672",
"x": 36,
"y": 6,
"z": 200,
"productId": "product-12",
"quantity": 20
},
]

```

```

### 3. `POST /pickingOptions`

Retrieves picking options with optimized paths for a product.

- Request body:

  - `products` (`ProductDTO`): The product data, including the product ID and starting position.

- Example request:

```

POST /pickingOptions
Content-Type: application/json

{
"productId": [ "product-1", "product-2" ,"product-13","product-23","product-7"],
"startingPosition": { "x": 1, "y": 2, "z": 3 }
}

```

- Example response:

```

HTTP/1.1 200 OK
Content-Type: application/json

{
"pickingOrder": [
{
"positionId": "position-11",
"productId": "product-23"
},
{
"positionId": "position-76",
"productId": "product-13"
},
],
"distance": 54.21
}

```

```

## API Reference

### `OptimizedPickingData` Class

#### `constructor(config: OptimizedPickingConfig)`

- Initializes an instance of `OptimizedPickingData` with the provided configuration.

##### Parameters

- `config` (type: `OptimizedPickingConfig`): An instance of `OptimizedPickingConfig` for configuration.

#### `optimizePickingOrder(products: IProductPosition[], startingPosition: IPosition): IResponse`

- Optimizes the picking order of products based on their positions.

This method uses a greedy algorithm to determine the optimal picking order. It starts from the `startingPosition` and iteratively selects the nearest available product until all products have been picked.

##### Parameters

- `products` (type: `IProductPosition[]`): An array of `IProductPosition` representing the available products and their positions.
- `startingPosition` (type: `IPosition`): The starting position for picking.

##### Returns

- (type: `IResponse`): The optimized picking order and the total distance traveled.

##### Explanation

1. The method initializes an empty `array` to store the mapped products in the optimized picking order.

2. It iterates over the `products` array to find the nearest product for each step of the picking order.

3. Inside the loop:

   - It retrieves the `currentPosition` by calling the `getCurrentPosition` method, which determines the position for the current step based on the `array` and `startingPosition`.
   - It finds the `nextProduct` by calling the `getNearestProduct` method, which calculates the distance between the `currentPosition` and each available product, and selects the one with the smallest distance.
   - If a `nextProduct` is found, it marks the product as picked by calling the `markAsPicked` method, which sets the `picked` property of the corresponding product in the `products` array to `true`. It also adds the `nextProduct` to the `array` to keep track of the optimized picking order.

4. After completing the loop, it calls the `collectData` method to collect the picking order and calculate the total distance traveled.

5. Finally ,it returns the `IResponse` object containing the optimized picking order (`pickingOrder`) and the total distance traveled (`distance`).

#### `markAsPicked(nextProduct: IMappedProducts): void`

- Marks a product as picked by setting its 'picked' property to `true`.

This method iterates over the `products` array and updates the `picked` property of the product with the same `productId` as the `nextProduct`.

##### Parameters

- `nextProduct` (type: `IMappedProducts`): The product to mark as picked.

#### `collectData(array: Array<IMappedProducts>): IResponse`

- Collects the data for the optimized picking order.

This method takes the `array` of mapped products and converts it into the desired format for the picking order (`pickingOrder`) by extracting the `positionId` and `productId` of each mapped product. It also calculates the total distance traveled (`distance`) by calling the `getTotalDistance` method.

##### Parameters

- `array` (type: `Array<IMappedProducts>`): The array of mapped products representing the optimized picking order.

##### Returns

- (type: `IResponse`): The optimized picking order and the total distance traveled.

#### `getCurrentPosition(array: Array<IMappedProducts>, index: number, startingPosition: IPosition): IPosition`

- Retrieves the current position for the picking order step.

This method determines the current position based on the `array`, `index`, and `startingPosition`. If the `index` is `0`, indicating the first step, it returns the `startingPosition`. Otherwise, it retrieves the position from the last item in the `array`.

##### Parameters

- `array` (type: `Array<IMappedProducts>`): The array of mapped products representing the optimized picking order.
- `index` (type: `number`): The index of the current step in the picking order.
- `startingPosition` (type: `IPosition`): The starting position for picking.

##### Returns

- (type: `IPosition`): The current position for the picking order step.

#### `getTotalDistance(array: Array<IMappedProducts>): number`

- Calculates the total distance traveled in the optimized picking order.

This method iterates over the `array` of mapped products and sums up the distances between each product using the `calculateDistance` method.

##### Parameters

- `array` (type: `Array<IMappedProducts>`): The array of mapped products representing the optimized picking order.

##### Returns

- (type: `number`): The total distance traveled in the optimized picking order.

#### `getNearestProduct(remainingProducts: IProductPosition[], currentPosition: IPosition): IMappedProducts | undefined`

- Finds the nearest available product from the current position.

This method calculates the distance between the `currentPosition` and each available product in the `remainingProducts` array. It then selects the product with the smallest distance and returns it as an `IMappedProducts` object.

##### Parameters

- `remainingProducts` (type: `IProductPosition[]`): An array of `IProductPosition` representing the available products and their positions.
- `currentPosition` (type: `IPosition`): The current position for picking.

##### Returns

- (type: `IMappedProducts | undefined`): The nearest available product or `undefined` if no product is available.

#### `calculateDistance(currentPosition: IPosition, newPosition: IPosition): number`

- Calculates the distance between two positions.

This method calculates the Euclidean distance between the `currentPosition` and `newPosition` using the formula `sqrt((dx * dx) + (dy * dy) + (dz * dz))`.

##### Parameters

- `currentPosition` (type: `IPosition`): The current position.
- `newPosition` (type: `IPosition`): The new position.

##### Returns

- (type: `number`): The calculated distance.

```

```
