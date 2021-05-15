// import router middleware and Comment model

const router = require('express').Router();
const { Comment } = require('../../models');
// set up post route to create a new comment.
router.post('/', async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
});
// export the router
module.exports = router;
