const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const postsRoutes = require('./postsRoutes.js');

router.use('/users', userRoutes);
router.use('/posts', postsRoutes);

module.exports = router;
