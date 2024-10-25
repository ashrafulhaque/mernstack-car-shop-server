const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
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
    // Connect the client to the server (don't close the connection here)
    await client.connect();
    const userListCollection = client.db("carShopDB").collection("userList");

    app.get("/userList/:uid", async (req, res) => {
      const id = req.params.uid;
      const query = { uid: id };
      const result = await userListCollection.findOne(query);
      // console.log(result);
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
      console.log(id, user);

      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };

      // Update the document with all fields in the request body
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
        console.error("Error updating user:", error);
        res
          .status(500)
          .send({ error: "An error occurred while updating the user." });
      }
    });

    // Ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
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
