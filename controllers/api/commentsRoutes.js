const router = require('express').Router();
const { Comments , Posts , User} = require('../../models');

// Retrieve all the Comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comments.findAll({
      include: [{ model: Posts }],//,{model:Comments}],
    });
    res.status(200).json({
      data: comments
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

// Retrieve one Comment
router.get('/:id', async (req, res) => {
  try {
    const comments = await Comments.findByPk(req.params.id,
      {      include: [{ model: Posts }],
    });

    res.status(200).json({
      data: comments
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

// Create a new Comments
router.post('/', async (req, res) => {
  try {
    const newComments = await Comments.create(req.body);

      res.status(200).json({
        data: newComments
      });
    // Check if the Comments already exists
   /* We can have the exact same post twice...not great, but not an issues either
    const commentsData = await Comments.findOne({
      where: {
        commentsname: req.body.comments_name
      },
      individualHooks: true,
    });
    

    if (!commentsData) {
      // The Comments doesn't exist so create a new Comments
      const newComments = await Comments.create(req.body);

      res.status(200).json({
        data: newComments
      });
    }
    else {
      // The Comments exists, prevent creating another Comments with the same Commentsname
      res.status(400).json({
        message: "The Commentsname has already been used!"
      });
    }*/
  }
  catch (err) {
    res.status(400).json(err);
  }
});


// Update the Comments data
router.put('/:id', async (req, res) => {
  try {
    const updatedComments = await Comments.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true,
    });

    if (!updatedComments[0]) {
      // No Comments exists with this id
      res.status(404).json({
        message: "No Comments with this id exists!"
      });

      return;
    }

    // the Comments exists and has been updated
    res.status(200).json({
      data: updatedComments,
      message: "Comments is updated!"
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

// Delete the Comments data
router.delete('/:id', async (req, res) => {
  try {
    const deletedComments = await Comments.destroy( {
      where: {
        id: req.params.id
      },
    });
    if (!deletedComments) {
      // No Comments exists with this id
      res.status(404).json({
        message: "No Comments with this id exists so nothing has been done!"
      });
      return;
    }
    // the Comments exists and has been updated
    res.status(200).json({
      message: `Comments ${req.params.id} is deleted!`
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});
module.exports = router;