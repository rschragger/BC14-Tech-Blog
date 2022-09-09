const router = require('express').Router();
const { Posts , User, Comments, CommentsUser} = require('../../models');

// Retrieve all the Posts
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.findAll({
     include: [{ model: Comments },{model: User}],
    });
    res.status(200).json({
      data: posts
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

// Retrieve one Post
router.get('/:id', async (req, res) => {
  try {
    const posts = await Posts.findByPk(req.params.id,{
      include: [{ model: Comments, include:[{model: CommentsUser}] },{model: User}],
    });

    res.status(200).json({
      data: posts
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

// Create a new Posts
router.post('/', async (req, res) => {
  try {
    const newPosts = await Posts.create(req.body);

      res.status(200).json({
        data: newPosts
      });
    // Check if the Posts already exists
   /* We can have the exact same post twice...not great, but not an issues either
    const postsData = await Posts.findOne({
      where: {
        postsname: req.body.posts_name
      },
      individualHooks: true,
    });
    

    if (!postsData) {
      // The Posts doesn't exist so create a new Posts
      const newPosts = await Posts.create(req.body);

      res.status(200).json({
        data: newPosts
      });
    }
    else {
      // The Posts exists, prevent creating another Posts with the same Postsname
      res.status(400).json({
        message: "The Postsname has already been used!"
      });
    }*/
  }
  catch (err) {
    res.status(400).json(err);
  }
});


// Update the Posts data
router.put('/:id', async (req, res) => {
  try {
    const updatedPosts = await Posts.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true,
    });

    if (!updatedPosts[0]) {
      // No Posts exists with this id
      res.status(404).json({
        message: "No Posts with this id exists!"
      });

      return;
    }

    // the Posts exists and has been updated
    res.status(200).json({
      data: updatedPosts,
      message: "Posts is updated!"
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

// Delete the Posts data
router.delete('/:id', async (req, res) => {
  try {
    const deletedPosts = await Posts.destroy( {
      where: {
        id: req.params.id
      },
    });
    if (!deletedPosts) {
      // No Posts exists with this id
      res.status(404).json({
        message: "No Posts with this id exists so nothing has been done!"
      });
      return;
    }
    // the Posts exists and has been updated
    res.status(200).json({
      message: `Posts ${req.params.id} is deleted!`
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});
module.exports = router;