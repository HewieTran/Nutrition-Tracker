export default class Search {
	constructor(query) {
		this.query = query;
	}
	async getResults() {
		const res = fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${this.query}`, {
			method: 'GET',
			headers: {
			"x-app-id": "caa6104e", 
			"x-app-key":"1ea40dd5c9234ee38ef32d4fc7e8c2b0"
			// "x-remote-user-id ": "0"
			// "Content-Type" : "application/json"
			}
		})
		.then(response => {
			return response.json();
		})
		.catch(error => console.log(error));

		await res.then( result => {
			this.commonResult = result.common;
			return this.result;
		})
	}

};