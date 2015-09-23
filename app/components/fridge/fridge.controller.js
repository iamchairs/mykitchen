(function() {
	'use strict';

	angular.module('mykitchen.fridge').controller('FridgeController', function($scope, $http){
		$scope.foodPerPage = 7;
		$scope.addFoodPanel = false;
		$scope.newFood = new Food();
		$scope.currentPage = 1;

		$scope.isVisiable = isVisible;
		$scope.areMorePages = areMorePages;
		$scope.increasePage = increasePage;
		$scope.decreasePage = decreasePage;
		$scope.increaseQuantity = increaseQuantity;
		$scope.decreaseQuantity = decreaseQuantity;
		$scope.resetAddFood = resetAddFood;
		$scope.addFoodReady = addFoodReady;
		$scope.addFood = addFood;
		$scope.toggleAddFoodPanel = toggleAddFoodPanel;

		function isVisible (index) {
			var maxValue = $scope.currentPage * ($scope.foodPerPage-1);
			var minValue = ($scope.currentPage-1) * ($scope.foodPerPage-1);
			if(index <= maxValue && index >= minValue) {
				return true;	
			} else {
		      return false;
			}
		}

		function areMorePages () {
			var totalPages = Math.ceil($scope.food.length / $scope.foodPerPage);
			if($scope.currentPage < totalPages) {
				return true;
			} else {
				return false;
			}
		}

		function increasePage () {
			$scope.currentPage++;	
		}

		function decreasePage () {
			$scope.currentPage--;	
		}

		function increaseQuantity (food) {
			food.quantity++;
		}
		
		function decreaseQuantity (food) {
			food.quantity--;
		}

		function resetAddFood () {
			$scope.newFood.name = null;
			$scope.newFood.quantity = null;
			$scope.newFood.unit = null;
		}

		function addFoodReady () {
			return($scope.newFood.name && $scope.newFood.quantity && $scope.newFood.unit);
		}

		function addFood () {
			$scope.$parent.food.push(new Food($scope.newFood.name, $scope.newFood.quantity, $scope.newFood.unit));
		}

		function toggleAddFoodPanel () {
			$scope.addFoodPanel = !$scope.addFoodPanel;
		}
		
	});
})();