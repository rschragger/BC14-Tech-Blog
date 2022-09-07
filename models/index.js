const User = require('./User');
const Posts = require('./Posts');


// Belongs to and has many linkage initialisations

Posts.belongsTo(User, {
    foreignKey: 'user_id',
});
User.hasMany(Posts, {
    foreignKey: 'user_id',
});


module.exports = { User, Posts };