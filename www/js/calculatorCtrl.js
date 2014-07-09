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

		// Maybe remove toFixed and parseFloat to use | currency
		$scope.data.tip = ($scope.data.bill * parseFloat($scope.data.percent)).toFixed(2);
		$scope.data.total = (parseFloat($scope.data.bill) + parseFloat($scope.data.tip)).toFixed(2);
	};

	// Add animation overlay
	$scope.submitExpense = function(tip) {
		// Check if tip or no tip
		if(!tip) {
			$scope.data.tip = 0;
			$scope.data.bill = $scope.data.total;
		}

		//navigator.geolocation.getCurrentPosition(function(position) {
			$scope.data.date = new Date();
			// $scope.data.coordinates = {
			// 	latitude: position.coords.latitude, 
			// 	longitude: position.coords.longitude
			// };

			if(localStorage['expenses']) {
				var expenses = JSON.parse(localStorage['expenses']);

				expenses.push($scope.data);

				localStorage.setItem('expenses', JSON.stringify(expenses));
			}else{
				localStorage.setItem('expenses', JSON.stringify([$scope.data]));
			}

			// Isnt clearing form on tip
			// Only clears tip on no tip or is slow to clear with geo
			$scope.setdefaults();
			$scope.activeToggle('ten', 0.10);
		//});
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
	$scope.expenses = JSON.parse(localStorage.getItem('expenses'));

    $scope.data = {
    	bill: 0,
	    tip: 0,
	    total: 0
    };

    angular.forEach($scope.expenses, function(value, key) {
    	this.bill += parseFloat(value.bill);
        this.tip += parseFloat(value.tip);
        this.total += parseFloat(value.total);
    }, $scope.data);

    // This math is wrong
    $scope.data.avg = (($scope.data.tip / $scope.data.total)*100).toFixed(0);

	var w = 200;                        //width
    var h = 200;                        //height
    var r = Math.min(w, h) / 2;   		//radius
    var color = d3.scale.ordinal().range(["#ff0", "rgb(0, 178, 89)"]);
    var data = [{"value": $scope.data.tip},{"value": $scope.data.bill}];

    var vis = d3.select(document.querySelector('#pieChart'))
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([data])                   //associate our data with the document
        .attr("width", w)           	//set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
        .attr("transform", "translate(" + r + "," + r + ")");    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()   //this will create <path> elements for us using arc data
        .outerRadius(r)
        .innerRadius(r - 40);

    var pie = d3.layout.pie()           			//this will create arc data for us given a list of values
    	.sort(null)
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
        .append("svg:g")                    //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
        .attr("class", "slice");            //allow us to style things in the slices (like text)

    arcs.append("svg:path")
        .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
        .transition()
        .duration(2000)
        .attrTween("d", tweenPie);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

    function tweenPie(b) {
    	var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
    	return function(t) { return arc(i(t)); };
    }

})

.controller('MapCtrl', function($scope) {

});