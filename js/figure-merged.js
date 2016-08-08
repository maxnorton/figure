
function the_figure(whichYears, moreParameters, figuredisplay, scenarioYieldObject, scenarioCDNRObject) {

	var dependentVariable,
		margin = {top: 60, right: 35, bottom: 30, left: 50},
		padding = {left: 20},
		scenarioColors = ['red', 'blue'],
		scenarioNames = ['untreated', 'healthy'],
		scenarioObject = false,
	    width = ($('body').width() < 960) ? $('body').width() - margin.left - padding.left - margin.right : 960 - margin.left - padding.left - margin.right,
			height = width*0.506,
		years = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

	if ( figuredisplay === 'yield' ) {
		scenarioObject = scenarioYieldObject;
		dependentVariable = 'Yield (Tons / Acre)';
	} else if ( figuredisplay === 'netreturns' ) {
		scenarioObject = scenarioCDNRObject;
		dependentVariable = 'Cumulative Discounted Net Returns (2013 dollars)';
	}

	var figureCount = whichYears.length;
	for (var k=0; k<figureCount; k++) {
		if (scenarioObject) {
			var parameterValue = whichYears[k].substr(4),
				friendlyPCValue = ( moreParameters.pc !== '' ) ? moreParameters.pc : '0',
				figureSubhead = 'Year ' + parameterValue,
				figureTitle = (figuredisplay === 'yield') ? 'Vineyard Yield (Tons per Acre) at Various Disease Control Efficacy Rates' : 'Cumulative Discounted Net Returns per Acre at Various Disease Control Efficacy Rates';

			if (figuredisplay === 'netreturns') {
				figureSubhead += ' Adoption of $' + friendlyPCValue + ' per Acre-Year Preventative Practice';
			} else {
				figureSubhead += ' Preventative Practice Adoption';
			}

			if (moreParameters.region !== 'custom')
				figureSubhead += ', ' + moreParameters.region + ' Region';

				 
			
			if (parameterValue) {
				scenarioColors = ['yellowgreen', 'darkorchid', 'lightskyblue', 'red', 'blue'];
				scenarioNames = ['25y' + parameterValue, '50y' + parameterValue, '75y' + parameterValue, 'untreated', 'healthy'];
			}

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

			$('.figure-area').append('<section class="figure-wrapper" id="figure' + parameterValue + '"></section><p><a class="swipebox" href="#figure' + parameterValue + '"><i class="fa fa-search-plus" aria-hidden="true"></i> View fullscreen</a></p>');

			var svg = d3.select("#figure" + parameterValue).append("svg")
				.attr("width", width + margin.left + padding.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.attr("id", "figure" + parameterValue)
				.append("g")
				.attr("transform", "translate(" + parseInt(margin.left + padding.left) + "," + margin.top + ")");

			x.domain(d3.extent(years));
			y.domain(d3.extent(scenarioObject.healthy, function(d) { return d.y; }));

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
				.text(dependentVariable);

			for (var i in scenarioNames) {
				svg.append("path")
					.attr("d", line(scenarioObject[scenarioNames[i]]))
					.attr("class", "line")
					.attr("stroke", scenarioColors[i])
					.attr("stroke-width", 2)
					.attr("fill", "none");

				svg.selectAll("dot")
					.data(scenarioObject[scenarioNames[i]])
					.enter().append("circle")
					.attr("r", 3.5)
					.attr("fill", scenarioColors[i])
					.attr("cx", function(d) { return x(d.x); })
					.attr("cy", function(d) { return y(d.y); });
			}

			svg.append("text")
		        .attr("x", (width / 2))             
		        .attr("y", 0 - (3 * margin.top / 4))
		        .attr("text-anchor", "middle")  
		        .style("font-size", "1.1em") 
		        .text(figureTitle);
		      svg.append("text")
		        .attr("x", (width / 2))             
		        .attr("y", 0 - (3 * margin.top / 8))
		        .attr("text-anchor", "middle")  
		        .style("font-size", "1em") 
		        .text(figureSubhead);

		}
	}

	$('.figure-area svg').each(function() {
		$(this).after('<div class="legend"><img src="img/figures/legend.png" /><br /><span class="glossary-link hide-on-print"><a href="efficacy-information.html"><i class="fa fa-question-circle"></i> Disease control efficacy rate information</a></span></div>');
	})

	if (figureCount===0) {
		$('.figure-area').prepend('<p class="alert">To generate a figure, <a href="#" class="close-tab">close this tab</a> or return to the figure parameters form tab and select at least one year of practice adoption.</p>');
	}

}

function type(d) {
	  d.x = +d.x;
	  d.y = +d.y;
	  return d;
}