# Product Shop - MERN Stack E-commerce Platform (Server)

## 🌐 Live API

- **API Base URL:** [Server API](https://mernstack-car-shop-server.vercel.app)

## Author

- MD. ASHRAFUL HAQUE

## 🚀 Features

### API Endpoints

#### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

#### Users

```
GET  /userList
GET  /userList/:uid
POST /userList
PUT  /user/:id
```

#### Products

```
GET /products
GET /products/:id
GET /products/category/:id
POST /products
PUT  /products/:id
DELETE /products/:id
```

#### Categories

```
GET   /categories
POST  /categories
PUT   /categories/:id
DELETE /categories/:id
```

#### Productcart

```
GET  /productcart
POST /productcart
```

### Security Features

- Firebase Admin SDK Integration
- Error Handling

## 🛠️ Built With

- Node.js
- Express.js
- MongoDB
- Firebase Admin SDK
- Cors
- dotenv
- Other key dependencies...

## 🚀 Getting Started

1. Clone the repository

```bash
git clone https://github.com/ashrafulhaque/mernstack-car-shop-server.git
```

2. Install dependencies

```bash
cd mernstack-car-shop-server
npm install
```

3. Set up environment variables
   Create a `.env` file in the root directory and add the necessary environment variables.

4. Run the development server

```bash
node index.js
```

## 🔗 Links

- [Live Website](https://mernstack-car-shop-client.vercel.app/)

## 📞 Contact

For any queries, please reach out through:

- [Linkedin](https://www.linkedin.com/in/imashrafulhaque/)
