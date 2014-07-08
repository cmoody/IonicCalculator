angular.module('app.calc.controllers', ['ngStorage'])

.controller('CalculatorCtrl', function($scope, $localStorage) {
	$scope.data = {};
	$scope.data.bill = '';
	$scope.data.total = 0;
	$scope.data.tip = 0;
	$scope.data.percent = 0.10;
	$scope.data.description = '';
	//$scope.$storage = $localStorage.$default({});

	$scope.calculateTipTotal = function() {
		// Handle NaN
		if($scope.data.bill === '') {
			$scope.data.bill = 0;
		}

		$scope.data.tip = ($scope.data.bill * parseFloat($scope.data.percent)).toFixed(2);
		$scope.data.total = (parseFloat($scope.data.bill) + parseFloat($scope.data.tip)).toFixed(2);
	};

	$scope.submitExpense = function() {
		// $scope.$storage = $localStorage.$default({
  //         x: 42
  //       });

		//$scope.$storage = $scope.data;
		// build out as service
		// push $scope.data to service
		// clear $scope.data
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
})

.controller('HistoryCtrl', function($scope) {

})

.controller('StatsCtrl', function($scope) {

})

.controller('MapCtrl', function($scope) {

});