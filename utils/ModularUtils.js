const { User, Posts, Comments, CommentsUser } = require('../models');
const { Op } = require("sequelize");
const moment = require('moment');

// Functions for modularity and reusability

const getLoggedInUser = async (loggedIn, userId) => {
	// Retrieve the logged in user, if there is one
	if (loggedIn) {
		const userDataDB = await User.findOne({
			include: [{ model: Posts }, { model: Comments, include: CommentsUser }],
			where: {
				id: userId
			}
		})
			.catch(err => {
				console.log(err);
				return null;
			});
		const userData = userDataDB.get({ plain: true });
		if (!userData) { return null }
		userData.loggedIn = true;
		return userData;
		// return userData?.get({ plain: true }) ?? null;
	}

	return null;
}


const getPostsData = async () => {

	// const searchOp = !userId ? '[Op.gt]': '[Op.eq]' ; //tried to make it all or by one
	// const searchTerm = !userId ? 0: userId;

	const postsData = await Posts.findAll({
		include: [{ model: User }, { model: Comments, include: [{ model: CommentsUser }] }],
		attributes: { exclude: ["password"] },
		// where: { id: { searchOp : searchTerm } },
		order:[['createdAt','DESC'],],
	})
		.catch(err => console.log(err));
	const posts = postsData.map((obj) => obj.get({ plain: true }));
	
	return posts
}

module.exports = {
	getLoggedInUser,
	getPostsData
}