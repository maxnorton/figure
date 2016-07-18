
function the_figure(healthyYields, scenarioYieldObject, scenarioCDNRObject) {

	if ( $('input[name=figuredisplay]:checked').val() == 'yield' ) {
		var yieldParameterValue = $('input[name=yearfig]:checked').val();
		var scenarios = [],
			scenarioColName = [],
			healthyData = [],
			infectedData = [];

		switch (yieldParameterValue) {
			case 'Year3':
				var data25y3 = [],
					data50y3 = [],
					data75y3 = [];
				scenarios = [healthyData, data25y3, data50y3, data75y3, infectedData];
				scenarioColName = [null, '25y3', '50y3', '75y3', 'noAction'];
				break;
			case 'Year5':
				var data25y5 = [],
					data50y5 = [],
					data75y5 = [];
				scenarios = [healthyData, data25y5, data50y5, data75y5, infectedData];
				scenarioColName = [null, '25y5', '50y5', '75y5', 'noAction'];
				break;
			case 'Year10':
				var data25y10 = [],
					data50y10 = [],
					data75y10 = [];
				scenarios = [healthyData, data25y10, data50y10, data75y10, infectedData];
				scenarioColName = [null, '25y10', '50y10', '75y10', 'noAction'];
				break;
		}
		
		var years = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

		for (var i in healthyYields) {
			healthyData[i] = { "x" : i, "y" : healthyYields[i] };
		}

		var margin = {top: 20, right: 35, bottom: 30, left: 35},
			padding = { left: 20 },
		    width = ($('body').width() < 960) ? $('body').width() - margin.left - padding.left - margin.right : 960 - margin.left - padding.left - margin.right,
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
			.attr("width", width + margin.left + padding.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + parseInt(margin.left + padding.left) + "," + margin.top + ")");

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
		console.log(healthyData);

		svg.selectAll("dot")
			.data(healthyData)
			.enter().append("circle")
			.attr("r", 3.5)
			.attr("fill","blue")
			.attr("cx", function(d) { return x(d.x); })
			.attr("cy", function(d) { return y(d.y); });

		d3.tsv("yield-rates.tsv", function(data) {
			for (var i in healthyYields) {
				scenarios[4][i] = { "x" : i, "y" : healthyYields[i]*data[i][scenarioColName[4]]/100 };
			}
			
			svg.append("path")
				.attr("d", line(scenarios[4]))
				.attr("class", "line")
				.attr("stroke", "red")
				.attr("stroke-width", 2)
				.attr("fill", "none");

			svg.selectAll("dot")
				.data(scenarios[4])
				.enter().append("circle")
				.attr("r", 3.5)
				.attr("fill","red")
				.attr("cx", function(d) { return x(d.x); })
				.attr("cy", function(d) { return y(d.y); });

			for (var i in healthyYields) {
				scenarios[1][i] = { "x" : i, "y" : healthyYields[i]*data[i][scenarioColName[1]]/100 };
			}

			svg.append("path")
				.attr("d", line(scenarios[1]))
				.attr("class", "line")
				.attr("stroke", "yellowgreen")
				.attr("stroke-width", 2)
				.attr("fill", "none");

			svg.selectAll("dot")
				.data(scenarios[1])
				.enter().append("circle")
				.attr("r", 3.5)
				.attr("fill","yellowgreen")
				.attr("cx", function(d) { return x(d.x); })
				.attr("cy", function(d) { return y(d.y); });

			for (var i in healthyYields) {
				scenarios[2][i] = { "x" : i, "y" : healthyYields[i]*data[i][scenarioColName[2]]/100 };
			}

			svg.append("path")
				.attr("d", line(scenarios[2]))
				.attr("class", "line")
				.attr("stroke", "darkorchid")
				.attr("stroke-width", 2)
				.attr("fill", "none");

			svg.selectAll("dot")
				.data(scenarios[2])
				.enter().append("circle")
				.attr("r", 3.5)
				.attr("fill","darkorchid")
				.attr("cx", function(d) { return x(d.x); })
				.attr("cy", function(d) { return y(d.y); });

			for (var i in healthyYields) {
				scenarios[3][i] = { "x" : i, "y" : healthyYields[i]*data[i][scenarioColName[3]]/100 };
			}

			svg.append("path")
				.attr("d", line(scenarios[3]))
				.attr("class", "line")
				.attr("stroke", "lightskyblue")
				.attr("stroke-width", 2)
				.attr("fill", "none");

			svg.selectAll("dot")
				.data(scenarios[3])
				.enter().append("circle")
				.attr("r", 3.5)
				.attr("fill","lightskyblue")
				.attr("cx", function(d) { return x(d.x); })
				.attr("cy", function(d) { return y(d.y); });

		});

	} else if ( $('input[name=figuredisplay]:checked').val() == 'netreturns' ) {
		var parameterValue = $('input[name=yearfig]:checked').val();
		var scenarios = [],
			scenarioColName = [],
			healthyData = [],
			untreatedData = [];

		switch (parameterValue) {
			case 'Year3':
				var data25y3 = [],
					data50y3 = [],
					data75y3 = [];
				scenarios = [healthyData, data25y3, data50y3, data75y3, untreatedData];
				scenarioColName = [null, '25y3', '50y3', '75y3', 'noAction'];
				break;
			case 'Year5':
				var data25y5 = [],
					data50y5 = [],
					data75y5 = [];
				scenarios = [healthyData, data25y5, data50y5, data75y5, untreatedData];
				scenarioColName = [null, '25y5', '50y5', '75y5', 'noAction'];
				break;
			case 'Year10':
				var data25y10 = [],
					data50y10 = [],
					data75y10 = [];
				scenarios = [healthyData, data25y10, data50y10, data75y10, untreatedData];
				scenarioColName = [null, '25y10', '50y10', '75y10', 'noAction'];
				break;
		}

		var years = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

		var margin = {top: 20, right: 35, bottom: 30, left: 35},
			padding = {left: 20}
		    width = ($('body').width() < 960) ? $('body').width() - margin.left - padding.left - margin.right : 960 - margin.left - padding.left - margin.right,
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
			.attr("width", width + margin.left + padding.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + parseInt(margin.left + padding.left) + "," + margin.top + ")");

		for (var i in healthyYields) {
			healthyData[i] = { "x" : i, "y" : scenarioCDNRObject.healthy[i] };
		}

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
			.text("Cumulative Discounted Net Returns (2013 dollars)");

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

		for (var i in healthyYields) {
			untreatedData[i] = { "x" : i, "y" : scenarioCDNRObject.untreated[i] };
		}

		svg.append("path")
			.attr("d", line(untreatedData))
			.attr("class", "line")
			.attr("stroke", "red")
			.attr("stroke-width", 2)
			.attr("fill", "none");

		svg.selectAll("dot")
			.data(untreatedData)
			.enter().append("circle")
			.attr("r", 3.5)
			.attr("fill","red")
			.attr("cx", function(d) { return x(d.x); })
			.attr("cy", function(d) { return y(d.y); });

console.log(scenarioCDNRObject);

		svg.append("path")
			.attr("d", line(scenarioCDNRObject[scenarioColName[1]]))
			.attr("class", "line")
			.attr("stroke", "yellowgreen")
			.attr("stroke-width", 2)
			.attr("fill", "none");

		svg.selectAll("dot")
			.data(scenarioCDNRObject[scenarioColName[1]])
			.enter().append("circle")
			.attr("r", 3.5)
			.attr("fill","yellowgreen")
			.attr("cx", function(d) { return x(d.x); })
			.attr("cy", function(d) { return y(d.y); });

		svg.append("path")
			.attr("d", line(scenarioCDNRObject[scenarioColName[2]]))
			.attr("class", "line")
			.attr("stroke", "darkorchid")
			.attr("stroke-width", 2)
			.attr("fill", "none");

		svg.selectAll("dot")
			.data(scenarioCDNRObject[scenarioColName[2]])
			.enter().append("circle")
			.attr("r", 3.5)
			.attr("fill","darkorchid")
			.attr("cx", function(d) { return x(d.x); })
			.attr("cy", function(d) { return y(d.y); });

		svg.append("path")
			.attr("d", line(scenarioCDNRObject[scenarioColName[3]]))
			.attr("class", "line")
			.attr("stroke", "lightskyblue")
			.attr("stroke-width", 2)
			.attr("fill", "none");

		svg.selectAll("dot")
			.data(scenarioCDNRObject[scenarioColName[3]])
			.enter().append("circle")
			.attr("r", 3.5)
			.attr("fill","lightskyblue")
			.attr("cx", function(d) { return x(d.x); })
			.attr("cy", function(d) { return y(d.y); });
	}

}

function type(d) {
	  d.x = +d.x;
	  d.y = +d.y;
	  //d.healthyYields = +d.healthyYields;
	  return d;
	}