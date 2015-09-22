(function() {
	'use strict';
	
	angular.module('app')
		.service('RecipeService', RecipeService);
		
	function RecipeService($http) {
		this.getRecipes = function() {
			return $http.get('php/getRecipes.php').then(parseResponse);
		}
		
		this.saveRecipe = function() {
			/* To be defined */
		}
		
		function parseResponse(response) {
			//console.log('http response: ');
			var recipeArray = [];
			var array = response.data;
			for(var i = 0; i < array.length; i++) {
				var name = array[i].name;	
				var instructions = array[i].instructions;	
				var food = array[i].food;	
				recipeArray.push(new Recipe(name, food, instructions));
			}
			console.log(recipeArray);
			return response.data;
		}
	}
})();