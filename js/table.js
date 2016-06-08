var t, a, eff, discount; // indices
var cost0, cost1, cost2, cost3, pc, price, yield0, yield1, yield2, yield3, yield4; // user-set parameters
var treatedCDNR, treatedDNR, treatedNR, treatedYields = new Array(); // outcomes
var costs, pcFtnOfT, isProfitable = new Array(); // collation arrays

function the_table(discount, cost0, cost1, cost2, cost3, pc, price, yield0, yield1, yield2, yield3, yield4) {
	d3.tsv("yield-rates.tsv", function(data) {

		var healthyACDNBna, acdnb25y3, acdnb25y5, acdnb25y10, acdnb50y3, acdnb50y5, acdnb50y10, acdnb75y3, acdnb75y5, acdnb75y10, treatedYields, treatedNR, treatedDNR, treatedCDNR, ccthv = new Array();
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
		};

		var lpy = {
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
		};

		var bep = {
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
		};

		var scenarios = {
			'healthy' : 'Healthy, untreated',
			'untreated' : 'Infected, untreated',
			'25y3' : '25% DCE treatment adopted year 3',
			'50y3' : '50% DCE treatment adopted year 3',
			'75y3' : '75% DCE treatment adopted year 3',
			'25y5' : '25% DCE treatment adopted year 5',
			'50y5' : '50% DCE treatment adopted year 5',
			'75y5' : '75% DCE treatment adopted year 5',
			'25y10' : '25% DCE treatment adopted year 10',
			'50y10' : '50% DCE treatment adopted year 10',
			'75y10' : '75% DCE treatment adopted year 10'
		};

		var scenarioKeys = Object.keys(scenarios);

		var discountFactor = 1/(1+discount/100);

		healthyYields = [
			yield0,
			yield1,
			yield2,
			yield3,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,
			yield4,		
			yield4		
		];

		untreatedYields = [];
		for (var i in healthyYields) {
			untreatedYields[i] = healthyYields[i]*data[i]['noAction']/100;
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
		for (var i in untreatedYields) {
			untreatedNR[i] = price*untreatedYields[i]-costs[i];
		};	

		var untreatedDNR = [];
		for (var i in untreatedNR) {
			var compoundDiscount = Math.pow(discountFactor, i);
			untreatedDNR[i] = untreatedNR[i]*compoundDiscount;
		};	

		var untreatedCDNR = [ untreatedDNR[0] ];
		for (var i=1; i<untreatedDNR.length; i++) {
			untreatedCDNR[i] = untreatedDNR[i] + untreatedCDNR[i-1];
		};

 		var healthyCDNRna = [ price*healthyYields[0] - costs[0] ];
 		var healthyACDNBnaDisplay;
 		var healthyLPY = '-';
 		for (var i=1; i<healthyYields.length; i++) {
 			var compoundDiscount = Math.pow(discountFactor, i);
 			healthyCDNRna[i] = (price*healthyYields[i] - costs[i])*compoundDiscount + healthyCDNRna[parseInt(i-1)];
 			if (healthyCDNRna[i] > healthyCDNRna[parseInt(i-1)]) {
 				healthyACDNBnaDisplay = healthyCDNRna[i];
 				healthyLPY = i;
 			}
 		};
 		if (healthyACDNBnaDisplay < 0) {
 			healthyACDNBnaDisplay = '-$' + parseFloat(-1*healthyACDNBnaDisplay).toFixed(2);
 		} else {
 			healthyACDNBnaDisplay = '$' + parseFloat(healthyACDNBnaDisplay).toFixed(2);
 		}

 		var healthyBEAnaDisplay = -1;
 		for (var i in healthyCDNRna) {
 			if (healthyCDNRna[i+1] > 0) {
 				healthyBEAnaDisplay = i;
 				break;
 			};
 		};
 		if (healthyBEAnaDisplay == -1) {
 			healthyBEAnaDisplay  = 'Never breaks even';
 			healthyLPY = '-';
 		}

 		healthyACDNBna = [];
 		for (var i in healthyCDNRna) {
 			healthyACDNBna[i] = healthyCDNRna[i] - untreatedCDNR[i];
 		};

 		var untreatedLPY = 0;
		while (untreatedCDNR[untreatedLPY] < 0 && untreatedLPY < 25) {
 			untreatedLPY++;
 		}
 		if (untreatedLPY==25) {
 			untreatedLPY = 'Untreated vineyard never profitable';
 		} else {
	 		while (untreatedCDNR[untreatedLPY] > 0 && untreatedLPY < 25) {
	 			untreatedLPY++;
	 		}
	 	}

 		var the_table_html = '<hr /><h2>Results</h2><table><thead><th><h4>Scenario</h4></th><th><h4>ACDNB in last profitable year</h4></th><th><h4>Breakeven age</h4></th><th><h4>Last profitable year</h4></th><th><h4>Breakeven probability</h4></th></thead><tbody>';
		the_table_html += '<tr><td>' + scenarios['healthy'] + '</td><td>' + healthyACDNBnaDisplay + '</td><td>' + healthyBEAnaDisplay + '</td><td>' + healthyLPY + '</td><td>' + 0 + '</td></tr>';
		the_table_html += '<tr><td>' + scenarios['untreated'] + '</td><td>' + '-' + '</td><td>' + '-' + '</td><td>' + untreatedLPY + '</td><td>' + 1 + '</td></tr>';

 		for (var a=2; a<scenarioKeys.length; a++) {

 			var selectCol = scenarioKeys[a];

 			var age = parseInt(selectCol.substr(3));

 			var pcFtnOfT = [];
			for (var l=0; l<age; l++) {
				pcFtnOfT[l] = 0;
			};
			for (var l=age; l<26; l++) {
				pcFtnOfT[l] = pc;
			};

			var healthyNR = [];
			for (var i in healthyYields) {
				healthyNR[i] = price*healthyYields[i]-costs[i]-pcFtnOfT[i];
			};

			var healthyDNR = [];
			for (var i in healthyNR) {
				var compoundDiscount = Math.pow(discountFactor, i);
				healthyDNR[i] = healthyNR[i]*compoundDiscount;
			};

			var healthyCDNR = [ healthyDNR[0] ];
			for (var i=1; i<healthyDNR.length; i++) {
				healthyCDNR[i] = healthyDNR[i] + healthyCDNR[i-1];
			};

			treatedYields = [];
			for (var i in healthyYields) {
				treatedYields[i] = healthyYields[i]*data[i][selectCol]/100;
			};

			treatedNR = [];
			for (var i in treatedYields) {
				treatedNR[i] = price*treatedYields[i]-costs[i]-pcFtnOfT[i];
			};

			treatedDNR = [];
			for (var i in treatedNR) {
				var compoundDiscount = Math.pow(discountFactor, i);
				treatedDNR[i] = treatedNR[i]*compoundDiscount;
			};

			treatedCDNR = [ treatedDNR[0] ];
			for (var i=1; i<treatedDNR.length; i++) {
				treatedCDNR[i] = treatedDNR[i] + treatedCDNR[i-1];
			};

			ccthv = [ parseInt(pcFtnOfT[0]) ];
			for (var i=1; i<healthyDNR.length; i++) {
				ccthv[i] = parseInt(pcFtnOfT[i]) + parseInt(ccthv[i-1]);
			};

			var acdnb = [];
			for (var i in treatedCDNR) {
				acdnb[i] = treatedCDNR[i] - untreatedCDNR[i];
	 		};

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

	 		for (var i in treatedCDNR) {
	 			if (treatedCDNR[i] > untreatedCDNR[i]) {
	 				bea[selectCol] = i;
	 				break;
	 			};
	 		};
	 		if (bea[selectCol]==0 && treatedCDNR[0] <= untreatedCDNR[0]) {
	 			bea[selectCol] = 'Never breaks even';
	 		};

	 		lpy[selectCol] = selectCol.substr(3);
	 		while (treatedNR[parseInt(lpy[selectCol])+1] <= 0 && parseInt(lpy[selectCol])<25) {
	 			lpy[selectCol]++;
	 		}
	 		if (parseInt(lpy[selectCol])==25) {
	 			lpy[selectCol] = 'Treatment never profitable';
	 		} else {
		 		while (treatedNR[parseInt(lpy[selectCol])+1] > 0 && parseInt(lpy[selectCol])<25) {
		 			lpy[selectCol]++;
		 		}
		 	}

	 		bep[selectCol] = (healthyCDNRna[25] - healthyCDNR[25]) / ( (treatedCDNR[25] - healthyCDNR[25]) - (untreatedCDNR[25] - healthyCDNRna[25]) );
	 		if (bep[selectCol] > 1)
	 			bep[selectCol] = 1;
	 		bep[selectCol] = bep[selectCol].toFixed(3);

	 		var acdnbDisplay = (acdnb[parseInt(lpy[selectCol])] != null ) ? acdnb[parseFloat(lpy[selectCol])].toFixed(2) : '-';
	 		if (acdnbDisplay != '-' && acdnbDisplay < 0) {
 				acdnbDisplay = '-$' + parseFloat(-1*acdnbDisplay).toFixed(2);
 			} else if (acdnbDisplay != '-') {
 				acdnbDisplay = '$' + parseFloat(acdnbDisplay).toFixed(2);
 			}

			the_table_html += '<tr><td>' + scenarios[selectCol] + '</td><td>' + acdnbDisplay + '</td><td>' + bea[selectCol] + '</td><td>' + lpy[selectCol] + '</td><td>' + bep[selectCol] + '</td></tr>';

	 	};

		the_table_html += '</tbody></table>' + '<p class="print-link"><a href="javascript:window.print()"><i class="fa fa-print" aria-hidden="true"></i> Print these results.</a></p><p class="adjust-link"><a href="#form" onclick="$(\'body,html\').stop(true,true).animate({scrollTop: $(\'#form\').offset().top - $(\'header\').height()}, \'500\', \'swing\');">Adjust parameters</a></p>';
		$('.results').html(the_table_html);

		$('body,html').stop(true,true).animate({scrollTop: $('#results').offset().top - $('header').height()}, '500', 'swing');

	});
}

