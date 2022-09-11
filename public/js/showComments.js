//const { getAttributes } = require("../../models/User");
//const { withAuth } = require('../utils/auth');

const postCards = document.getElementsByClassName("post-card");


const commentToggle = () => {
	event.preventDefault();
	// if (withAuth) {
		let thisPostId = event.currentTarget.getAttribute("id")
		let commentId = thisPostId.replace("post-", "comments-")
		let commentDiv = document.getElementById(commentId)

		if (commentDiv.className.includes("comments-hidden")) {
			commentDiv.className = commentDiv.className.replace("comments-hidden", "comments-show")
		} else {
			commentDiv.className = commentDiv.className.replace("comments-show", "comments-hidden")
		}
	// }
}

for (let i = 0; i < postCards.length; i++) {
	const element = postCards[i];
	element.addEventListener("click", commentToggle);
}
