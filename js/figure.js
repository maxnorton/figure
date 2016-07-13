
function the_figure(healthyYields) {
	
	var years = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

	var healthyData = new Array();
	for (var i in healthyYields) {
		healthyData[i] = { "x" : i, "y" : healthyYields[i] };
	}

	var margin = {top: 20, right: 35, bottom: 30, left: 35},
	    width = ($('body').width() < 960) ? $('body').width() - margin.left - margin.right : 960 - margin.left - margin.right,
	    height = width*.506;

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

	var svg = d3.select(".figure-area").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	x.domain(d3.extent(years));
	y.domain(d3.extent(healthyData, function(d) { return d.y; }));

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
		.attr("d", line(healthyData))
		.attr("class", "line")
		.attr("stroke", "blue")
		.attr("stroke-width", 2)
		.attr("fill", "none");

	svg.selectAll("dot")
		.data(healthyData)
		.enter().append("circle")
		.attr("r", 3.5)
		.attr("fill","blue")
		.attr("cx", function(d) { return x(d.x); })
		.attr("cy", function(d) { return y(d.y); });

	var infectedData = [],
		data25y3 = [],
		data25y5 = [],
		data25y10 = [];

	d3.tsv("yield-rates.tsv", function(data) {
		for (var i in healthyYields) {
			infectedData[i] = { "x" : i, "y" : healthyYields[i]*data[i]['noAction']/100 };
		}
		
		svg.append("path")
			.attr("d", line(infectedData))
			.attr("class", "line")
			.attr("stroke", "red")
			.attr("stroke-width", 2)
			.attr("fill", "none");

		svg.selectAll("dot")
			.data(infectedData)
			.enter().append("circle")
			.attr("r", 3.5)
			.attr("fill","red")
			.attr("cx", function(d) { return x(d.x); })
			.attr("cy", function(d) { return y(d.y); });

		for (var i in healthyYields) {
			data25y3[i] = { "x" : i, "y" : healthyYields[i]*data[i]['25y3']/100 };
		}

		svg.append("path")
			.attr("d", line(data25y3))
			.attr("class", "line")
			.attr("stroke", "yellowgreen")
			.attr("stroke-width", 2)
			.attr("fill", "none");

		svg.selectAll("dot")
			.data(data25y3)
			.enter().append("circle")
			.attr("r", 3.5)
			.attr("fill","yellowgreen")
			.attr("cx", function(d) { return x(d.x); })
			.attr("cy", function(d) { return y(d.y); });

		for (var i in healthyYields) {
			data25y5[i] = { "x" : i, "y" : healthyYields[i]*data[i]['25y5']/100 };
		}

		svg.append("path")
			.attr("d", line(data25y5))
			.attr("class", "line")
			.attr("stroke", "darkorchid")
			.attr("stroke-width", 2)
			.attr("fill", "none");

		svg.selectAll("dot")
			.data(data25y5)
			.enter().append("circle")
			.attr("r", 3.5)
			.attr("fill","darkorchid")
			.attr("cx", function(d) { return x(d.x); })
			.attr("cy", function(d) { return y(d.y); });

		for (var i in healthyYields) {
			data25y10[i] = { "x" : i, "y" : healthyYields[i]*data[i]['25y10']/100 };
		}

		svg.append("path")
			.attr("d", line(data25y10))
			.attr("class", "line")
			.attr("stroke", "lightskyblue")
			.attr("stroke-width", 2)
			.attr("fill", "none");

		svg.selectAll("dot")
			.data(data25y10)
			.enter().append("circle")
			.attr("r", 3.5)
			.attr("fill","lightskyblue")
			.attr("cx", function(d) { return x(d.x); })
			.attr("cy", function(d) { return y(d.y); });

	});

}

function type(d) {
	  d.x = +d.x;
	  d.y = +d.y;
	  //d.healthyYields = +d.healthyYields;
	  return d;
	}