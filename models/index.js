const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');


// Belongs to and has many linkage initialisations

Posts.belongsTo(User, {
    foreignKey: 'user_id',
});
User.hasMany(Posts, {
    foreignKey: 'user_id',
});

Comments.belongsTo(Posts, {
    foreignKey: 'posts_id',
});
Posts.hasMany(Comments, {
    foreignKey: 'posts_id',
});


module.exports = { User, Posts, Comments };