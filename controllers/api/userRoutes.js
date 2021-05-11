const router = require('express').Router();
const { User } = require('../../models');

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

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

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

module.exports = router;
