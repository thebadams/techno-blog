const router = require('express').Router();
const auth = require('../utils/auth');

router.get('/', async (req, res) => {
  console.log(res.session);
  res.render('homepage');
});

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

router.get('/dashboard', async (req, res) => {
  res.render('dashboard');
});

module.exports = router;
