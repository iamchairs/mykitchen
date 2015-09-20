(function() {
	'use strict';
	
	angular.module('app')
		.service('FoodService', FoodService);
		
	function FoodService($http) {
		this.getFood = function(food) {
			return $http.get('php/getFood.php').then(parseFoodResponse);
		}
		
		this.saveFood = function(food) {
            var json = JSON.stringify(food);
            return $http.post('php/saveFood.php', json);
		}
		
		function parseFoodResponse(response) {
			var res = [];
			
			// this callback will be called asynchronously
            // when the response is available
            var result = response.data;
            for(var i = 0; i < result.length; i++) {
                    res.push(new Food(result[i].name, result[i].quantity, result[i].unit, result[i].id));
            }
                  
            return res;
		}
	}
})();
