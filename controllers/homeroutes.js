const router = require('express').Router();
const auth = require('../utils/auth');
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
  const postsData = await Post.findAll({
    include: [
      {
        model: User,
      },
    ],
  });
  const posts = postsData.map((post) => post.get({ plain: true }));
  console.log(posts);
  res.render('homepage', {
    posts,
    logged_in: req.session.logged_in,
  });
});

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

router.get('/dashboard', async (req, res) => {
  res.render('dashboard', {
    logged_in: req.session.logged_in,
  });
});

module.exports = router;
