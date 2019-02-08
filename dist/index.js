const add = document.querySelector('button');
const searchBar = document.querySelector('.search');
const searchResults = document.querySelector('.searchResults');
const selectedFoodName = document.querySelector('#selectedFoodName');
const foodServingSize = document.querySelector('#servingSize');
const foodCalorie = document.querySelector('#calorie');
const foodProtein = document.querySelector('#protein');
const foodCarbs = document.querySelector('#carbs');
const foodFat = document.querySelector('#fat');
const foodFiber = document.querySelector('#fiber');
const changeServing = document.querySelector('#changeServing');

const addToList = document.querySelector('.addToList');
const listAdded = document.querySelector('.list_Added');

const totalCalories = document.querySelector('.totalCalories');
const totalProtein = document.querySelector('.totalProtein');
const totalCarbs = document.querySelector('.totalCarbs');
const totalFat = document.querySelector('.totalFat');
const totalFiber = document.querySelector('.totalFiber');
// const selectedList = document.querySelector('.')

// const input = '';

const state = {};

// Class of food
class Food {
	constructor(foodName, servingGrams, calories, protein, carbs, fat, fiber, ID) {
		this.foodName = foodName;
		this.servingGrams = servingGrams;
		this.calories = calories;
		this.protein = protein;
		this.carbs   = carbs;
		this.fat     = fat;
		this.fiber   = fiber;
		this.ID = ID;
	}
	
	async getNutritionData() {
		
		var formData = new URLSearchParams()
		formData.set('query', this.foodName)

		const result = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {

			method: 'POST',
			headers: {
				"x-app-id": "f11026c8", 
				"x-app-key":"c18be052fccd97ed5f4b5197e27aaacd",
				// 'Content-type': 'application/x-www-form-urlencoded',
				// "x-remote-user-id": "0"
			},
			body: formData

			})
			.then(response => {
				return response.json();
			})
			.then(results => {
				const n = 0;

				this.servingGrams = results.foods[n].serving_weight_grams;
				this.calories = results.foods[n].nf_calories;
				this.protein = results.foods[n].nf_protein;
				this.carbs   = results.foods[n].nf_total_carbohydrate;
				this.fat     = results.foods[n].nf_total_fat;
				this.fiber   = results.foods[n].nf_dietary_fiber;
			})
		}
};

// class Total {
// 	constructor(caloriesTotal, proteinTotal, carbsTotal, fatTotal, fiberTotal) {
// 		this.caloriesTotal = caloriesTotal;

// 	}
// }
///////////////////////////////////////////////////

