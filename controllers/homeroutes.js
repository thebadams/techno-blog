// import the router
const router = require('express').Router();
// import the auth middleware
const auth = require('../utils/auth');
// import Post, User, Comment models
const { Post, User, Comment } = require('../models');
// set up route to get all Post and render the homepage
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
// set up route to render the login page
router.get('/login', async (req, res) => {
  res.render('login');
});
// set up route to render the signup page
router.get('/signup', async (req, res) => {
  res.render('signup');
});
// set up route to render the dashboard
router.get('/dashboard', auth, async (req, res) => {
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
// set up route to render a specific post page
router.get('/post/:id', auth, async (req, res) => {
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
// export the router
module.exports = router;
