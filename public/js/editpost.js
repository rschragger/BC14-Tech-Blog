const editPostFormHandler = async (event) => {
	event.preventDefault();

	const editPostForm = document.getElementById("edit-post-form");

	const post_id = editPostForm.getAttribute("data-id-post");
	const user_id = editPostForm.getAttribute("data-id-user");

	const title = document.getElementById("post-title").value.trim();
	const text = document.getElementById("post-text").value.trim();

	//needs to have both title and text to post
	if (title && text) {
		const response = await fetch(`/api/posts/${post_id}`, {
			method: 'PUT',
			body: JSON.stringify({

				user_id,
				title,
				text,
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
			window.location = '/dashboard';
		}
	}
	else {
		let errorDiv = document.getElementById('error-message')
		errorDiv.textContent = "Please write in both title and text fields to post"
	}
}

const deletePostHandler = async (event) => {
	event.preventDefault()

const confirmDelete = confirm('Do you want to delete this post?')
if(confirmDelete=== true){
	const deleteButton = document.getElementById("delete-button");

	const post_id = deleteButton.getAttribute("data-id-post");
	// const user_id = deleteButton.getAttribute("data-id-user"); //logged in user
	// const postUser_id = deleteButton.getAttribute("data-id-postuser"); //user who wrote post

	// if (user_id != postUser_id) {
	// 	alert("This is not your post to delete!");
	// 	window.location = '/';
	// }

	const response = await fetch(`/api/posts/${post_id}`, {
		method: 'DELETE',
		body: JSON.stringify({

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
		window.location = '/dashboard';
	}
	else {
		let errorDiv = document.getElementById('error-message')
		errorDiv.textContent = "This did not delete"
	}
}
errorDiv.textContent = "This did not delete"

}


document.querySelector("#edit-post-form").addEventListener("submit", editPostFormHandler);

document.querySelector("#delete-button").addEventListener("click", deletePostHandler);
