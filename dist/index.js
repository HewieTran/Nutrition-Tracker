import elements from '../src/js/views/base';
import Search from '../src/js/models/Search';
import Food from '../src/js/models/Food';

// State to store Food and Search Model
const state = {};
let query = '';


// INPUT FIELD & 1ST COLUMN - Display search results
elements.searchBar.addEventListener('keydown', async event => {
	if (event.keyCode === 13) {
		// Clear existing error message
		while(errorResultMsg.firstChild) {
			errorResultMsg.removeChild(errorResultMsg.firstChild);
		};

		query = elements.searchBar.value;
		state.search = new Search(query);
		await state.search.getResults()
		
		if(state.search.commonResult.length !== 0) {
			changePage(1);
		} else {
			renderError();
		}			
	}

});

elements.add.addEventListener('click', async () => {

		// Clear existing error message
		while(errorResultMsg.firstChild) {
			errorResultMsg.removeChild(errorResultMsg.firstChild);
		};

		query = elements.searchBar.value;
		state.search = new Search(query);
		await state.search.getResults()

		if(state.search.commonResult.length !== 0) {
			changePage(1);
		} else {
			renderError();
		}	

});


// 1ST COLUMN - CHOOSE FOOD TO ADD TO SELECTED FOOD DISPLAY
elements.searchResults.addEventListener('click', async e => {
	
	if (e.target && e.target.matches('TD')) {
		var foodName = e.target.id;
		// console.log(foodName);
	}

	// store chosen food in currentFood
	state.currentFood = new Food(foodName);
	await state.currentFood.getNutritionData();

	// Display current nutrition value in UI
	elements.selectedFoodName.innerHTML = foodName.toUpperCase();
	elements.foodServingSize.value = state.currentFood.servingGrams;
	elements.foodCalorie.innerHTML = state.currentFood.calories;
	elements.foodProtein.innerHTML = state.currentFood.protein;
	elements.foodCarbs.innerHTML   = state.currentFood.carbs;
	elements.foodFat.innerHTML     = state.currentFood.fat;
	elements.foodFiber.innerHTML   = state.currentFood.fiber;

	oldServingSize = parseFloat(elements.foodServingSize.value);
	oldFoodCalorie = parseFloat(elements.foodCalorie.innerHTML);
	oldFoodProtein = parseFloat(elements.foodProtein.innerHTML);
	oldFoodCarbs = parseFloat(elements.foodCarbs.innerHTML);
	oldFoodFat = parseFloat(elements.foodFat.innerHTML);
	oldFoodFiber = parseFloat(elements.foodFiber.innerHTML);

});


// 2ND COLUMN - CHANGE NUTRITION VALUE BASE ON SERVING SIZE
elements.changeServing.addEventListener('click', () => {

	newServingSize = parseFloat(elements.foodServingSize.value);

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
		elements.foodCalorie.innerHTML = newCalories;
		elements.foodProtein.innerHTML = newProtein;
		elements.foodCarbs.innerHTML   = newCarbs;
		elements.foodFat.innerHTML     = newFat;
		elements.foodFiber.innerHTML   = newFiber;

		// Delete old serving nutrition value
		delete state.currentFood;

		state.currentFood = new Food();

		state.currentFood.foodName = elements.selectedFoodName.innerHTML.toLowerCase();
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

elements.addToList.addEventListener('click', () => {
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

	elements.totalCalories.innerHTML = parseFloat(caloriesTotal).toFixed(2);
	elements.totalProtein.innerHTML = parseFloat(proteinTotal).toFixed(2);
	elements.totalCarbs.innerHTML = parseFloat(carbsTotal).toFixed(2);
	totalFat.innerHTML = parseFloat(fatTotal).toFixed(2);
	elements.totalFiber.innerHTML = parseFloat(fiberTotal).toFixed(2);
	
});

// 3RD COLUMN - DELETE FOOD FROM LIST
elements.listAdded.addEventListener('click', e => {
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

		elements.totalCalories.innerHTML = parseFloat(caloriesTotal).toFixed(2);
		elements.totalProtein.innerHTML = parseFloat(proteinTotal).toFixed(2);
		elements.totalCarbs.innerHTML = parseFloat(carbsTotal).toFixed(2);
		totalFat.innerHTML = parseFloat(fatTotal).toFixed(2);
		elements.totalFiber.innerHTML = parseFloat(fiberTotal).toFixed(2);
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
	elements.placeholderText.innerHTML = '';
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    // var listing_table = document.getElementById("listingTable");
    var page_span = document.getElementById("page");
 
    // Validate page
    if (page < 1) page = 1;
	if (page > numPages()) page = numPages();
	
	const allResults = state.search.commonResult;

	elements.searchResults.innerHTML = '';


	for(var i = (page -1) * results_Per_Page; i < page * results_Per_Page && i < allResults.length; i++) {
		const searchResultsMarkUp = `
		<tr class="pointer">
			<td scope="row" id="${allResults[i].food_name}">${allResults[i].food_name}</td>
		</tr>
		`;
		elements.searchResults.insertAdjacentHTML('beforeend', searchResultsMarkUp);
		
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

	elements.listAdded.insertAdjacentHTML('beforeend', listAddedMarkup);
};

