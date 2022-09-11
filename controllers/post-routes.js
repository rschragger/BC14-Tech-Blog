
const router = require('express').Router();
const { User, Posts, Comments, CommentsUser } = require('../models');
const { withAuth } = require('../utils/auth')

router.get('/:id', async (req, res) => {
  // Test to check if connection from models to controllers to views all work
  const postsData = await Posts.findAll({
    include: [{ model: User }, { model: Comments, include: [{ model: CommentsUser }] }],
    where:{
      id: req.params.id
    }
  })
    .catch(err => console.log(err));
  const posts = postsData.map((obj) => obj.get({ plain: true }));
  res.render('homepage',
    {
      posts,
      postsView: true
    })

});


module.exports = router;


