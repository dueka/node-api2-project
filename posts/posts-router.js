const express = require("express");
const Posts = require("../data/db");
const router = express.Router();

router.get("/", (req, res) => {
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

router.post("/", (req, res) => {
  const newPost = {
    title: req.body.title,
    contents: req.body.contents
  };

  if (!newPost.title || !newPost.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  insert(newPost)
    .then(post => {
      res.status(201).json(post);
      post;
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  findById(id)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else if (!text) {
        res
          .status(400)
          .json({ errorMessage: "Please provide text for the comment." });
      } else {
        insertComment({ text, post_id: id }).then(comment => {
          res.status(201).json(comment);
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    });
});
