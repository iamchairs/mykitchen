<?php
require_once('../php/bootstrap.php');
?>

<!DOCTYPE HTML>
<link href='http://fonts.googleapis.com/css?family=Open+Sans:600' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css'>

<link href="assets/css/normalize.css" type="text/css" rel="stylesheet"> 
<link href="assets/css/font-awesome.min.css" type="text/css" rel="stylesheet"> 
<link href="assets/css/index.css" type="text/css" rel="stylesheet"> 

<html ng-app="mykitchen">
	<head>
            <title>My Kitchen</title>
	</head>
	<body ng-controller="FoodController">
		<div id="nav">
			<div ng-controller="PanelController">
                <a href="" ng-class="{active : foodPanel}" ng-click="toggleFoodPanel()"><img src="asstes/img/food.png"></a>
                <a href="" ng-class="{active : recipePanel}" ng-click="toggleRecipePanel()"><img src="assets/img/recipe.png"></a>
                <a href="" ng-class="{active : planningPanel}" ng-click="togglePlanningPanel()"><img src="assets/img/planning.png"></a>
			</div>
		</div>
		<div id="nav-border"></div>
		<div id="recipe-panel" ng-show="recipePanel" ng-controller="RecipeController">

            <input class="search" ng-show="allListings" ng-model="search" type="text" placeholder="search"> 
			<button ng-show="singleListing" ng-click="showAllRecipes()">BACK</button>
			<div>
                <div id="all-listings" ng-show="allListings">
                    <div>
                        <h1>Recipes</h1>
                    </div>
                    <div>
                        <ul>
                            <li ng-repeat="recipe in recipes | filter:search"><a href ng-click="showRecipe(recipe)">{{recipe.name}}</a></li>
                        </ul>
                    </div>
                </div>
                <div id="single-listing" ng-show="singleListing">
                    <div>
                        <h1>{{currentRecipe.name}}</h1>
                        <ul>
                            <li ng-repeat="food in currentRecipe.food">
                                <p ng-class="{error: !exists(food.name)}">{{food.name}}
                                    <span ng-class="{error: !hasEnough(food.name, food.quantity)}">{{food.quantity}}</span>
                                    <i ng-show="hasEnough(food.name, food.quantity)"class="fa fa-check"></i>
                                    <i ng-show="!hasEnough(food.name, food.quantity)"class="fa fa-times"></i>
                                </p>
                            </li>
                        </ul>
                        <div>
                            <button ng-show="canMake(currentRecipe)" ng-click="makeRecipe(currentRecipe)">MAKE</button>
                            <p ng-show="recipeMade">Recipe made!</p>
                        </div>
                    </div>
                    <div>
                    	<h1>Instructions</h1>
                    	<p>{{currentRecipe.instructions}}</p>	
                    </div>
                </div>
			</div>
		</div>
		
        <div class="food-panel" ng-show="foodPanel" ng-controller="FridgeController">


            <button id="save-button" ng-show="foodChanged" ng-click="save()">SAVE</button>
            <button id="reload-button" ng-show="foodChanged" ng-click="reload()">RESET</button>


            <div id="add-food-panel" ng-show="addFoodPanel">
                <h1>Add Food</h1>
                <div>
                    <input ng-model="newFood.name" type="text" placeholder="name">
                    <input ng-model="newFood.quantity" type="text" placeholder="quantity">
                    <input ng-model="newFood.unit" type="text" placeholder="unit">
                </div>
                <div>
                    <button ng-click="toggleAddFoodPanel(); addFood(); resetAddFood();" ng-show="addFoodReady()">ADD</button>
                </div>
            </div>
			
            <button id="add-food-button" ng-click="toggleAddFoodPanel()">
                <img src="assets/img/shopping.png">
            </button>


            <div class="food-inventory">


                <input class="search" ng-model="search" type="text" placeholder="search"> 

                <div ng-repeat="item in food | filter:search" ng-if="isVisible($index)">
                        <input ng-model="item.name" type="text" class="food-inv-col-1">

                        <div class="food-inv-col-2">
                            <button class="inv-plus" ng-click="increaseQuantity(item)">+</button>

                            <input ng-model="item.quantity" value="item.quantity"type="text">

                            <button class="inv-minus" ng-show="item.quantity" ng-click="decreaseQuantity(item)">-</button>
                        </div>

                        <input ng-model="item.unit" type="text" class="food-inv-col-3">

                </div>	
                <div>
                    <div>
                        <button ng-hide="currentPage==1" ng-click="decreasePage()"><i class="fa fa-chevron-left"></i></button>
                        <span>{{currentPage}}</span>
                        <button ng-hide="!areMorePages()" ng-click="increasePage()"><i class="fa fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>

        </div>
        
        <div id="planning-panel" ng-show="planningPanel">
            <h1 style="text-align: center; font-family: delicious margin: 100px">Chef's Planner coming soon!</h1>
        </div>

        <h1 class="welcome">My Kitchen</h1>

        <!-- Includes -->

        <!-- bower:start -->
        <script src="bower_components/jquery-1.11.3.min.js"></script>
        <script src="bower_components/angular.min.js"></script>
        <!-- endbower -->

        <!-- classes:start -->
        <script src="components/food/food.class.js"></script>
        <script src="components/recipe/recipe.class.js"></script>
        <!-- endclasses -->

        <!-- modules:start -->
        <script src="components/food/food.module.js"></script>
        <script src="components/fridge/fridge.module.js"></script>
        <script src="components/mykitchen/mykitchen.module.js"></script>
        <script src="components/recipe/recipe.module.js"></script>
        <!-- modulesend -->

        <!-- components:start -->
        <script src="components/food/food.controller.js"></script>
        <script src="components/food/food.service.js"></script>
        <script src="components/fridge/fridge.controller.js"></script>
        <script src="components/mykitchen/mykitchen.controller.js"></script>
        <script src="components/recipe/recipe.controller.js"></script>
        <script src="components/recipe/recipe.service.js"></script>
        <!-- componentsend -->

	</body>
</html>