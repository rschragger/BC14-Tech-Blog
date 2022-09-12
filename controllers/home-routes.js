const router = require('express').Router();
const { User, Posts, Comments, CommentsUser } = require('../models');
const { Op } = require("sequelize");

const { withAuth } = require('../utils/auth');
const modularUtils = require('../utils/ModularUtils');


router.get('/', async (req, res) => {
  // Posts is the basic building block

  /* Made this modular - modularUtils.getPostsData()
   const postsData = await Posts.findAll({
    include: [{ model: User }, { model: Comments, include: [{ model: CommentsUser }] }],
    attributes:{exclude: ["password"]},
  })
    .catch(err => console.log(err));
  const posts = postsData.map((obj) => obj.get({ plain: true }));
*/

  const loggedInUser = await modularUtils.getLoggedInUser(req.session.loggedIn, req.session.userId);

  const posts = await modularUtils.getPostsData()

  const userPosts = posts.map((obj)=>{
    if(!loggedInUser){return}
    if(obj.user_id===loggedInUser.id){ return obj.id }
  })

  console.log(loggedInUser)

  res.render('homepage',
    {
      posts,
      userPosts,
      loggedInUser,
      postsView: true
    })

});

router.get('/search/:searchTerm', async (req, res) => {
  const loggedInUser = await modularUtils.getLoggedInUser(req.session.loggedIn, req.session.userId);


  // Get all the search results
  // const searchResults = await modelUtility.searchAll(req.params.searchTerm, req.query);

  const postsData = await Posts.findAll({
    include: [{ model: User }, { model: Comments, include: [{ model: CommentsUser }] }],
    where: {
      [Op.or]:[
			{title: {[Op.substring]: req.params.searchTerm}},
      {text: {[Op.substring]: req.params.searchTerm}},
      {'$comments.comment$': {[Op.substring]: req.params.searchTerm}},
      // {'$user.first_name$': {[Op.substring]: req.params.searchTerm}},
      // {'$user.last_name$': {[Op.substring]: req.params.searchTerm}},
       {'$user.username$': {[Op.substring]: req.params.searchTerm}},
    ],
		},
    order:[['createdAt','DESC']]
  })
    .catch(err => console.log(err));
  const posts = postsData.map((obj) => obj.get({ plain: true }));

  const userPosts = posts.map((obj)=>{
    if(obj.user_id===loggedInUser.id){ return obj.id }
  })
  
	res.render('homepage', {
    // loggedInUser,
    // loggedIn: req.session.loggedIn,
    // searchResults,
    // isSearching: true,

    // searchedTerm: req.params.searchTerm

    posts,
      userPosts,
      loggedInUser,
      postsView: true
	});
});


router.get('/login', async (req, res) => {
  // Display the login page
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('homepage',
    {
      loginView: true
    })
})

router.get('/signup', async (req, res) => {

  // Display the signup page
  res.render('homepage',
    {
      signupView: true
    });
})


module.exports = router;


