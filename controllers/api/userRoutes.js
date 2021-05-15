// import router
const router = require('express').Router();
// import User model
const { User } = require('../../models');
// set up route to get all Users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users[0]) {
      res.status(400).json({ message: 'No Users Found!' });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});
// set up route to create a new User
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});
// set up route to log in a user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { userName: req.body.userName },
    });
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log(req.session);
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You Are Now Logged In!', session: req.session });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
// set up route to logout a user
router.post('/logout', async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
// export the router
module.exports = router;
