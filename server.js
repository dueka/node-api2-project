require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const port = process.env.PORT || 5000;

const app = express();

const postsRouter = require("./posts/posts-router");
const server = express();

server.use(express.json());
server.use("/api/posts", postsRouter);
server.use(helmet());
server.use(cors());

server.get("/", (req, res) => {
  res.json("This API is alive");
});

module.exports = server;
