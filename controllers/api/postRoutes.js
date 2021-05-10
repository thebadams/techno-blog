const router = require('express').Router();
const { Post } = require('../../models');

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

module.exports = router;
