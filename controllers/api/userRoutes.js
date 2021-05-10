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

module.exports = router;
