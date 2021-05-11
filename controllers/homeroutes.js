const router = require('express').Router();
const auth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

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
  if (req.session.logged_in) {
    const userData = await User.findByPk(req.session.userId, {
      include: [{
        model: Post,
      },
      {
        model: Comment,
      }],
    });
    const user = userData.get({ plain: true });
    console.log(user);
    res.render('dashboard', {
      user,
      logged_in: req.session.logged_in,
    });
  } else {
    res.replace('/login');
  }
});

router.get('/post/:id', async (req, res) => {
  const postData = await Post.findByPk(req.params.id, {
    include: {
      model: Comment,
    },
  });
  const post = postData.get({ plain: true });
  res.render('post', {
    post,
    logged_in: req.session.logged_in,
  });
});

module.exports = router;
