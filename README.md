## Appleute

This assignment has backend made in Nest.js and Client made in Next.js.

## Usage

The backend uses jwt based auth on protected routes with the jwt passed as a cookie to the reference object.

- **GET** all Users

```
http://localhost:3000/user/all
```

- **GET** Profile of a user who is authenticated

```
http://localhost:3000/user/profile

```

- **POST** Create a User

```
http://localhost:3000/user/

```

- **POST** Create an Order (Needs Auth)

```
http://localhost:3000/order/:cartId

```

- **GET** Orders against a user (Needs Auth)

```
http://localhost:3000/order/:cartId

```

- **GET** All Categories

```
http://localhost:3000/category

```

- **GET** All Products

```
http://localhost:3000/product

```

- **GET** Specific Product

```
http://localhost:3000/product/:productId

```

- **GET** Products By Category

```
http://localhost:3000/product/category/:categoryName

```

- **POST** Add items to Cart (Needs Auth)

```
http://localhost:3000/cart/:productId

```

- **DELETE** Delete Items from Cart (Needs Auth)

```
http://localhost:3000/cart/:productId

```

- **DELETE** Clear Cart (Needs Auth)

```
http://localhost:3000/cart/

```

- **POST** Login

```
http://localhost:3000/auth/login/

```

- **POST** Register

```
http://localhost:3000/auth/register

```

- **POST** Logout 

```
http://localhost:3000/auth/logout

```


