// import axios from 'axios';

const add = document.querySelector('button');
const searchBar = document.querySelector('.search');
const searchResults = document.querySelector('.searchResults');
const foodServingSize = document.querySelector('#servingSize')
const foodCalorie = document.querySelector('#calorie');
const foodProtein = document.querySelector('#protein');
const foodCarbs = document.querySelector('#carbs');
const foodFat = document.querySelector('#fat');
const foodFiber = document.querySelector('#fiber');
const changeServing = document.querySelector('#changeServing');

const addToList = document.querySelector('.addToList');

const input = '';

const state = {};




///////////////////////////////////////////////////

searchBar.addEventListener('keydown', event => {
	if (event.keyCode === 13) {

		const input = searchBar.value;
		// console.log(getInput)

		// fetch data from Nutrionix v2/search/instant
		const data = fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${input}`, {
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

		// Using async function to execute 
		const displaySearchResults = async () => {
			// Clear previous results before displaying results
			searchResults.innerHTML = '';

			// await converts the value to a resolved promise
			var resultsColumn = await
			// capture result
			data.then(result => {
				console.log(result);		
				// iterate through each common food item
				result.common.forEach(commonData => {
					
					// Markup for SEARCH RESULT
					const searchResultsMarkUp = `
						<tr>
							<td scope="row" id="${commonData.food_name}">${commonData.food_name}</td>
					  	</tr>
					`;

					// display food name in UI
					searchResults.insertAdjacentHTML('beforeend', searchResultsMarkUp);
					
				})
			});
		};

		displaySearchResults();
	}
});

// add.addEventListener('click', () => {
// 	const input = searchBar.value;
// 	// console.log(getInput)

// 	// fetch data from Nutrionix v2/search/instant
// 	const nameData = fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${input}`, {
// 		method: 'GET',
// 		headers: {
// 		"x-app-id": "caa6104e", 
// 		"x-app-key":"1ea40dd5c9234ee38ef32d4fc7e8c2b0"
// 		// "x-remote-user-id ": "0"
// 		// "Content-Type" : "application/json"
// 		}
// 	})
// 	.then(response => {
// 		return response.json();
// 	})
// 	.catch(error => console.log(error));

// 	// Using async function to execute 
// 	const displaySearchResults = async () => {
// 		// Clear previous results before displaying results
// 		searchResults.innerHTML = '';

// 		// await converts the value to a resolved promise
// 		var resultsColumn = await
// 		// capture result
// 		nameData.then(result => {
// 			console.log(result);

// 			// iterate through each common food item
// 			result.common.forEach(commonData => {
				
// 				// Markup for SEARCH RESULT
// 				const searchResultsMarkUp = `
// 					<tr>
// 						<td scope="row" id="${commonData.food_name}">${commonData.food_name}</td>
// 				  	</tr>
// 				`;

// 				// display food name in UI
// 				searchResults.insertAdjacentHTML('beforeend', searchResultsMarkUp);
				
// 			})
// 		});
// 	};

// 	displaySearchResults();

// });

// TESTING
///////////
window.addEventListener('load', () => {
	const input = 'chicken';
	// console.log(getInput)

	// fetch data from Nutrionix v2/search/instant
	const nameData = fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${input}`, {
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

	// Using async function to execute 
	const displaySearchResults = async () => {
		// Clear previous results before displaying results
		searchResults.innerHTML = '';

		// await converts the value to a resolved promise
		var resultsColumn = await
		// capture result
		nameData.then(result => {
			// console.log(result);

			// iterate through each common food item
			result.common.forEach(commonData => {
				
				// Markup for SEARCH RESULT
				const searchResultsMarkUp = `
					<tr>
						<td scope="row" id="${commonData.food_name}">${commonData.food_name}</td>
				  	</tr>
				`;

				// display food name in UI
				searchResults.insertAdjacentHTML('beforeend', searchResultsMarkUp);
				
			})
		});
	};

	displaySearchResults();

});

// TOOK ME AN HOUR AND A HALF TO FIGURE OUT HOW TO RETURN VALUE INSIDE HTML ELEMENT // e.target.id

searchResults.addEventListener('click', e => {
	
	if (e.target && e.target.matches('TD')) {
		var foodName = '';
		foodName = e.target.id;
		console.log(foodName);
	}

	var formData = new URLSearchParams()
	formData.set('query', foodName)


	var nutritionData = fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {

		method: 'POST',
		headers: {
			"x-app-id": "caa6104e", 
			"x-app-key":"1ea40dd5c9234ee38ef32d4fc7e8c2b0",
			'Content-type': 'application/x-www-form-urlencoded',
			"x-remote-user-id": "0"
		},
		body: formData

	})
	.then(response => {
		return response.json();
	})
	.catch(error => console.log(error))

	nutritionData.then(results => {
		const n = 0;

		console.log(results.foods[n].serving_weight_grams);

		foodServingSize.value = results.foods[n].serving_weight_grams;
		foodCalorie.innerHTML = results.foods[n].nf_calories;
		foodProtein.innerHTML = results.foods[n].nf_protein;
		foodCarbs.innerHTML = results.foods[n].nf_total_carbohydrate;
		foodFat.innerHTML = results.foods[n].nf_total_fat;
		foodFiber.innerHTML = results.foods[n].nf_dietary_fiber;

		oldServingSize = parseFloat(foodServingSize.value);
		oldFoodCalorie = parseFloat(foodCalorie.innerHTML);
		oldFoodProtein = parseFloat(foodProtein.innerHTML);
		oldFoodCarbs = parseFloat(foodCarbs.innerHTML);
		oldFoodFat = parseFloat(foodFat.innerHTML);
		oldFoodFiber = parseFloat(foodFiber.innerHTML);
	})

});


changeServing.addEventListener('click', () => {
	newServingSize = parseFloat(foodServingSize.value);

	if (newServingSize !== 0 && newServingSize > 0) {
		
		// console.log(parseInt(foodServingSize.value));
		// let newData = {
			// newServingSize = parseFloat(foodServingSize.value),
			// newCalorie = parseFloat(foodCalorie.innerHTML),
			// newProtein = parseFloat(foodProtein.innerHTML),
			// newCarbs = parseFloat(foodCarbs.innerHTML),
			// newFat = parseFloat(foodFat.innerHTML),
			// newFiber = parseFloat(foodFiber.innerHTML)
		// }
		const newCalorie = calcNewData(oldFoodCalorie,oldServingSize, newServingSize);
		const newProtein = calcNewData(oldFoodProtein,oldServingSize, newServingSize);
		const newCarbs = calcNewData(oldFoodCarbs,oldServingSize, newServingSize);
		const newFat = calcNewData(oldFoodFat,oldServingSize, newServingSize);
		const newFiber = calcNewData(oldFoodFiber,oldServingSize, newServingSize);

		console.log(newCalorie, newProtein, newCarbs, newFat, newFiber);

		foodCalorie.innerHTML = newCalorie;
		foodProtein.innerHTML = newProtein;
		foodCarbs.innerHTML = newCarbs;
		foodFat.innerHTML = newFat;
		foodFiber.innerHTML = newFiber;

	} else {
		alert('Please select a food or enter the correct number')
	}
});



// Calculate new nutrition value with new Serving Size
function calcNewData(foodNutrition, oldServingNum, newServingNum) {
	const newData = parseFloat((foodNutrition / oldServingNum) * newServingNum).toFixed(2);	
	return parseFloat(newData);
	console.log('hi');
};

//