searchBar.addEventListener('keydown', event => {
	if (event.keyCode === 13) {

		const input = searchBar.value;
		// console.log(getInput)

		state.search = new Searh(input);


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

// INPUT FIELD & 1ST COLUMN - Display search results
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
/////////
// INPUT FIELD & 1ST COLUMN - Display search results
window.addEventListener('load', () => {
	const input = 'chicken';
	// console.log(getInput)

	// fetch data from Nutrionix v2/search/instant
	const nameData = fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${input}`, {
		method: 'GET',
		headers: {
		"x-app-id": "f11026c8", 
		"x-app-key":"c18be052fccd97ed5f4b5197e27aaacd"
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

// 1ST COLUMN - CHOOSE FOOD
searchResults.addEventListener('click', async e => {
	
	if (e.target && e.target.matches('TD')) {
		var foodName = e.target.id;
		// console.log(foodName);
	}

	// store chosen food in currentFood
	state.currentFood = new Food(foodName);
	await state.currentFood.getNutritionData();

	// Display current nutrition value in UI
	selectedFoodName.innerHTML = foodName.toUpperCase();
	foodServingSize.value = state.currentFood.servingGrams;
	foodCalorie.innerHTML = state.currentFood.calories;
	foodProtein.innerHTML = state.currentFood.protein;
	foodCarbs.innerHTML   = state.currentFood.carbs;
	foodFat.innerHTML     = state.currentFood.fat;
	foodFiber.innerHTML   = state.currentFood.fiber;

	oldServingSize = parseFloat(foodServingSize.value);
	oldFoodCalorie = parseFloat(foodCalorie.innerHTML);
	oldFoodProtein = parseFloat(foodProtein.innerHTML);
	oldFoodCarbs = parseFloat(foodCarbs.innerHTML);
	oldFoodFat = parseFloat(foodFat.innerHTML);
	oldFoodFiber = parseFloat(foodFiber.innerHTML);

});


// 2ND COLUMN - change nutrition value base on serving size
changeServing.addEventListener('click', () => {

	newServingSize = parseFloat(foodServingSize.value);

	// Check if input is valid
	if (newServingSize !== 0 && newServingSize > 0) {
		
		// Calculate new nutrition with new Serving Size
		const newCalories = calcNewData(oldFoodCalorie,oldServingSize, newServingSize);
		const newProtein = calcNewData(oldFoodProtein,oldServingSize, newServingSize);
		const newCarbs   = calcNewData(oldFoodCarbs,oldServingSize, newServingSize);
		const newFat     = calcNewData(oldFoodFat,oldServingSize, newServingSize);
		const newFiber   = calcNewData(oldFoodFiber,oldServingSize, newServingSize);

		console.log(newCalories, newProtein, newCarbs, newFat, newFiber);

		// Display new nutrition value in UI
		foodCalorie.innerHTML = newCalories;
		foodProtein.innerHTML = newProtein;
		foodCarbs.innerHTML   = newCarbs;
		foodFat.innerHTML     = newFat;
		foodFiber.innerHTML   = newFiber;

		// Delete old serving nutrition value
		delete state.currentFood;

		state.currentFood = new Food();

		state.currentFood.foodName = selectedFoodName.innerHTML.toLowerCase();
		state.currentFood.servingGrams = newServingSize;
		state.currentFood.calories = newCalories;
		state.currentFood.protein = newProtein;
		state.currentFood.carbs = newCarbs;
		state.currentFood.fat = newFat;
		state.currentFood.fiber = newFiber;
			
	} else {
		alert('Please select a food or enter the correct number')
	}
});


// 2ND COLUMN - Add Select Food to List
// declare array to store selected food
const listOfSelected = [];
let item;
// let caloriesTotal = 0, proteinTotal = 0, carbsTotal = 0, fatTotal= 0, fiberTotal=0;
// assign id to html element
var idNum = 0;

addToList.addEventListener('click', () => {
	// store foo
	item = state.currentFood;


	// Push item into selected List
	listOfSelected.push(item);
	console.log(listOfSelected);

	// Display Food in 3rd Column
	const listAddedMarkup = 
	`<tr class="food_In_list">
	    <td>${item.foodName}</td>     
	    <td class="servingSize_food_In_List">${item.servingGrams}</td>
	    <td>gram(s)</td>        
	    <td class="remove_Btn" id="${idNum}"> x </td> 
	  </tr>
	`;

	listAdded.insertAdjacentHTML('beforeend', listAddedMarkup);

	// increment id after each added item
	idNum++;

	// 4TH COLUMN
	let caloriesTotal = 0, proteinTotal = 0, carbsTotal = 0, fatTotal= 0, fiberTotal=0;
	listOfSelected.forEach( e => {
		// [food1, food2, food3]
		// 
		caloriesTotal = caloriesTotal + e.calories;
		proteinTotal = proteinTotal + e.protein;
		carbsTotal = carbsTotal + e.carbs;
		fatTotal = fatTotal + e.fat;
		fiberTotal = fiberTotal + e.fiber;
	})

	totalCalories.innerHTML = parseFloat(caloriesTotal).toFixed(2);
	totalProtein.innerHTML = parseFloat(proteinTotal).toFixed(2);
	totalCarbs.innerHTML = parseFloat(carbsTotal).toFixed(2);
	totalFat.innerHTML = parseFloat(fatTotal).toFixed(2);
	totalFiber.innerHTML = parseFloat(fiberTotal).toFixed(2);
	
});

// 3RD COLUMN - Delete a food item
listAdded.addEventListener('click', e => {
	if (e.target && e.target.matches('.remove_Btn')) {
		// return ID from html element
		let id = parseInt(e.target.id);
		console.log(id);
		console.log(listOfSelected[id]);

		// remove food from UI
		const node = document.getElementById(`${id}`);
		const nodeParent = node.parentElement;
		while (nodeParent.firstChild) {
			nodeParent.removeChild(nodeParent.firstChild);
		};
		
		// delete item in listOfSelected
		delete listOfSelected[id];

		caloriesTotal = 0, proteinTotal = 0, carbsTotal = 0, fatTotal= 0, fiberTotal=0;

		// Update nutrition total 
		listOfSelected.forEach( e => {
		// [food1, food2, food3]
		// 
			caloriesTotal = caloriesTotal + e.calories;
			proteinTotal = proteinTotal + e.protein;
			carbsTotal = carbsTotal + e.carbs;
			fatTotal = fatTotal + e.fat;
			fiberTotal = fiberTotal + e.fiber;
		})

		totalCalories.innerHTML = caloriesTotal;
		totalProtein.innerHTML = proteinTotal;
		totalCarbs.innerHTML = carbsTotal;
		totalFat.innerHTML = fatTotal;
		totalFiber.innerHTML = fiberTotal;
		// Iterate through listOfSelected again to count total nutrition data
	}
});



// Calculate new nutrition value with new Serving Size
function calcNewData(foodNutrition, oldServingNum, newServingNum) {
	const newData = parseFloat((foodNutrition / oldServingNum) * newServingNum).toFixed(2);	
	return parseFloat(newData);
};


/////OLD CODE///////
	// var formData = new URLSearchParams()
	// formData.set('query', foodName)


	// var nutritionData = fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {

	// 	method: 'POST',
	// 	headers: {
	// 		"x-app-id": "f11026c8", 
	// 		"x-app-key":"c18be052fccd97ed5f4b5197e27aaacd",
	// 		// 'Content-type': 'application/x-www-form-urlencoded',
	// 		// "x-remote-user-id": "0"
	// 	},
	// 	body: formData

	// })
	// .then(response => {
	// 	return response.json();
	// })
	// .catch(error => console.log(error))

	// nutritionData.then(results => {
	// 	const n = 0;

	// 	// console.log(results.foods[n].serving_weight_grams);
	// 	selectedFoodName.innerHTML = (results.foods[n].food_name).toUpperCase();
	// 	foodServingSize.value = results.foods[n].serving_weight_grams;
	// 	foodCalorie.innerHTML = results.foods[n].nf_calories;
	// 	foodProtein.innerHTML = results.foods[n].nf_protein;
	// 	foodCarbs.innerHTML   = results.foods[n].nf_total_carbohydrate;
	// 	foodFat.innerHTML     = results.foods[n].nf_total_fat;
	// 	foodFiber.innerHTML   = results.foods[n].nf_dietary_fiber;

	// 	const foodNameInList = results.foods[n].food_name;

	// 	// state.foodBeforeList = new Food(

	// 	// 	foodNameInList, 
	// 	// 	oldServingSize, 
	// 	// 	oldFoodCalorie, 
	// 	// 	oldFoodProtein, 
	// 	// 	oldFoodCarbs, 
	// 	// 	oldFoodFat, 
	// 	// 	oldFoodFiber

	// 	// );

	// })

	// // state.foodBeforeList = new Food(foodNameInList, oldServingSize, oldFoodCalorie, oldFoodProtein, oldFoodCarbs, oldFoodFat, oldFoodFiber);
	// console.log(state.foodBeforeList);	

