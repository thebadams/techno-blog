// import router and routes
const router = require('express').Router();
const homeRoutes = require('./homeroutes');
const apiRoutes = require('./api');
// set up router to use imported routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// export router
module.exports = router;
