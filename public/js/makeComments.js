//const { getAttributes } = require("../../models/User");
//const { withAuth } = require('../utils/auth');

const commentReply = document.getElementsByClassName("comment-reply");


const makeCommentForm = () => {
	event.stopPropagation()
	event.preventDefault();

	let userIdDiv = document.getElementById('loggedInUser')
	let user_id = userIdDiv.getAttribute('data-loggedInId')

	let thisPostId = event.currentTarget.getAttribute("id");
	let post_id = event.currentTarget.getAttribute("data-post-id");
	if (thisPostId.includes('comment')) {
		comment_id = event.currentTarget.getAttribute("data-comment-id");
	} else { comment_id = null };

	// destroy any other forms
	if (document.getElementById('new-comment-form')) {
		let delDiv = document.getElementById('new-comment-form');
		delDiv.outerHTML = ''
	}
	// console.log(
	// 	thisPostId, post_id, comment_id
	// )
	const newFormDiv = document.getElementById(`add-form-${post_id}`)
	//	<label for="comment-text" class="form-label"></label>

	newFormDiv.innerHTML = `<form id="new-comment-form" class="post-card-form" data-user-id="${user_id}" data-post-id="${post_id}" data-comment-id="${comment_id}">

<div>
<textarea cols="10" rows="3" class="form-control" id="comment-text"></textarea>
</div>

<button type="submit" class="btn btn-form btn-center" data-user-id="${user_id}" data-post-id="${post_id}" data-comment-id="${comment_id}">Comment</button>
<hr>
</form>`

	document.querySelector("#new-comment-form").addEventListener("submit", newCommentFormHandler);


}

const newCommentFormHandler = async (event) => {
	event.preventDefault();

	const newCommentForm = document.getElementById("new-comment-form");

	const user_id = newCommentForm.getAttribute("data-user-id")
	const posts_id = newCommentForm.getAttribute("data-post-id")
	let comments_id = newCommentForm.getAttribute("data-comment-id")
	if (comments_id === 'null') { comments_id = null }

	const comment = document.getElementById('comment-text').value.trim();

	//needs to have comment text and at least user and post ids to post
	if (user_id && posts_id && comment) {
		const response = await fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify({
				/*
				user_id,
				posts_id,
				comments_id,
				comment
*/
				
				"user_id":user_id,
				"posts_id":posts_id,
				"comments_id":comments_id,
				"comment":comment
				
			}),
			headers: {
				'content-type': 'application/json'
			}
		})
			.catch(err => {
				console.log(err);
			});

		// If ok, Redirect to the home page
		if (response.ok) {
			window.location = `/post/${posts_id}`;
		}
	}
	else {
		let errorDiv = document.getElementById('error-message')
		errorDiv.textContent = "Please write in both title and text fields to post"
	}

}


for (let i = 0; i < commentReply.length; i++) {
	const element = commentReply[i];
	element.addEventListener("click", makeCommentForm);
}

