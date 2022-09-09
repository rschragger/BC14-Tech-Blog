const {Comments, User} = require('../models')
const moment = require('moment')

// This will help handlebars start an index at 1 insteadmof 0
const incremented = (index) => {
    index++;
    return index;
}

https://stackoverflow.com/questions/18580495/format-a-date-from-inside-a-handlebars-template-in-meteor
var DateFormats = {
    short: "DD/MM/YYYY",
    short2: "DD-MMMM-YYYY",
    long: 'Do MMM YYYY, h:mm a',
    dayLong: 'ddd Do MMM YYYY, h:mm a',
    timeOnly: 'hh:mm a',
};

const formatDate = (datetime, format) => {
    if (moment) {
        // can use other formats like 'lll' too
        format = DateFormats[format] || format;
        return moment(datetime).format(format);
    }
    else {
        return datetime;
    }
}

// https://axiacore.com/blog/check-if-item-array-handlebars-547/
const ifIn = (elem, array, options) => {
    if (array.indexOf(elem) > -1) {
        return options.fn(this);
    }
    return options.inverse(this);
};


// const commentsFromPosts = async (postId, options)=>{
// const commentsData = await Comments.findAll({
//     include: [{ model: User }],
//     where:{
//       posts_id : postId
//     }
//   })
//     .catch(err => console.log(err));

//     return commentsFromPosts = commentsData.map((obj) => obj.get({ plain: true }));
// }

const commentsFromPosts =  (postId)=>{
    return [{ comment:`Test - ${postId}`}]
    // return { comment:`Test - ${postId}`}
}


module.exports = {
    incremented,
    commentsFromPosts,
    formatDate
}