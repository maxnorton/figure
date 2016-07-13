
function the_figure(healthyYields) {
	
	var years = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
	console.log(years);
	console.log(healthyYields);

	var healthyData = new Array();
	for (var i in healthyYields) {
		healthyData[i] = { "x" : i, "y" : healthyYields[i] };
	}

	var infectedData = new Array();
	d3.tsv("yield-rates.tsv", function(data) {
		for (var i in healthyYields) {
			infectedData[i] = { "x" : i, "y" : healthyYields[i]*data[i]['noAction']/100 };
		}
	});

	console.log(healthyData);

	var margin = {top: 20, right: 35, bottom: 30, left: 35},
	    width = ($('body').width() < 960) ? $('body').width() - margin.left - margin.right : 960 - margin.left - margin.right,
	    height = width*.506;

	    console.log($('body').width());
	    console.log(width);
	    console.log($('body').width() < 960 );
	    console.log($('body').width() - margin.left - margin.right);
	    console.log(960 - margin.left - margin.right);

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

	console.log(line(healthyData));

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
		.attr("fill","red")
		.attr("cx", function(d) { return x(d.x); })
		.attr("cy", function(d) { return y(d.y); });

	svg.append("path")
		.attr("d", line(infectedData))
		.attr("class", "line")
		.attr("stroke", "blue")
		.attr("stroke-width", 2)
		.attr("fill", "none");

	svg.selectAll("dot")
		.data(infectedData)
		.enter().append("circle")
		.attr("r", 3.5)
		.attr("fill","red")
		.attr("cx", function(d) { return x(d.x); })
		.attr("cy", function(d) { return y(d.y); });

}

function type(d) {
	  d.x = +d.x;
	  d.y = +d.y;
	  //d.healthyYields = +d.healthyYields;
	  return d;
	}