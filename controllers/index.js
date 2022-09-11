const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const postRoutes = require('./post-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const newPostRoutes = require('./new-post-routes.js');
const editPostRoutes = require('./edit-post-routes.js');

const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/post', postRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/newpost', newPostRoutes);
router.use('/editpost', editPostRoutes);

router.use('/api', apiRoutes);

module.exports = router;
