function the_table(discount, cost0, cost1, cost2, cost3, pc, price, yield0, yield1, yield2, yield3, yield4, yield5) {
	var missingVals = [],
		region = $('select[name=region]').val();

	d3.tsv("regional-assumptions.tsv", function(data) {
		var regionIndex;
		switch (region) {
			case 'napa':
				regionIndex = 0;
				break;
			case 'nsj':
				regionIndex = 1;
				break;
			case 'cc':
				regionIndex = 2;
				break;
			case 'lake':
				regionIndex = 3;
				break;
			case 'sonoma':
				regionIndex = 4;
				break;
			case 'custom':
				regionIndex = 1;
		}

		if (discount=='') {
			discount = '3';
			missingVals.push('discount');
		}
		if (cost0=='') {
			cost0 = data[regionIndex]['cost0'];
			missingVals.push('cost0');
		}
		if (cost1=='') {
			cost1 = data[regionIndex]['cost1'];
			missingVals.push('cost1');
		}
		if (cost2=='') {
			cost2 = data[regionIndex]['cost2'];
			missingVals.push('cost2');
		}
		if (cost3=='') {
			cost3 = data[regionIndex]['cost3'];
			missingVals.push('cost3');
		}
		if (pc=='') {
			pc = 0;
			missingVals.push('pc');
		}
		if (price=='') {
			price = data[regionIndex]['price'];
			missingVals.push('price');
		}
		if (yield0=='') {
			yield0 = data[regionIndex]['yield0'];
			missingVals.push('yield0');
		}
		if (yield1=='') {
			yield1 = data[regionIndex]['yield1'];
			missingVals.push('yield1');
		}
		if (yield2=='') {
			yield2 = data[regionIndex]['yield2'];
			missingVals.push('yield2');
		}
		if (yield3=='') {
			yield3 = data[regionIndex]['yield3'];
			missingVals.push('yield3');
		}
		if (yield4=='') {
			yield4 = data[regionIndex]['yield4'];
			missingVals.push('yield4');
		}
		if (yield5=='') {
			yield5 = data[regionIndex]['yield5'];
			missingVals.push('yield5');
		}
	});

	d3.tsv("yield-rates.tsv", function(data) {
		var acdnb25y3 = [],
			acdnb25y5 = [],
			acdnb25y10 = [],
			acdnb50y3 = [],
			acdnb50y5 = [],
			acdnb50y10 = [],
			acdnb75y3 = [],
			acdnb75y5 = [],
			acdnb75y10 = [],
			ccthv = [],
			costs = [],
			compoundDiscount,
			discountFactor = 1/(1+discount/100),
			healthyACDNBna = [],
			scenarioCDNRObject = {},
			scenarioYieldObject = {},
			treatedYields = [],
			treatedNR = [],
			treatedDNR = [],
			treatedCDNR = [];

		var bea = {
				'healthy' : null,
				'untreated' : null,
				'25y3' : 0,
				'50y3' : 0,
				'75y3' : 0,
				'25y5' : 0,
				'50y5' : 0,
				'75y5' : 0,
				'25y10' : 0,
				'50y10' : 0,
				'75y10' : 0			
			},
			lpy = {
				'healthy' : null,
				'untreated' : null,
				'25y3' : 0,
				'50y3' : 0,
				'75y3' : 0,
				'25y5' : 0,
				'50y5' : 0,
				'75y5' : 0,
				'25y10' : 0,
				'50y10' : 0,
				'75y10' : 0			
			},
			bep = {
				'healthy' : 0,
				'untreated' : 1,
				'25y3' : 0,
				'50y3' : 0,
				'75y3' : 0,
				'25y5' : 0,
				'50y5' : 0,
				'75y5' : 0,
				'25y10' : 0,
				'50y10' : 0,
				'75y10' : 0			
			},
			scenarios = {
				'healthy' : 'Healthy, untreated',
				'untreated' : 'Infected, untreated',
				'25y3' : '25% DCE treatment adopted year 3',
				'25y5' : '25% DCE treatment adopted year 5',
				'25y10' : '25% DCE treatment adopted year 10',
				'50y3' : '50% DCE treatment adopted year 3',
				'50y5' : '50% DCE treatment adopted year 5',
				'50y10' : '50% DCE treatment adopted year 10',
				'75y3' : '75% DCE treatment adopted year 3',
				'75y5' : '75% DCE treatment adopted year 5',
				'75y10' : '75% DCE treatment adopted year 10'
			},
			scenarioKeys = Object.keys(scenarios);

		scenarioYieldObject.healthy = [];
		scenarioYieldObject.untreated = [];
		scenarioCDNRObject.healthy = [];
		scenarioCDNRObject.untreated = [];

		var healthyYields = [
				parseInt(yield0),
				parseInt(yield1),
				parseInt(yield2),
				parseInt(yield3),
				parseInt(yield4),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5),
				parseInt(yield5)		
			],
			untreatedYields = [];

		for (var i in healthyYields) {
			untreatedYields[i] = healthyYields[i]*data[i].noAction/100;
			scenarioYieldObject.healthy[i] = {"x": i, "y": healthyYields[i]};
			scenarioYieldObject.untreated[i] = {"x": i, "y": untreatedYields[i]};
		}

		costs = [
			cost0,
			cost1,
			cost2,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3,
			cost3			
		];

		var untreatedNR = [];
		for (i in untreatedYields) {
			untreatedNR[i] = price*untreatedYields[i]-costs[i];
		}

		var untreatedDNR = [];
		for (i in untreatedNR) {
			compoundDiscount = Math.pow(discountFactor, i);
			untreatedDNR[i] = untreatedNR[i]*compoundDiscount;
		}

		var untreatedCDNR = [ untreatedDNR[0] ];
		for (i=1; i<untreatedDNR.length; i++) {
			untreatedCDNR[i] = untreatedDNR[i] + untreatedCDNR[i-1];
		}
		

 		var healthyCDNRna = [ price*healthyYields[0] - costs[0] ];
 		var healthyLPY = '-';
 		for (i=1; i<healthyYields.length; i++) {
 			compoundDiscount = Math.pow(discountFactor, i);
 			healthyCDNRna[i] = (price*healthyYields[i] - costs[i])*compoundDiscount + healthyCDNRna[parseInt(i-1)];
 			if (healthyCDNRna[i] > healthyCDNRna[parseInt(i-1)]) {
 				healthyLPY = i;
 			}
 		}
 		var healthyACDNBnaDisplay = healthyCDNRna[25] - untreatedCDNR[25];
 		if (healthyACDNBnaDisplay < 0) {
 			healthyACDNBnaDisplay = '-$' + parseFloat(-1*healthyACDNBnaDisplay).toFixed(2);
 		} else {
 			healthyACDNBnaDisplay = '$' + parseFloat(healthyACDNBnaDisplay).toFixed(2);
 		}

 		var healthyBEAnaDisplay = -1;
 		for (i in healthyCDNRna) {
 			if (healthyCDNRna[i+1] > 0) {
 				healthyBEAnaDisplay = i;
 				break;
 			}
 		}
 		if (healthyBEAnaDisplay === -1) {
 			healthyBEAnaDisplay  = 'Never breaks even';
 			healthyLPY = '-';
 		}

 		healthyACDNBna = [];
 		for (i in healthyCDNRna) {
 			healthyACDNBna[i] = healthyCDNRna[i] - untreatedCDNR[i];
 		}

 		var untreatedLPY = 0;
		while (untreatedDNR[untreatedLPY] < 0 && untreatedLPY < 25) {
 			untreatedLPY++;
 		}
 		if (untreatedLPY === 25) {
 			untreatedLPY = 'Untreated vineyard never profitable';
 		} else {
	 		while (untreatedDNR[untreatedLPY] > 0 && untreatedLPY < 25) {
	 			untreatedLPY++;
	 		}
	 		untreatedLPY = untreatedLPY - 1;
	 	}

 		var missingValsAlert = '';
 		if (missingVals.length > 0) {
 			var regionName;
	 		switch (region) {
				case 'napa':
					regionName = 'Napa';
					break;
				case 'nsj':
					regionName = 'Northern San Joaquin';
					break;
				case 'cc':
					regionName = 'Central Coast';
					break;
				case 'lake':
					regionName = 'Lake';
					break;
				case 'sonoma':
					regionName = 'Sonoma';
					break;
				case 'custom':
					regionName = 'Northern San Joaquin';
			}
 			missingValsAlert = '<p class="alert">No values specified for: ';
 			for (i=0; i<missingVals.length - 1; i++) {
 				missingValsAlert += missingVals[i] + ', ';
 			}
 			console.log('pc' in missingVals);
 			var missingValsAlertTag = ('pc' in missingVals) ? 'with an preventative practice cost of zero, as with delayed pruning.</p>' : '.</p>';
 			missingValsAlert += missingVals[i] + '</p><p class="alert">Calculations below have been performed using default values for the ' + regionName + ' region' + missingValsAlertTag;
 		}
 		var the_table_html = '<hr /><h2>Results</h2>' + missingValsAlert + '<section class="figure-area"></section><h3>Output table</h3><table><thead><th><h4>Scenario</h4></th><th><h4>ACDNB</h4></th><th><h4>Age adoption pays off</h4></th><th><h4>Last profitable year</h4></th><th><h4>Infection probability threshold</h4></th></thead><tbody>';
		the_table_html += '<tr><td>' + scenarios.healthy + '</td><td>' + healthyACDNBnaDisplay + '</td><td>' + healthyBEAnaDisplay + '</td><td>' + healthyLPY + '</td><td>' + 0 + '</td></tr>';
		the_table_html += '<tr><td>' + scenarios.untreated + '</td><td>' + '-' + '</td><td>' + '-' + '</td><td>' + untreatedLPY + '</td><td>' + 1 + '</td></tr>';

 		for (var a=2; a<scenarioKeys.length; a++) {

 			var selectCol = scenarioKeys[a];

 			var age = parseInt(selectCol.substr(3));

 			var pcFtnOfT = [];
			for (var l=0; l<age; l++) {
				pcFtnOfT[l] = 0;
			}
			for (l=age; l<26; l++) {
				pcFtnOfT[l] = pc;
			}

			var healthyNR = [];
			for (i in healthyYields) {
				healthyNR[i] = price*healthyYields[i]-costs[i]-pcFtnOfT[i];
			}

			var healthyDNR = [];
			for (i in healthyNR) {
				compoundDiscount = Math.pow(discountFactor, i);
				healthyDNR[i] = healthyNR[i]*compoundDiscount;
			}

			var healthyCDNR = [ healthyDNR[0] ];
			for (i=1; i<healthyDNR.length; i++) {
				healthyCDNR[i] = healthyDNR[i] + healthyCDNR[i-1];
			}

			for (i in healthyCDNR) {
				scenarioCDNRObject.healthy[i] = {"x": i, "y": healthyCDNR[i]};
				scenarioCDNRObject.untreated[i] = {"x": i, "y": untreatedCDNR[i]};
			}

			treatedYields = [];
			for (i in healthyYields) {
				treatedYields[i] = healthyYields[i]*data[i][selectCol]/100;
			}

			var thisKey = scenarioKeys[a];
			scenarioYieldObject[thisKey] = [];
			for (i in healthyYields) {
				scenarioYieldObject[thisKey][i] = {"x" : i, "y" : treatedYields[i]};
			}

			treatedNR = [];
			for (i in treatedYields) {
				treatedNR[i] = price*treatedYields[i]-costs[i]-pcFtnOfT[i];
			}

			treatedDNR = [];
			for (i in treatedNR) {
				compoundDiscount = Math.pow(discountFactor, i);
				treatedDNR[i] = treatedNR[i]*compoundDiscount;
			}

			treatedCDNR = [ treatedDNR[0] ];
			for (i=1; i<treatedDNR.length; i++) {
				treatedCDNR[i] = treatedDNR[i] + treatedCDNR[i-1];
			}

			scenarioCDNRObject[thisKey] = [];
			for (i in healthyYields) {
				scenarioCDNRObject[thisKey][i] = {"x" : i, "y" : treatedCDNR[i]};
			}

			ccthv = [ parseInt(pcFtnOfT[0]) ];
			for (i=1; i<healthyDNR.length; i++) {
				ccthv[i] = parseInt(pcFtnOfT[i]) + parseInt(ccthv[i-1]);
			}

			var acdnb = [];
			for (i in treatedCDNR) {
				acdnb[i] = treatedCDNR[i] - untreatedCDNR[i];
	 		}

	 		switch (selectCol) {
	 			case '25y3':
	 				acdnb25y3 = acdnb;
	 				break;
	 			case '25y5':
	 				acdnb25y5 = acdnb;
	 				break;
	 			case '25y10':
	 				acdnb25y10 = acdnb;
	 				break;
	 			case '50y3':
	 				acdnb50y3 = acdnb;
	 				break;
	 			case '50y5':
	 				acdnb50y5 = acdnb;
	 				break;
	 			case '50y10':
	 				acdnb50y10 = acdnb;
	 				break;
	 			case '75y3':
	 				acdnb75y3 = acdnb;
	 				break;
	 			case '75y5':
	 				acdnb75y5 = acdnb;
	 				break;
	 			case '75y10':
	 				acdnb75y10 = acdnb;
	 				break;
	 		}

	 		for (i in treatedCDNR) {
	 			if (treatedCDNR[i] > untreatedCDNR[i]) {
	 				bea[selectCol] = i;
	 				break;
	 			}
	 		}
	 		if (parseInt(bea[selectCol])===0 && treatedCDNR[0] <= untreatedCDNR[0]) {
	 			bea[selectCol] = 'Never breaks even';
	 		}

	 		lpy[selectCol] = selectCol.substr(3);
	 		while (treatedNR[parseInt(lpy[selectCol])+1] <= 0 && parseInt(lpy[selectCol])<25) {
	 			lpy[selectCol]++;
	 		}
	 		if (parseInt(lpy[selectCol])===25) {
	 			lpy[selectCol] = 'Treatment never profitable';
	 		} else {
		 		while (treatedNR[parseInt(lpy[selectCol])+1] > 0 && parseInt(lpy[selectCol])<25) {
		 			lpy[selectCol]++;
		 		}
		 	}

	 		bep[selectCol] = (healthyCDNRna[25] - healthyCDNR[25]) / ( (treatedCDNR[25] - healthyCDNR[25]) - (untreatedCDNR[25] - healthyCDNRna[25]) );
	 		if (bep[selectCol] > 1) {
	 			bep[selectCol] = 1;
	 		}
	 		bep[selectCol] = bep[selectCol].toFixed(3);

	 		var acdnbDisplay = (acdnb[25] !== null ) ? acdnb[25].toFixed(2) : '-';
	 		if (acdnbDisplay !== '-' && acdnbDisplay < 0) {
 				acdnbDisplay = '-$' + parseFloat(-1*acdnbDisplay).toFixed(2);
 			} else if (acdnbDisplay !== '-') {
 				acdnbDisplay = '$' + parseFloat(acdnbDisplay).toFixed(2);
 			}

			the_table_html += '<tr><td>' + scenarios[selectCol] + '</td><td>' + acdnbDisplay + '</td><td>' + bea[selectCol] + '</td><td>' + lpy[selectCol] + '</td><td>' + bep[selectCol] + '</td></tr>';

	 	}

		/***** Add variable definitions section
		---------------------------------------- */
		var varDefs = '<section class="varDefs-printable"><h3 id="variabledefinitions">Variable definitions</h3><p><strong>Cumulative discounted net returns:</strong> The cumulative net returns (returns &minus; costs) per acre over 25 years for a healthy vineyard, an untreated infected vineyard, and infected vineyards where action is taken. Current and future dollar amounts are in 2013 dollars and are discounted to 2013 using a 3% discount rate. </p><p><a id="tablevars"></a></p><p><strong>Additional cumulative discounted net benefits (ACDNB):</strong> The difference in cumulative net returns (returns - costs) per acre over 25 years between an infected vineyard where action is taken and an untreated infected vineyard. Current and future dollar amounts are in 2013 dollars and are discounted to 2013 using a 3% discount rate. </p><p><strong>Last profitable year:</strong> The last year an infected vineyard generates positive annual net returns (returns - costs). This year is the same for discounted and nominal net returns. </p><p><strong>Age adoption pays off:</strong> The age when cumulative discounted net returns (returns – costs) for a treated infected vineyard exceed those from an untreated infected vineyard. </p><p><strong>Infection probability threshold:</strong> The probability of infection where expected cumulative discounted net returns from treating a vineyard equals the expected cumulative discounted net returns from not treating a vineyard. If you perceive a probability of infection less than this probability, then not treating the vineyard generates greater cumulative discounted net returns than a treated vineyard, and vice versa. </p></section>';

		the_table_html += '</tbody></table>' + varDefs + '<p class="print-link"><a href="javascript:window.print()"><i class="fa fa-print" aria-hidden="true"></i> Print these results.</a></p><p class="adjust-link"><a href="#figureparameters" onclick="$(\'body,html\').stop(true,true).animate({scrollTop: $(\'#figureparameters\').offset().top - $(\'header\').height()}, \'500\', \'swing\');">Adjust parameters</a></p>';

		$('.results').html(the_table_html);

		the_figure(scenarioYieldObject, scenarioCDNRObject);

		$('body,html').stop(true,true).animate({scrollTop: $('#results').offset().top - $('header').height()}, '500', 'swing');

	});

}