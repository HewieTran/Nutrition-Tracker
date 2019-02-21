export default class Food {
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