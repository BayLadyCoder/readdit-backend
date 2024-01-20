exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: 'First Post', content: 'This is the first post!' }],
  });
};

exports.createPost = (req, res, next) => {
  const { title, content } = req.body;

  // TODO: create post in db
  res.status(201).json({
    message: 'Post crested successfully!',
    post: { id: new Date().toISOString(), title, content },
  });
};
