
function the_figure(healthyYields) {
	
	var years = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
	console.log(years);
	console.log(healthyYields);

	var lineData = new Array();
	for (var i in healthyYields) {
		lineData[i] = { "x" : i, "y" : healthyYields[i] };
	}


	console.log(lineData);

	var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    width = 960 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;

	var x = d3.scale.linear()
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .ticks(5)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	var line = d3.svg.line()
	    .x(function(d) { return x(d.x); })
 		.y(function(d) { return y(d.y); })
 		.interpolate("linear");

	console.log(line(lineData));

	var svg = d3.select(".figure-area").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	x.domain(d3.extent(years));
	y.domain(d3.extent(lineData, function(d) { return d.y; }));

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Yield (Tons/Acre)");

	svg.append("path")
		.attr("d", line(lineData))
		.attr("class", "line")
		.attr("stroke", "blue")
		.attr("stroke-width", 2)
		.attr("fill", "none");

	svg.selectAll("dot")
		.data(lineData)
		.enter().append("circle")
		.attr("r", 3.5)
		.attr("fill","blue")
		.attr("cx", function(d) { return x(d.x); })
		.attr("cy", function(d) { return y(d.y); });

}

function type(d) {
	  d.x = +d.x;
	  d.y = +d.y;
	  //d.healthyYields = +d.healthyYields;
	  return d;
	}