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

app.service('globals', function() {
	// place globals here
});

mainCtrl = app.controller('mainCtrl', function($scope, $http) {
	$scope.food = [];
	$scope.databaseLoaded = false;
    $scope.foodPanel = false;
    $scope.foodChanged = false;
    $scope.recipePanel = false;
    $scope.planningPanel = false;

	var init = function() {
        // fill $scope.food with information from database
        $http.get('php/getFood.php').
          then(function(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.firstWatch = true;
            result = response.data;
            for(i = 0; i < result.length; i++) {
            	$scope.food.push(new Food(result[i].name, result[i].quantity, result[i].unit, result[i].id));
            }
          }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        $http.get('php/getRecipes.php').then(function(response){
        	
        }, function(response) {
        	
        });

		// watch for changes to $scope.food - ultimately determines if the user should consider saving
        $scope.$watch('food', function(newval, oldval){
            if(newval !== oldval) {
                if(!$scope.firstWatch) {
                    $scope.foodChanged = true;
                }  else {
                	$scope.firstWatch = false;
                }
            } else {
            }
        }, true);
	}
	init();
	
	$scope.reload = function() {
		$scope.food = [];
        $http.get('php/getFood.php').
          then(function(response) {
            $scope.firstWatch = true;
            $scope.foodChanged = false;
            result = response.data;
            for(i = 0; i < result.length; i++) {
            	$scope.food.push(new Food(result[i].name, result[i].quantity, result[i].unit, result[i].id));
            }
          }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
	}

	$scope.save = function() {
		json = JSON.stringify($scope.food);
        $http.post('php/saveFood.php', json).
          then(function(response) {
          	$scope.foodChanged = false;
          	console.log(response.data);
          }, function(response) {
        });
	}
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
