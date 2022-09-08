const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const postsRoutes = require('./postsRoutes.js');
const commentsRoutes = require('./commentsRoutes.js');

router.use('/users', userRoutes);
router.use('/posts', postsRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;
