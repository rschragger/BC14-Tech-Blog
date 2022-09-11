const newPostFormHandler = async (event) => {
	event.preventDefault();

	const newPostForm = document.getElementById("new-post-form");

	const user_id = newPostForm.getAttribute("data-id")

	const title = document.getElementById("post-title").value.trim();
	const text = document.getElementById("post-text").value.trim();

	//needs to have both title and text to post
	if (title && text) {
		const response = await fetch('/api/posts', {
			method: 'POST',
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


document.querySelector("#new-post-form").addEventListener("submit", newPostFormHandler);
