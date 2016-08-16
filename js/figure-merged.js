
function the_figure(whichYears, moreParameters, figuredisplay, scenarioYieldObject, scenarioCDNRObject) {

	var dependentVariable,
		dotSize = ( $(window).width() > 768) ? 3.5 : 2,
		margin = {top: 10, right: 35, bottom: 30, left: 50},
		padding = {left: ($(window).width() > 768) ? 40 : 15, right: 0, bottom: 20, top: 0},
		scenarioColors = ['red', 'blue'],
		scenarioNames = ['untreated', 'healthy'],
		scenarioObject = false,
		widescreen = ($(window).width() > 1024) ? true : false,
		years = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
		yTicks = (svgHeight/50 > 4) ? parseInt(svgHeight/50) : 5;

		console.log('first set set');
	if ($(window).height() / $(window).width() < .56 ) {
		console.log('<.56');
		var height = ( $(window).height() < 486 ) ? $(window).height() - margin.top - margin.bottom - 100 - padding.top - padding.bottom : 486 - margin.top - margin.bottom - 100 - padding.top - padding.bottom,
		width = height/0.506;
		console.log('height=' + height + ', width=' + width);
	} else {
		console.log('>.56');
		var width = ($(window).width() < 960) ? $('body').width() - margin.left - margin.right - padding.left - padding.right : 960 - margin.left - margin.right- padding.left - padding.right,
			height = width*0.506;
		console.log('height=' + height + ', width=' + width);
	}
	var svgWidth = parseInt(width + margin.left + padding.left + margin.right),
		svgHeight = parseInt(height + margin.top + padding.top + margin.bottom + padding.bottom);

	
	if ( figuredisplay === 'yield' ) {
		scenarioObject = scenarioYieldObject;
		dependentVariable = (widescreen) ? 'Yield (Tons / Acre)' : 'Yield';
	} else if ( figuredisplay === 'netreturns' ) {
		scenarioObject = scenarioCDNRObject;
		dependentVariable = (widescreen) ? 'Cumulative Discounted Net Returns (2013 dollars)' : 'CDNR (2013 $)';
	}

	var figureCount = whichYears.length;
	for (var k=0; k<figureCount; k++) {
		if (scenarioObject) {
			var parameterValue = whichYears[k].substr(4),
				friendlyPCValue = ( moreParameters.pc !== '' ) ? moreParameters.pc : '0',
				figureSubhead = 'Year ' + parameterValue,
				figureTitle = (figuredisplay === 'yield') ? 'Figure ' + parseInt(k+1) + '&#8212;Vineyard Yield (Tons per Acre) at Various Disease Control Efficacy Rates' : 'Figure ' + parseInt(k+1) + '&#8212;Cumulative Discounted Net Returns per Acre at Various Disease Control Efficacy Rates';

			if (figuredisplay === 'netreturns') {
				figureSubhead += ' Adoption of $' + friendlyPCValue + ' per Acre-Year Preventative Practice';
			} else {
				figureSubhead += ' Preventative Practice Adoption';
			}

			if (moreParameters.friendlyRegion !== 'Custom')
				figureSubhead += ', ' + moreParameters.friendlyRegion + ' Region';

				 
			
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
			    .ticks(yTicks)
			    .tickFormat(function(d) { return currencyFormat(d); })
			    .orient("left");

			var line = d3.svg.line()
			    .x(function(d) { return x(d.x); })
		 		.y(function(d) { return y(d.y); })
		 		.interpolate("linear");

			$('.figure-area').append('<section class="figure-wrap" id="figure' + parameterValue + '"><h4 class="figTitle">' + figureTitle + '</h4><h4 class="figSubhead">' + figureSubhead + '</h4></section><div class="legend"><img src="img/figures/legend.png" /></div><p><a class="swipebox" href="#figure' + parameterValue + '"><i class="fa fa-search-plus" aria-hidden="true"></i> View fullscreen</a></p><div class="figure-bottom-link"><span class="glossary-link hide-on-print hide-on-widescreen"><a href="efficacy-information.html">Disease control efficacy rate information</a></span></div>');

			var svg = d3.select("#figure" + parameterValue).append("svg")
				.attr("width", svgWidth)
				.attr("height", svgHeight)
				.attr("id", "figure" + parameterValue)
				.append("g")
				.attr("transform", "translate(" + parseInt(margin.left + padding.left) + "," + margin.top + ")");

			x.domain(d3.extent(years));
			y.domain(d3.extent(scenarioObject.healthy, function(d) { return d.y; }));

			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis)
				.append("text")
				.attr("x", "50%")
				.attr("y", "3em")
				.style("text-anchor", "end")
				.text("Vineyard Age (Years)");

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
					.attr("r", dotSize)
					.attr("fill", scenarioColors[i])
					.attr("cx", function(d) { return x(d.x); })
					.attr("cy", function(d) { return y(d.y); });
			}
		}
	}

	/*$('.figure-area svg').each(function() {
		$(this).after('<div class="figure-bottom-link"><br /><span class="glossary-link hide-on-print hide-on-widescreen"><a href="efficacy-information.html">Disease control efficacy rate information</a></span></div>');
	})*/

	if (figureCount===0) {
		$('.figure-area').prepend('<p class="alert">To generate a figure, <a href="#" class="close-tab">close this tab</a> or return to the figure parameters form tab and select at least one year of practice adoption.</p>');
	}

}

function type(d) {
	  d.x = +d.x;
	  d.y = +d.y;
	  return d;
}