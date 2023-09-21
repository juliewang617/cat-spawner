import express from "express";
import {Db, MongoClient} from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";
require("dotenv").config(".env");
import {ObjectId} from 'mongodb';

const app = express();
const port = 8080; // Default port to listen on.
let db: Db;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

// Routes -------------------------

// Returns a list of all cats
app.get("/posts", async (req, res) => {
  const collection = db.collection("posts");
  const result = await collection.find({}).toArray()
  return res.json(result);
});

// Increment like count
app.patch('/posts/:postId/like', async (req, res) => {
  const postID = req.params.postId;
  const collection = db.collection("posts");
  try {
      const result = await collection.updateOne(
        {_id: new ObjectId(postID)},
        {$inc: {likeCount: 1}});
      return res.json(result);
  } catch (e) {
      return res.status(404).send(`no course found with id ${postID}`);
  }
});

// Creates a new cat
app.post("/posts", async (req, res) => {
  const postBodyData = req.body;
  const collection = db.collection("posts");
  const newPost = {title: postBodyData.title, body: postBodyData.body, image: postBodyData.image, likeCount: 0};
  try {
      await collection.insertOne(newPost);
      return res.json(newPost);
  } catch (e) {
      return res.status(500).send();
  }
});

// Gets a given cat 
app.get("/posts/:postID", async (req, res) => {
  const postID = req.params.postID;
  const collection = db.collection("posts");
  try {
      const result = await collection.findOne({_id: new ObjectId(postID)});
      return res.json(result);
  } catch (e) {
      return res.status(404).send(`no cat found with id ${postID}`);
  }
});

// Deletes a cat 
app.delete("/posts/:postId/delete", async (req, res) => {
  const postID = req.params.postId;
  const collection = db.collection("posts");
  try {
      const result = await collection.deleteOne({_id: new ObjectId(postID)});
      return res.json(result);
  } catch (e) {
      return res.status(404).send(`no cat found with id ${postID}`);
  }
});

// Starts the Express server.
function start() {
  const client = new MongoClient(process.env.ATLAS_URI);
  client
    .connect()
    .then(() => {
      console.log("Connected successfully to server");
      db = client.db("database");
      app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.log("error connecting to mongoDB!", err);
    });
}

start();
