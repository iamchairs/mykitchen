(function() {
	'use strict';

	angular.module('mykitchen').controller('PanelController', function($scope, $http) {
		// TODO: using parent shouldn't be necessary. scope inherits automatically
		$parent = $scope.$parent;

		$scope.toggleFoodPanel = toggleFoodPanel;
		$scope.toggleRecipePanel = toggleRecipePanel;
		$scope.togglePlanningPanel = togglePlanningPanel;
		
		function toggleFoodPanel() {
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

		function toggleRecipePanel() {
			if($parent.recipePanel == false) {
				$parent.recipePanel = true;
				// close others 
	            $parent.foodPanel = false;
	            $parent.planningPanel = false;
			} else {
				$parent.recipePanel = false;
			}
		}

		function togglePlanningPanel() {
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
})();