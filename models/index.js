const User = require('./User');


// Belongs to and has many linkage initialisations

// User.belongsTo(Stallholder, {
//   foreignKey: 'stallholder_id',
// });
// Stallholder.hasMany(User, {
//   foreignKey: 'stallholder_id',
// });


module.exports = { User };

