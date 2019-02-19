const errorResultMsg = document.querySelector('.error_Result_Message');

const add = document.querySelector('button');
const searchBar = document.querySelector('.search');
const searchResults = document.querySelector('.search_Results');
const selectedFoodName = document.querySelector('#selected_Food_Name');
const foodServingSize = document.querySelector('#servingSize');
const foodCalorie = document.querySelector('#calorie');
const foodProtein = document.querySelector('#protein');
const foodCarbs = document.querySelector('#carbs');
const foodFat = document.querySelector('#fat');
const foodFiber = document.querySelector('#fiber');
const changeServing = document.querySelector('#change_Serving');

const addToList = document.querySelector('#add_To_List');
const listAdded = document.querySelector('.list_Added');

const totalCalories = document.querySelector('.total_Calories');
const totalProtein = document.querySelector('.total_Protein');
const totalCarbs = document.querySelector('.total_Carbs');
const totalFat = document.querySelector('.total_Fat');
const totalFiber = document.querySelector('.total_Fiber');

const placeholderText = document.querySelector('#placeholder_Text')


// State to store Food and Search Model
const state = {};
let query = '';

// CLASSES
class Food {
	constructor(foodName, servingGrams, calories, protein, carbs, fat, fiber) {
		this.foodName = foodName;
		this.servingGrams = servingGrams;
		this.calories = calories;
		this.protein = protein;
		this.carbs   = carbs;
		this.fat     = fat;
		this.fiber   = fiber;
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


class Search {
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


// INPUT FIELD & 1ST COLUMN - Display search results
searchBar.addEventListener('keydown', async event => {
	if (event.keyCode === 13) {
		// Clear existing error message
		while(errorResultMsg.firstChild) {
			errorResultMsg.removeChild(errorResultMsg.firstChild);
		};

		query = searchBar.value;
		state.search = new Search(query);
		await state.search.getResults()
		
		if(state.search.commonResult.length !== 0) {
			changePage(1);
		} else {
			renderError();
		}			
	}

});

add.addEventListener('click', async () => {

		// Clear existing error message
		while(errorResultMsg.firstChild) {
			errorResultMsg.removeChild(errorResultMsg.firstChild);
		};

		query = searchBar.value;
		state.search = new Search(query);
		await state.search.getResults()

		if(state.search.commonResult.length !== 0) {
			changePage(1);
		} else {
			renderError();
		}	

});



// 1ST COLUMN - CHOOSE FOOD TO ADD TO SELECTED FOOD DISPLAY
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


// 2ND COLUMN - CHANGE NUTRITION VALUE BASE ON SERVING SIZE
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

		// console.log(newCalories, newProtein, newCarbs, newFat, newFiber);

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


// 2ND COLUMN - ADD TO SELECTED FOOD TO LIST OF ALL FOOD SELECTED

// Declare array to store selected food
const listOfSelected = [];
let item;

// Assign id to each food element in 3d column
let idNum = 0;

addToList.addEventListener('click', () => {
	// Store currentFood selected
	item = state.currentFood;

	// Push item into selected List
	listOfSelected.push(item);
	console.log(listOfSelected);

	// Display Food in 3rd Column
	if (item === undefined) {
		renderWarning();
	} else {
		renderToList();
	}
	// increment id after each added item
	idNum++;

// 4TH COLUMN - COMPUTE TOTAL FOR NUTRITION DATA
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

// 3RD COLUMN - DELETE FOOD FROM LIST
listAdded.addEventListener('click', e => {
	if (e.target && e.target.matches('.remove_Btn')) {
		// return ID from html element
		let id = parseInt(e.target.id);
		console.log(id);
		console.log(listOfSelected[id]);

		// remove food in list from UI
		const node = document.getElementById(`${id}`);
		const nodeParent = node.closest('tr');
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

		totalCalories.innerHTML = parseFloat(caloriesTotal).toFixed(2);
		totalProtein.innerHTML = parseFloat(proteinTotal).toFixed(2);
		totalCarbs.innerHTML = parseFloat(carbsTotal).toFixed(2);
		totalFat.innerHTML = parseFloat(fatTotal).toFixed(2);
		totalFiber.innerHTML = parseFloat(fiberTotal).toFixed(2);
		// Iterate through listOfSelected again to count total nutrition data
	}
});


//FUNCTIONS//////////////////////////////////////////////////////////////////

// Calculate new nutrition value with new Serving Size
function calcNewData(foodNutrition, oldServingNum, newServingNum) {
	const newData = parseFloat((foodNutrition / oldServingNum) * newServingNum).toFixed(2);	
	return parseFloat(newData);
};


// Pagination for table 1
var current_Page = 1;
var results_Per_Page = 8;

btn_next.style.visibility = 'hidden';
btn_prev.style.visibility = 'hidden';

function prevPage()
{
    if (current_Page > 1) {
        current_Page--;
        changePage(current_Page);
    }
};

function nextPage()
{
    if (current_Page < numPages()) {
        current_Page++;
        changePage(current_Page);
    }
};

function changePage(page)
{
	placeholder_Text.innerHTML = '';
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    // var listing_table = document.getElementById("listingTable");
    var page_span = document.getElementById("page");
 
    // Validate page
    if (page < 1) page = 1;
	if (page > numPages()) page = numPages();
	
	const allResults = state.search.commonResult;

	searchResults.innerHTML = '';


	for(var i = (page -1) * results_Per_Page; i < page * results_Per_Page && i < allResults.length; i++) {
		const searchResultsMarkUp = `
		<tr class="pointer">
			<td scope="row" id="${allResults[i].food_name}">${allResults[i].food_name}</td>
		</tr>
		`;
		searchResults.insertAdjacentHTML('beforeend', searchResultsMarkUp);
		
	}
	page_span.style.visibility = 'visible';
	page_span.innerHTML = 'Page:' + page + '/' + numPages();

	

	btn_prev.style.visibility = page == 1 ? 'hidden' : 'visible';
	btn_next.style.visibility = page == numPages() ? 'hidden' : 'visible';
};

function numPages()
{
    return Math.ceil(state.search.commonResult.length / results_Per_Page);
};


// Render error message if bad search query
function renderError() {
	const markup = `
	<div class="alert_css col-md-6"> 
		<div class="alert alert-danger container-fluid" role="alert">
			Uh oh, we got no results from <b>${query}</b>, please try another search.
		</div>
	</div>
	`;
	errorResultMsg.insertAdjacentHTML('beforeend', markup);
};

// render warning message if Add to List is blank
function renderWarning() {
	const markup = `
	<div class="alert_css col-md-6"> 
		<div class="alert alert-info container-fluid" role="alert">
			There's nothing to add silly. Search for a food first.
		</div>
	</div>`;

	errorResultMsg.insertAdjacentHTML('beforeend', markup);
};

// render food in 2nd column to 3rd column
function renderToList() {
	const listAddedMarkup = 
	`<tr class="food_In_list">
		<td>${item.foodName}</td>     
		<td class="servingSize_food_In_List">${item.servingGrams}</td>
		<td>gram(s)</td>        
		<td> 
			<button type="button" class="close" aria-label="Close">
				<span aria-hidden="true" class="remove_Btn" id="${idNum}">&times;</span>
			</button>
		</td> 
	</tr>`;

	listAdded.insertAdjacentHTML('beforeend', listAddedMarkup);
};










// function displaySearchResults(query) {
// 	// clear previous results
// 	searchResults.innerHTML = '';
// 	const allResults = state.search.commonResult;

// 	allPageNum = parseInt(allResults.length / 10);

// 	if (allResults.length !== 0) {
// 		const page1 = allResults.slice(0, allResults.length - 10);
// 		page1.forEach( data => {

// 			const searchResultsMarkUp = `
// 			<tr class="pointer">
// 				<td scope="row" id="${data.food_name}">${data.food_name}</td>
// 			</tr>
// 			`;
// 			searchResults.insertAdjacentHTML('beforeend', searchResultsMarkUp);
// 		})
// 	} else {
// 		const markup = `
// 		<div class="alert_css col-md-6"> 
// 			<div class="alert alert-danger container-fluid" role="alert">
// 				Uh oh, we got no results from <b>${query}</b>, please try another search.
// 			</div>
// 		</div>
// 		`;
// 		errorResultMsg.insertAdjacentHTML('beforeend', markup);
// 	}
// };


// Display search result or error message 
// function displaySearchResults(query) {
// 	// Clear previous search results
// 	searchResults.innerHTML = '';
// 	const allResults = state.search.commonResult;

// 	if (allResults.length !== 0) {

		
// 		state.search.commonResult.forEach( commonData => {
// 			// Markup for SEARCH RESULT
// 			const searchResultsMarkUp = `
// 			<tr class="pointer">
// 				<td scope="row" id="${commonData.food_name}">${commonData.food_name}</td>
// 			</tr>
// 			`;

// 		// display food name in UI
// 		searchResults.insertAdjacentHTML('beforeend', searchResultsMarkUp);
// 		})
// 	} else { 
// 		const markup = `
// 		<div class="alert_css col-md-6"> 
// 			<div class="alert alert-danger container-fluid" role="alert">
// 				Uh oh, we got no results from <b>${query}</b>, please try another search.
// 			</div>
// 		</div>
// 		`;
// 		errorResultMsg.insertAdjacentHTML('beforeend', markup);
// 	}
// };