function the_table_and_figure(discount, cost0, cost1, cost2, cost3, pc, price, yield0, yield1, yield2, yield3, yield4) {
	d3.tsv("yield-rates.tsv", function(data) {

		var healthyACDNBna, acdnb25y3, acdnb25y5, acdnb25y10, acdnb50y3, acdnb50y5, acdnb50y10, acdnb75y3, acdnb75y5, acdnb75y10, treatedYields, treatedNR, treatedDNR, treatedCDNR, ccthv = new Array();
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
		};

		var lpy = {
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
		};

		var bep = {
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
		};

		var scenarios = {
			'healthy' : 'Healthy, untreated',
			'untreated' : 'Infected, untreated',
			'25y3' : '25% DCE treatment adopted year 3',
			'50y3' : '50% DCE treatment adopted year 3',
			'75y3' : '75% DCE treatment adopted year 3',
			'25y5' : '25% DCE treatment adopted year 5',
			'50y5' : '50% DCE treatment adopted year 5',
			'75y5' : '75% DCE treatment adopted year 5',
			'25y10' : '25% DCE treatment adopted year 10',
			'50y10' : '50% DCE treatment adopted year 10',
			'75y10' : '75% DCE treatment adopted year 10'
		};

		var scenarioKeys = Object.keys(scenarios);

		var discountFactor = 1/(1+discount/100);

		healthyYields = [
			parseInt(yield0),
			parseInt(yield1),
			parseInt(yield2),
			parseInt(yield3),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),
			parseInt(yield4),		
			parseInt(yield4)		
		];

		untreatedYields = [];
		for (var i in healthyYields) {
			untreatedYields[i] = healthyYields[i]*data[i]['noAction']/100;
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
		for (var i in untreatedYields) {
			untreatedNR[i] = price*untreatedYields[i]-costs[i];
		};	

		var untreatedDNR = [];
		for (var i in untreatedNR) {
			var compoundDiscount = Math.pow(discountFactor, i);
			untreatedDNR[i] = untreatedNR[i]*compoundDiscount;
		};	

		var untreatedCDNR = [ untreatedDNR[0] ];
		for (var i=1; i<untreatedDNR.length; i++) {
			untreatedCDNR[i] = untreatedDNR[i] + untreatedCDNR[i-1];
		};

 		var healthyCDNRna = [ price*healthyYields[0] - costs[0] ];
 		var healthyACDNBnaDisplay;
 		var healthyLPY = '-';
 		for (var i=1; i<healthyYields.length; i++) {
 			var compoundDiscount = Math.pow(discountFactor, i);
 			healthyCDNRna[i] = (price*healthyYields[i] - costs[i])*compoundDiscount + healthyCDNRna[parseInt(i-1)];
 			if (healthyCDNRna[i] > healthyCDNRna[parseInt(i-1)]) {
 				healthyACDNBnaDisplay = healthyCDNRna[i];
 				healthyLPY = i;
 			}
 		};
 		if (healthyACDNBnaDisplay < 0) {
 			healthyACDNBnaDisplay = '-$' + parseFloat(-1*healthyACDNBnaDisplay).toFixed(2);
 		} else {
 			healthyACDNBnaDisplay = '$' + parseFloat(healthyACDNBnaDisplay).toFixed(2);
 		}

 		var healthyBEAnaDisplay = -1;
 		for (var i in healthyCDNRna) {
 			if (healthyCDNRna[i+1] > 0) {
 				healthyBEAnaDisplay = i;
 				break;
 			};
 		};
 		if (healthyBEAnaDisplay == -1) {
 			healthyBEAnaDisplay  = 'Never breaks even';
 			healthyLPY = '-';
 		}

 		healthyACDNBna = [];
 		for (var i in healthyCDNRna) {
 			healthyACDNBna[i] = healthyCDNRna[i] - untreatedCDNR[i];
 		};

 		var untreatedLPY = 0;
		while (untreatedCDNR[untreatedLPY] < 0 && untreatedLPY < 25) {
 			untreatedLPY++;
 		}
 		if (untreatedLPY==25) {
 			untreatedLPY = 'Untreated vineyard never profitable';
 		} else {
	 		while (untreatedCDNR[untreatedLPY] > 0 && untreatedLPY < 25) {
	 			untreatedLPY++;
	 		}
	 	}

 		var the_table_html = '<hr /><h2>Results</h2><table><thead><th><h4>Scenario</h4></th><th><h4>ACDNB in last profitable year</h4></th><th><h4>Breakeven age</h4></th><th><h4>Last profitable year</h4></th><th><h4>Breakeven probability</h4></th></thead><tbody>';
		the_table_html += '<tr><td>' + scenarios['healthy'] + '</td><td>' + healthyACDNBnaDisplay + '</td><td>' + healthyBEAnaDisplay + '</td><td>' + healthyLPY + '</td><td>' + 0 + '</td></tr>';
		the_table_html += '<tr><td>' + scenarios['untreated'] + '</td><td>' + '-' + '</td><td>' + '-' + '</td><td>' + untreatedLPY + '</td><td>' + 1 + '</td></tr>';

 		for (var a=2; a<scenarioKeys.length; a++) {

 			var selectCol = scenarioKeys[a];

 			var age = parseInt(selectCol.substr(3));

 			var pcFtnOfT = [];
			for (var l=0; l<age; l++) {
				pcFtnOfT[l] = 0;
			};
			for (var l=age; l<26; l++) {
				pcFtnOfT[l] = pc;
			};

			var healthyNR = [];
			for (var i in healthyYields) {
				healthyNR[i] = price*healthyYields[i]-costs[i]-pcFtnOfT[i];
			};

			var healthyDNR = [];
			for (var i in healthyNR) {
				var compoundDiscount = Math.pow(discountFactor, i);
				healthyDNR[i] = healthyNR[i]*compoundDiscount;
			};

			var healthyCDNR = [ healthyDNR[0] ];
			for (var i=1; i<healthyDNR.length; i++) {
				healthyCDNR[i] = healthyDNR[i] + healthyCDNR[i-1];
			};

			treatedYields = [];
			for (var i in healthyYields) {
				treatedYields[i] = healthyYields[i]*data[i][selectCol]/100;
			};

			treatedNR = [];
			for (var i in treatedYields) {
				treatedNR[i] = price*treatedYields[i]-costs[i]-pcFtnOfT[i];
			};

			treatedDNR = [];
			for (var i in treatedNR) {
				var compoundDiscount = Math.pow(discountFactor, i);
				treatedDNR[i] = treatedNR[i]*compoundDiscount;
			};

			treatedCDNR = [ treatedDNR[0] ];
			for (var i=1; i<treatedDNR.length; i++) {
				treatedCDNR[i] = treatedDNR[i] + treatedCDNR[i-1];
			};

			ccthv = [ parseInt(pcFtnOfT[0]) ];
			for (var i=1; i<healthyDNR.length; i++) {
				ccthv[i] = parseInt(pcFtnOfT[i]) + parseInt(ccthv[i-1]);
			};

			var acdnb = [];
			for (var i in treatedCDNR) {
				acdnb[i] = treatedCDNR[i] - untreatedCDNR[i];
	 		};

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

	 		for (var i in treatedCDNR) {
	 			if (treatedCDNR[i] > untreatedCDNR[i]) {
	 				bea[selectCol] = i;
	 				break;
	 			};
	 		};
	 		if (bea[selectCol]==0 && treatedCDNR[0] <= untreatedCDNR[0]) {
	 			bea[selectCol] = 'Never breaks even';
	 		};

	 		lpy[selectCol] = selectCol.substr(3);
	 		while (treatedNR[parseInt(lpy[selectCol])+1] <= 0 && parseInt(lpy[selectCol])<25) {
	 			lpy[selectCol]++;
	 		}
	 		if (parseInt(lpy[selectCol])==25) {
	 			lpy[selectCol] = 'Treatment never profitable';
	 		} else {
		 		while (treatedNR[parseInt(lpy[selectCol])+1] > 0 && parseInt(lpy[selectCol])<25) {
		 			lpy[selectCol]++;
		 		}
		 	}

	 		bep[selectCol] = (healthyCDNRna[25] - healthyCDNR[25]) / ( (treatedCDNR[25] - healthyCDNR[25]) - (untreatedCDNR[25] - healthyCDNRna[25]) );
	 		if (bep[selectCol] > 1)
	 			bep[selectCol] = 1;
	 		bep[selectCol] = bep[selectCol].toFixed(3);

	 		var acdnbDisplay = (acdnb[parseInt(lpy[selectCol])] != null ) ? acdnb[parseFloat(lpy[selectCol])].toFixed(2) : '-';
	 		if (acdnbDisplay != '-' && acdnbDisplay < 0) {
 				acdnbDisplay = '-$' + parseFloat(-1*acdnbDisplay).toFixed(2);
 			} else if (acdnbDisplay != '-') {
 				acdnbDisplay = '$' + parseFloat(acdnbDisplay).toFixed(2);
 			}

			the_table_html += '<tr><td>' + scenarios[selectCol] + '</td><td>' + acdnbDisplay + '</td><td>' + bea[selectCol] + '</td><td>' + lpy[selectCol] + '</td><td>' + bep[selectCol] + '</td></tr>';

	 	};

		the_table_html += '</tbody></table>' + '<p class="print-link"><a href="javascript:window.print()"><i class="fa fa-print" aria-hidden="true"></i> Print these results.</a></p><p class="adjust-link"><a href="#form" onclick="$(\'body,html\').stop(true,true).animate({scrollTop: $(\'#form\').offset().top - $(\'header\').height()}, \'500\', \'swing\');">Adjust parameters</a></p>';

		$('.results').html(the_table_html);


	var years = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
	console.log(years);
	console.log(healthyYields);

	var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    width = 960 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;

	var formatDate = d3.time.format("%d-%b-%y");

	var x = d3.time.scale()
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	var line = d3.svg.line()
	    .x(years)
	    .y(healthyYields);

	console.log(line);

	var svg = d3.select(".results").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	  x.domain(d3.extent(years));
	  y.domain(d3.extent(healthyYields));

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
	      .datum(data)
	      .attr("class", "line")
	      .attr("d", line);
	});

	$('body,html').stop(true,true).animate({scrollTop: $('#results').offset().top - $('header').height()}, '500', 'swing');

}

function type(d) {
	  d.years = +d.years;
	  d.healthyYields = +d.healthyYields;
	  return d;
	}
