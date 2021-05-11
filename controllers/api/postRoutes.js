const router = require('express').Router();
const { Post, Comment } = require('../../models');

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

router.post('/', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

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
