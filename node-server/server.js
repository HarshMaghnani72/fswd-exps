const express = require("express");
const { connectMongo } = require("./connection");
const router = require("./router");

const app = express();
const port = 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectMongo("mongodb://127.0.0.1:27017/firstcollection")
  .then(() => console.log("MongoDB Connnected!!"))
  .catch((err) => console.error("Error", err));

app.use("/", router);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
