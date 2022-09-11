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
			window.location = '/';
		}
	}
	else {
		let errorDiv = document.getElementById('error-message')
		errorDiv.textContent = "Please write in both title and text fields to post"
	}
}


document.querySelector("#edit-post-form").addEventListener("submit", editPostFormHandler);
