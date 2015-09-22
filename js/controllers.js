var Food = function (name, quantity, unit, id) {
	this.name = name;
	this.quantity = quantity;
	this.unit = unit;
	if(id) {
        this.id = id;
	}
}

var Recipe = function (name, food, instructions, id) {
	this.name = name;
	this.food = food;
	this.instructions = instructions;
	if(id) {
        this.id = id;
	}
}

var app = angular.module('app', []);

mainCtrl = app.controller('mainCtrl', function($scope, $http, RecipeService, FoodService) {
	$scope.food = [];
	$scope.recipes = [];
    $scope.foodPanel = false;
    $scope.foodChanged = false;
    $scope.recipePanel = false;
    $scope.planningPanel = false;
    $scope.clearWatch = null;

    // watch for changes to $scope.food - determines if the user should consider saving or reloading
    $scope.startWatch = function() {
        // Angulars $scope.$watch function returns a function that, when called, degreisters the watch. $scope.clearWatch grabs this function.
        $scope.clearWatch = $scope.$watch('food', function(newval, oldval){
            if(newval !== oldval) {
               $scope.foodChanged =  true;
            } 
        }, true);
    }
    
    // loads food from database
    $scope.loadFood = function() {
    	return FoodService.getFood().then(function(res) {
    		$scope.food = res;	
    	});
    }
    
    $scope.loadRecipes = function() {
    	return RecipeService.getRecipes().then(function(res) {
    		$scope.recipes = res;
    		console.log('mainctrl response: ' + res);
    		console.log('scope.recipes: '); 
    		console.log($scope.recipes);
    	})
    }

	// reloads food from database	
	$scope.reload = function() {
		$scope.clearWatch();
		$scope.foodChanged = false;
		$scope.loadFood().then($scope.startWatch);
	}

	// saves food to database
	$scope.save = function() {
        FoodService.saveFood($scope.food).then(function() {
        	$scope.foodChanged = false;
        })
	}

	// prepares application with appropriate data
	function init () {
        // fill $scope.food with information from database
        $scope.loadFood().then($scope.startWatch);
        $scope.loadRecipes();
	}
	init();
});


app.controller('panelCtrl', function($scope, $http){
	$parent = $scope.$parent;
	
	
	$scope.toggleFoodPanel = function() {
		if($parent.foodPanel == false) {
			$parent.foodPanel = true;
			// close others 
			$scope.$broadcast("showNotRecipe");
            $parent.recipePanel = false;
            $parent.planningPanel = false;
		} else {
			$parent.foodPanel = false;
		}
	}

	$scope.toggleRecipePanel = function() {
		if($parent.recipePanel == false) {
			$parent.recipePanel = true;
			// close others 
            $parent.foodPanel = false;
            $parent.planningPanel = false;
		} else {
			$parent.recipePanel = false;
		}
	}

	$scope.togglePlanningPanel = function() {
		if($parent.planningPanel == false) {
			$scope.$broadcast("showNotRecipe");
			$parent.planningPanel = true;
			// close others 
            $parent.foodPanel = false;
            $parent.recipePanel = false;
		} else {
			$parent.planningPanel = false;
		}
	}
});

app.controller('recipeCtrl', function($scope, $http){
	$scope.currentRecipe = null;
	$scope.allListings = true;
	$scope.singleListing = false;
	$scope.recipeMade = false;
	$scope.recipePossible = null;
	
	$scope.$on('showNotRecipe', function() {
		$scope.showAllRecipes();	
	});

	$scope.showRecipe = function(recipe) {
		$scope.currentRecipe = recipe;
		$scope.allListings = false;
		$scope.singleListing = true;
		$scope.recipePossible = [];
	}

	$scope.showAllRecipes = function(recipe) {
		$scope.currentRecipe = null;
		$scope.allListings = true;
		$scope.singleListing = false;
	}
	
	$scope.exists = function(foodName) {
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

	$scope.hasEnough = function(foodName, foodQuantity) {
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
	
	$scope.canMake = function(recipe) {
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
	
	$scope.makeRecipe = function(recipe) {
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

app.controller('fridgeCtrl', function($scope, $http){
	$scope.foodPerPage = 7;
    $scope.addFoodPanel = false;
    $scope.newFood = {
    	name: null,
    	quantity: null,
    	unit: null
    }
    $scope.currentPage = 1;
    
    $scope.isVisible = function(index) {
    	var maxValue = $scope.currentPage * ($scope.foodPerPage-1);
    	var minValue = ($scope.currentPage-1) * ($scope.foodPerPage-1);
    	if(index <= maxValue && index >= minValue) {
    		return true;	
    	} else {
            return false;
    	}
    }
    
    $scope.areMorePages = function() {
    	var totalPages = Math.ceil($scope.food.length / $scope.foodPerPage);
    	if($scope.currentPage < totalPages) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    $scope.increasePage = function() {
    	$scope.currentPage++;	
    }

    $scope.decreasePage = function() {
    	$scope.currentPage--;	
    }

	$scope.increaseQuantity = function(food) {
		food.quantity++;
	}
	$scope.decreaseQuantity = function(food) {
		food.quantity--;
	}

	$scope.resetAddFood = function () {
		$scope.newFood.name = null;
		$scope.newFood.quantity = null;
		$scope.newFood.unit = null;
	}
	$scope.addFoodReady = function() {
		return($scope.newFood.name && $scope.newFood.quantity && $scope.newFood.unit);
	}

	$scope.addFood = function() {
		$scope.$parent.food.push(new Food($scope.newFood.name, $scope.newFood.quantity, $scope.newFood.unit));
	}

	$scope.toggleAddFoodPanel = function() {
		$scope.addFoodPanel = !$scope.addFoodPanel;
	}
	
});
