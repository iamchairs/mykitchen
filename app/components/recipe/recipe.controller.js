(function() {
	'use strict';

	angular.module('mykitchen.recipe').controller('RecipeController', function($scope, $http){
		$scope.currentRecipe = null;
		$scope.allListings = true;
		$scope.singleListing = false;
		$scope.recipeMade = false;
		$scope.recipePossible = null;

		$scope.showRecipe = showRecipe;
		$scope.showAllRecipes = showAllRecipes;
		$scope.exists = exists;
		$scope.hasEnough = hasEnough;
		$scope.canMake = canMake;
		$scope.makeRecipe = makeRecipe;
		
		$scope.$on('showNotRecipe', onShowNotRecipe);

		function onShowNotRecipe() {
			$scope.showAllRecipes();
		}

		function showRecipe(recipe) {
			$scope.currentRecipe = recipe;
			$scope.allListings = false;
			$scope.singleListing = true;
			$scope.recipePossible = [];
		}

		function showAllRecipes(recipe) {
			$scope.currentRecipe = null;
			$scope.allListings = true;
			$scope.singleListing = false;
		}
		
		function exists(foodName) {
			var exists = false;
			for(var i = 0; i < $scope.food.length; i++) {
				string = $scope.food[i].name;
				if(string.toLowerCase() == foodName.toLowerCase()) {
					exists = true;
				}
			}
			$scope.recipePossible.push(exists);
			return exists;
		}

		function hasEnough(foodName, foodQuantity) {
			var hasEnough = false;
			for(var i = 0; i < $scope.food.length; i++) {
				string = $scope.food[i].name;
				if(string.toLowerCase() == foodName.toLowerCase()) {
					inventory = $scope.food[i].quantity;
					if(parseInt(inventory) >= parseInt(foodQuantity)) {
						hasEnough = true;
					}
				}
			}
			$scope.recipePossible.push(hasEnough);
			return hasEnough;
		}
		
		function canMake(recipe) {
			if(recipe) {
	            for(var i = 0; i < $scope.recipePossible.length; i++) {
	                if($scope.recipePossible[i]) {
	                    continue;
	                } else {
	                    $scope.recipePossible = [];
	                    return false;
	                }
	            }
	            $scope.recipePossible = [];
	            return true;
			} else {
	            $scope.recipePossible = [];
				return false;
			}
		}
		
		function makeRecipe(recipe) {
			for(var i = 0; i < recipe.food.length; i++) {
				var name = recipe.food[i].name;
				var quantity = recipe.food[i].quantity;
				for(var j = 0; j < $scope.food.length; j++) {
					if(name.toLowerCase() == $scope.food[j].name.toLowerCase()) {
	                    $scope.$parent.food[j].quantity -= quantity;
	                    break;
					}
				}
			}
			$scope.recipeMade = true;
		}
	});
})();
