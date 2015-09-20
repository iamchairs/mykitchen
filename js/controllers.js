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
	if(instructions) {
		this.instructions = instructions;
	} else {
		this.instructions = "Lorem ipsum dolar sit Lorem ipsum dolar sit Lorem ipsum dolar sit. Lorem ipsum dolar sit, Lorem ipsum dolar sit.\n\rLorem ipsum dolar sit Lorem ipsum dolar sit Lorem ipsum dolar sit. Lorem ipsum dolar sit.";
	}
	if(id) {
        this.id = id;
	}
}

var app = angular.module('app', []);

mainCtrl = app.controller('mainCtrl', function($scope, $http, FoodService) {
	$scope.food = [];
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
	}
	init();
});


app.controller('panelCtrl', function($scope, $http){
	$parent = $scope.$parent;
	
	$scope.toggleFoodPanel = function() {
		if($parent.foodPanel == false) {
			$parent.foodPanel = true;
			// close others 
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
		if($parent.PlanningPanel == false) {
			$parent.PlanningPanel = true;
			// close others 
            $parent.foodPanel = false;
            $parent.recipePanel = false;
		} else {
			$parent.PlanningPanel = false;
		}
	}
});

app.controller('recipeCtrl', function($scope, $http){
	$scope.recipes = [];
	$scope.currentRecipe = null;
	$scope.recipes.push(new Recipe('Chili'));
	$scope.recipes.push(new Recipe('French Toast'));
	$scope.allListings = true;
	$scope.singleListing = false;
	
	$scope.showRecipe = function(recipe) {
		$scope.currentRecipe = recipe;
		$scope.allListings = false;
		$scope.singleListing = true;
	}

	$scope.showAllRecipes = function(recipe) {
		$scope.currentRecipe = null;
		$scope.allListings = true;
		$scope.singleListing = false;
	}
});

app.controller('fridgeCtrl', function($scope, $http){
    $scope.addFoodPanel = false;
    $scope.newFood = {
    	name: null,
    	quantity: null,
    	unit: null
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
