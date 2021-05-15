// import the router
const router = require('express').Router();
// import post and comment
const { Post, Comment } = require('../../models');
// set up route to get all Posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    if (!posts[0]) {
      res.status(400).json({ message: 'No Posts Found!' });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});
// set up route to create a new post
router.post('/', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});
// set up a route to get a specific post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: {
        model: Comment,
      },
    });
    if (!post) {
      req.status(400).json({ message: 'No Post Found With That ID' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
