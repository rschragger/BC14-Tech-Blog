const User = require('./User');
const CommentsUser = require('./User');

const Posts = require('./Posts');

const Comments = require('./Comments');
const OtherComments =  require('./Comments');

// Belongs to and has many linkage initialisations

Posts.belongsTo(User, {
    foreignKey: 'user_id',
});
User.hasMany(Posts, {
    foreignKey: 'user_id',
});


Comments.belongsTo(Posts, {
    foreignKey: 'posts_id',
    onDelete: 'cascade',
});
Posts.hasMany(Comments, {
    foreignKey: 'posts_id',
     onDelete: 'cascade', 
});

Comments.belongsTo(CommentsUser, {
    foreignKey: 'user_id',
    onDelete: 'no action'
});
CommentsUser.hasMany(Comments, {
    foreignKey: 'user_id',
});

// OtherComments.belongsTo(CommentsUser, {
//     foreignKey: 'comments_id',
// });
// Comments.hasMany(OtherComments, {
//     foreignKey: 'comments_id',
// });


module.exports = { User, Posts, Comments, CommentsUser, OtherComments };