//const { getAttributes } = require("../../models/User");
//const { withAuth } = require('../utils/auth');

const searchForm = document.getElementById("search-form");


const doSearchFormHandler = async (evt) => {
	if (evt.key === "Enter") {
		evt.preventDefault();
		
		//Retrieve all the values
		const searchTerm = evt.target.value.toLowerCase() == "" ? "all" : evt.target.value.toLowerCase();
		
		let searchURL = `/search/${searchTerm}`;
		
		
		// Go to the search page with the search term and all filters
		window.location = searchURL;
	}
	
}

searchForm.addEventListener("keypress", doSearchFormHandler);



document.querySelector("#search-form").addEventListener("submit", doSearchFormHandler);
