const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({
        posts,
      });
    })
    .catch((err) => next(err));
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is invalid.');
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const { title, content } = req.body;
  const post = new Post({
    title,
    content,
    imageUrl: 'images/duck.jpg',
    author: { name: 'Bay' },
  });

  post
    .save()
    .then((post) => {
      res.status(201).json({
        message: 'Post created successfully!',
        post,
      });
    })
    .catch((err) => next(err));
};
