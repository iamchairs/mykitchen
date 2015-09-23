(function() {
    'use strict';

    angular.module('mykitchen.food').controller('FoodController', function($scope, $http, RecipeService, FoodService) {
        $scope.food = [];
        $scope.recipes = [];
        $scope.foodPanel = false;
        $scope.foodChanged = false;
        $scope.recipePanel = false;
        $scope.planningPanel = false;
        $scope.clearWatch = null;

        $scope.startWatch = startWatch;
        $scope.loadFood = loadFood;
        $scope.loadRecipies = loadRecipies;
        $scope.reload = reload;
        $scope.save = save;

        init();

        // watch for changes to $scope.food - determines if the user should consider saving or reloading
        function startWatch() {
            // Angulars $scope.$watch function returns a function that, when called, degreisters the watch. $scope.clearWatch grabs this function.
            $scope.clearWatch = $scope.$watch('food', function(newval, oldval){
                if(newval !== oldval) {
                   $scope.foodChanged =  true;
                } 
            }, true);
        }
        
        // loads food from database
        function loadFood() {
            return FoodService.getFood().then(function(res) {
                $scope.food = res;  
            });
        }
        
        function loadRecipes() {
            return RecipeService.getRecipes().then(function(res) {
                $scope.recipes = res;
                console.log('mainctrl response: ' + res);
                console.log('scope.recipes: '); 
                console.log($scope.recipes);
            })
        }

        // reloads food from database   
        function reload() {
            $scope.clearWatch();
            $scope.foodChanged = false;
            $scope.loadFood().then($scope.startWatch);
        }

        // saves food to database
        function save() {
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
    });
})();
