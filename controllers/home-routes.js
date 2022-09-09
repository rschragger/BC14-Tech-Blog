const router = require('express').Router();
const { User, Posts, Comments,CommentsUser } = require('../models');
const { withAuth } = require('../utils/auth')

router.get('/', async (req, res) => {
  // Test to check if connection from models to controllers to views all work
  const postsData = await Posts.findAll({
    include: [{ model: User }, { model: Comments, include: [{ model: CommentsUser }] }]
  })
    .catch(err => console.log(err));
  const posts = postsData.map((obj) => obj.get({ plain: true }));

  // const commentsData = await Comments.findAll({
  //   include: [{
  //     model: User,
  //     include: [{ model: comments, include: [{ model: User }] }]
  //   }],
  //   // where:{
  //   //   posts_id : posts.id
  //   // }
  // })
  //   .catch(err => console.log(err));

  // const comments = commentsData.map((obj) => obj.get({ plain: true }));

  res.render('homepage', {
    posts,
    // comments
  })

});



module.exports = router;


