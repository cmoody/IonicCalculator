// ToDo
// Add timestamp
// Add geolocation

angular.module('app.calc.controllers', [])

.controller('CalculatorCtrl', function($scope) {

	$scope.setdefaults = function() {
		$scope.data = {};
		$scope.data.bill = '';
		$scope.data.total = 0;
		$scope.data.tip = 0;
		$scope.data.percent = 0.10;
		$scope.data.description = '';
	};

	$scope.calculateTipTotal = function() {
		// Handles NaN
		if($scope.data.bill === '') {
			$scope.data.bill = 0;
		}

		$scope.data.tip = ($scope.data.bill * parseFloat($scope.data.percent)).toFixed(2);
		$scope.data.total = (parseFloat($scope.data.bill) + parseFloat($scope.data.tip)).toFixed(2);
	};

	$scope.submitExpense = function() {
		if(localStorage['expenses']) {
			var expenses = JSON.parse(localStorage['expenses']);

			expenses.push($scope.data);

			localStorage.setItem('expenses', JSON.stringify(expenses));
		}else{
			localStorage.setItem('expenses', JSON.stringify([$scope.data]));
		}

		$scope.setdefaults();
		$scope.activeToggle('ten', 0.10);
	};

	$scope.activeToggle = function(active, percent) {
		$scope.activated = active;
		$scope.data.percent = percent;
		$scope.calculateTipTotal();
	};

	// adds class then removes
	$scope.isActive = function(active) {
		return $scope.activated === active;
	};

	$scope.setdefaults();
	$scope.activeToggle('ten', 0.10);
})

.controller('HistoryCtrl', function($scope) {
//http://ionicframework.com/docs/api/directive/ionNavBackButton/
	$scope.expenses = JSON.parse(localStorage.getItem('expenses'));
})

.controller('StatsCtrl', function($scope) {

})

.controller('MapCtrl', function($scope) {

});