
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
      id: req.session.userId
    }
  })
    .catch(err => console.log(err));
  const posts = postsData.map((obj) => obj.get({ plain: true }));
  res.render('homepage',
    {
      loggedInUser,
      posts,
      postsView: true
    })

});


module.exports = router;


