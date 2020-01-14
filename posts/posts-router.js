const express = require("express");
const Posts = require("../data/db");
const router = express.Router();

router.get("/api/posts", (req, res) => {
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "The posts information could not be retrieved."
      });
    });
});
