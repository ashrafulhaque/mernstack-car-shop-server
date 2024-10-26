const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173", //My frontend URL
  })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.q1o0o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const userListCollection = client.db("carShopDB").collection("userList");

    app.get("/userList/:uid", async (req, res) => {
      const id = req.params.uid;
      const query = { uid: id };
      const result = await userListCollection.findOne(query);
      res.send(result);
    });

    app.get("/userList", async (req, res) => {
      const users = await userListCollection.find().toArray();
      res.send(users);
    });

    app.post("/userList", async (req, res) => {
      const user = req.body;
      const insertedUser = await userListCollection.insertOne(user);
      res.send(insertedUser);
    });

    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;

      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };

      const userUpdateData = {
        $set: { ...user },
      };

      try {
        const result = await userListCollection.updateOne(
          filter,
          userUpdateData,
          option
        );
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .send({ error: "An error occurred while updating the user." });
      }
    });

    // Collection for categories
    const categoryCollection = client.db("carShopDB").collection("categories");

    // Get all categories /products
    app.get("/categories", async (req, res) => {
      const categories = await categoryCollection.find().toArray();
      res.send(categories);
    });

    // Add new category
    app.post("/categories", async (req, res) => {
      const category = req.body;
      const result = await categoryCollection.insertOne(category);
      res.send(result);
    });

    // Update category
    app.put("/categories/:id", async (req, res) => {
      const id = req.params.id;
      const category = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateCat = {
        $set: { ...category },
      };

      try {
        const result = await categoryCollection.updateOne(
          filter,
          updateCat,
          options
        );
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Error updating category" });
      }
    });

    // Delete category
    app.delete("/categories/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      try {
        const result = await categoryCollection.deleteOne(filter);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Error deleting category" });
      }
    });

    // Collection for products
    const productCollection = client.db("carShopDB").collection("products");

    // Get all products
    app.get("/products", async (req, res) => {
      const products = await productCollection.find().toArray();
      res.send(products);
    });
    // Get all products by category
    app.get("/products/:category_id", async (req, res) => {
      const id = req.params.category_id;
      const query = { category_id: id };
      const products = await productCollection.find(query).toArray();
      res.send(products);
    });

    // Add new product
    app.post("/products", async (req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.send(result);
    });

    // Update product
    app.put("/products/:id", async (req, res) => {
      const id = req.params.id;
      const product = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateProduct = {
        $set: { ...product },
      };

      try {
        const result = await productCollection.updateOne(
          filter,
          updateProduct,
          options
        );
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Error updating product" });
      }
    });

    // Delete product
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      try {
        const result = await productCollection.deleteOne(filter);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Error deleting product" });
      }
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to the express MongoDB CRUD server!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
