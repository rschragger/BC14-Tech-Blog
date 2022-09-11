
const router = require('express').Router();
const { User, Posts, Comments, CommentsUser } = require('../models');
const { withAuth } = require('../utils/auth')
const modularUtils = require('../utils/ModularUtils');

// const loggedInUser = async()=>{
//   return await modularUtils.getLoggedInUser(req.session.loggedIn,req.session.userId);
// }


router.get('/',withAuth, async (req, res) => {

  loggedInUser = await modularUtils.getLoggedInUser(req.session.loggedIn,req.session.userId);

  const postsData = await Posts.findAll({
    include: [{ model: User }, { model: Comments, include: [{ model: CommentsUser }] }],
    where:{
      user_id: req.session.userId
    },
    order:[['createdAt','DESC']]
  })
    .catch(err => console.log(err));
  const posts = postsData.map((obj) => obj.get({ plain: true }));

  const userPosts = posts.map((obj)=>{
    if(obj.user_id===loggedInUser.id){ return obj.id }
  })
  
  res.render('homepage',
    {
      loggedInUser,
      posts,
      userPosts,
      postsView: true , //This still uses the home view
    })

});


module.exports = router;


