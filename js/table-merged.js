function the_table(inputObject) {
	var missingVals = [];

	d3.tsv("regional-assumptions.tsv", function(assumptions) {
		var regionIndex = regionSwitch(inputObject.regionAssumed, 'index');

		if (inputObject.price==='') {
			inputObject.price = assumptions[regionIndex]['price'];
			missingVals.push('price');
		}
		if (inputObject.discount==='') {
			inputObject.discount = '3';
			missingVals.push('discount');
		}
		if (inputObject.pc==='') {
			inputObject.pc = 0;
			missingVals.push('pc');
		}
		if (inputObject.cost0==='') {
			inputObject.cost0 = assumptions[regionIndex]['cost0'];
			missingVals.push('cost0');
		}
		if (inputObject.cost1==='') {
			inputObject.cost1 = assumptions[regionIndex]['cost1'];
			missingVals.push('cost1');
		}
		if (inputObject.cost2==='') {
			inputObject.cost2 = assumptions[regionIndex]['cost2'];
			missingVals.push('cost2');
		}
		if (inputObject.cost3==='') {
			inputObject.cost3 = assumptions[regionIndex]['cost3'];
			missingVals.push('cost3');
		}
		if (inputObject.yield0==='') {
			inputObject.yield0 = assumptions[regionIndex]['yield0'];
			missingVals.push('yield0');
		}
		if (inputObject.yield1==='') {
			inputObject.yield1 = assumptions[regionIndex]['yield1'];
			missingVals.push('yield1');
		}
		if (inputObject.yield2==='') {
			inputObject.yield2 = assumptions[regionIndex]['yield2'];
			missingVals.push('yield2');
		}
		if (inputObject.yield3==='') {
			inputObject.yield3 = assumptions[regionIndex]['yield3'];
			missingVals.push('yield3');
		}
		if (inputObject.yield4==='') {
			inputObject.yield4 = assumptions[regionIndex]['yield4'];
			missingVals.push('yield4');
		}
		if (inputObject.yield5==='') {
			inputObject.yield5 = assumptions[regionIndex]['yield5'];
			missingVals.push('yield5');
		}

		d3.tsv("yield-rates.tsv", function(yieldRates) {
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
				discountFactor = 1/(1+inputObject.discount/100),
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
					'healthy' : 'Healthy<br /><em>Hypothetical scenario, as all California vineyards are highly susceptible to infection.</em>',
					'untreated' : 'Expected effects of typical infection',
					'25y3' : 'Adopted year 3',
					'25y5' : 'Adopted year 5',
					'25y10' : 'Adopted year 10',
					'50y3' : 'Adopted year 3',
					'50y5' : 'Adopted year 5',
					'50y10' : 'Adopted year 10',
					'75y3' : 'Adopted year 3',
					'75y5' : 'Adopted year 5',
					'75y10' : 'Adopted year 10'
				},
				scenarioKeys = Object.keys(scenarios);

			scenarioYieldObject.healthy = [];
			scenarioYieldObject.untreated = [];
			scenarioCDNRObject.healthy = [];
			scenarioCDNRObject.untreated = [];

			var healthyYields = [
					parseInt(inputObject.yield0),
					parseInt(inputObject.yield1),
					parseInt(inputObject.yield2),
					parseInt(inputObject.yield3),
					parseInt(inputObject.yield4),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5),
					parseInt(inputObject.yield5)		
				],
				untreatedYields = [];

			for (var i in healthyYields) {
				untreatedYields[i] = healthyYields[i]*yieldRates[i].noAction/100;
				scenarioYieldObject.healthy[i] = {"x": i, "y": healthyYields[i]};
				scenarioYieldObject.untreated[i] = {"x": i, "y": untreatedYields[i]};
			}

			costs = [
				inputObject.cost0,
				inputObject.cost1,
				inputObject.cost2,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3,
				inputObject.cost3			
			];

			var untreatedNR = [];
			for (i in untreatedYields) {
				untreatedNR[i] = inputObject.price*untreatedYields[i]-costs[i];
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
			

	 		var healthyCDNRna = [ inputObject.price*healthyYields[0] - costs[0] ];
	 		var healthyLPY = '-';
	 		for (i=1; i<healthyYields.length; i++) {
	 			compoundDiscount = Math.pow(discountFactor, i);
	 			healthyCDNRna[i] = (inputObject.price*healthyYields[i] - costs[i])*compoundDiscount + healthyCDNRna[parseInt(i-1)];
	 			if (healthyCDNRna[i] > healthyCDNRna[parseInt(i-1)]) {
	 				healthyLPY = i;
	 			}
	 		}
	 		var healthyACDNBnaDisplay = currencyFormat(parseFloat(healthyCDNRna[25] - untreatedCDNR[25]).toFixed(2));
	 		/*if (healthyACDNBnaDisplay < 0) {
	 			healthyACDNBnaDisplay = '-$' + parseFloat(-1*healthyACDNBnaDisplay).toFixed(2);
	 		} else {
	 			healthyACDNBnaDisplay = '$' + parseFloat(healthyACDNBnaDisplay).toFixed(2);
	 		}*/

	 		var healthyBEAnaDisplay = '-';

	 		/*var healthyBEAnaDisplay = -1;
	 		for (i in healthyCDNRna) {
	 			if (healthyCDNRna[i+1] > 0) {
	 				healthyBEAnaDisplay = i;
	 				break;
	 			}
	 		}
	 		if (healthyBEAnaDisplay === -1) {
	 			healthyBEAnaDisplay  = 'Never breaks even';
	 			healthyLPY = '-';
	 		}*/

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
	 			var regionName = regionSwitch(inputObject.regionAssumed, 'friendly');
	 			if (regionName === 'Custom')
	 				regionName = 'Northern San Joaquin';
	 			missingValsAlert = '<p class="alert">No values specified for: ';
	 			for (i=0; i<missingVals.length; i++) {	 				
	 				missingValsAlert += valueSwitch(missingVals[i]);
	 				if (i!==missingVals.length-1) {
	 					missingValsAlert += ', ';
	 				} else if (i===missingVals.length-1) {
	 					missingValsAlert += '.';
	 				}
	 			}
	 			var missingValsAlertTag = ($.inArray('pc', missingVals) >= 0) ? ' with a preventative practice cost of zero, as with delayed pruning' : '';
	 			missingValsAlertTag += '.</p><p class="alert hide-on-print">[Switch to the previous tab or <a href="#" class="close-tab">close this tab</a> to update these parameters and re-run your calculations.]</p>'
	 			missingValsAlert += '</p><p class="alert">Calculations below have been performed using default values for the <strong>' + regionName + '</strong> region' + missingValsAlertTag;
	 		}
	 		var the_table_html = '<h2>Results</h2>' + missingValsAlert + '<section class="figure-area"></section><section class="output-wrap"><h3>Output table</h3><p class="landscape-alert" style="font-style: italic;">On mobile devices, we recommend viewing your results in landscape mode.</p><div class="output-table"><div class="output-thead"><div class="output-th">Scenario</div><div class="output-th">ACDNB</div><div class="output-th">Age adoption pays off</div><div class="output-th">Last profitable year</div><div class="output-th">Infection probability threshold</div></div><tbody>';
			the_table_html += '<div class="output-tr"><div class="untreated scenarioGroupShadow">&nbsp;</div><div class="untreated scenarioGroup">Untreated vineyard</div></div>';
			the_table_html += '<div class="output-tr"><div class="output-td">' + scenarios.healthy + '</div><div class="output-td">' + healthyACDNBnaDisplay + '</div><div class="output-td">' + healthyBEAnaDisplay + '</div><div class="output-td">' + healthyLPY + '</div><div class="output-td">' + 0 + '</div></div>';
			the_table_html += '<div class="output-tr"><div class="output-td">' + scenarios.untreated + '</div><div class="output-td">' + '-' + '</div><div class="output-td">' + '-' + '</div><div class="output-td">' + untreatedLPY + '</div><div class="output-td">' + 1 + '</div></div>';

	 		for (var a=2; a<scenarioKeys.length; a++) {

	 			if (a===2 || a===5 || a===8) {
	 				the_table_html += '<div class="output-tr"><div class="scenarioGroupShadow dce' + scenarioKeys[a].substr(0,2) + '">&nbsp;</div><div class="scenarioGroup dce' + scenarioKeys[a].substr(0,2) + '">Preventative management with ' + scenarioKeys[a].substr(0,2) + '% DCE</div></div>';
	 			}

	 			var selectCol = scenarioKeys[a];

	 			var age = parseInt(selectCol.substr(3));

	 			var pcFtnOfT = [];
				for (var l=0; l<age; l++) {
					pcFtnOfT[l] = 0;
				}
				for (l=age; l<26; l++) {
					pcFtnOfT[l] = inputObject.pc;
				}

				var healthyNR = [];
				for (i in healthyYields) {
					healthyNR[i] = inputObject.price*healthyYields[i]-costs[i]-pcFtnOfT[i];
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
					treatedYields[i] = healthyYields[i]*yieldRates[i][selectCol]/100;
				}

				var thisKey = scenarioKeys[a];
				scenarioYieldObject[thisKey] = [];
				for (i in healthyYields) {
					scenarioYieldObject[thisKey][i] = {"x" : i, "y" : treatedYields[i]};
				}

				treatedNR = [];
				for (i in treatedYields) {
					treatedNR[i] = inputObject.price*treatedYields[i]-costs[i]-pcFtnOfT[i];
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
		 		if (acdnbDisplay !== '-') {
		 			acdnbDisplay = currencyFormat(acdnbDisplay);
		 		}

		 			/*&& acdnbDisplay < 0) {
	 				acdnbDisplay = '-$' + parseFloat(-1*acdnbDisplay).toFixed(2);
	 			} else if (acdnbDisplay !== '-') {
	 				acdnbDisplay = '$' + parseFloat(acdnbDisplay).toFixed(2);
	 			}*/

				the_table_html += '<div class="output-tr"><div class="output-td">' + scenarios[selectCol] + '</div><div class="output-td">' + acdnbDisplay + '</div><div class="output-td">' + bea[selectCol] + '</div><div class="output-td">' + lpy[selectCol] + '</div><div class="output-td">' + bep[selectCol] + '</div></div>';

		 	}

		 	/***** Generate assumptions table
				------------------------------------ */

				var assumptionsHeaders = ['Price per ton', 'Discount rate', 'Additional annual cost per acre of preventative practice', 'Year 0: Establishing vineyard', 'Year 1: Establishing vineyard', 'Year 2: Establishing vineyard', 'Year 3+: Established vineyard', 'Year 0', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5+'];
	            var assumptionsContent = [inputObject.price, inputObject.discount + '%', inputObject.pc, inputObject.cost0, inputObject.cost1, inputObject.cost2, inputObject.cost3, inputObject.yield0, inputObject.yield1, inputObject.yield2, inputObject.yield3, inputObject.yield4, inputObject.yield5];
	            var assumptionstable = '<section class="assumptions-wrap"><h3>Parameter Values Used in Calculations</h3>';
	            if (inputObject.regionBasis !== 'custom') {
	            	assumptionstable += '<p class="parameterSetDescription">All parameters are set to ' + regionSwitch(inputObject.regionBasis, 'friendly') + ' regional default values in the present set of calculations.';
	            } else if (missingVals.length === 0) {
	            	assumptionstable += '<p class="parameterSetDescription">These values describe a custom scenario designed by the user of this tool.</p>';
	            } else {
	            	assumptionstable += '<p class="parameterSetDescription">These values describe a custom scenario, designed by the user of this tool, except where ' + regionSwitch(inputObject.regionAssumed, 'friendly') + ' regional defaults have been incorporated for unspecified values: ';
	            	for(i=0; i<missingVals.length; i++) {
	            		assumptionstable += valueSwitch(missingVals[i]);
	            		if (missingVals.length>2 && i!==missingVals.length-1) {
		 					assumptionstable += ', ';
		 				}
		 				if (i===missingVals.length-2) {
		 					assumptionstable += ' and ';
		 				}
		 				if (i===missingVals.length-1) {
		 					assumptionstable += '.</p>'
		 				}
	            	}
	            	if (missingVals.indexOf('pc')!==-1) {
	            		assumptionstable += '<p class="parameterSetDescription">The default preventative practice cost is zero, as with delayed pruning.</p>';
	            	}
				}
	            assumptionstable += '<div class="assumptions-table">';
	            for (var i=0; i<assumptionsHeaders.length; i++) {
	            		var friendlyAssumptionsContent = (i===0 || i===2 || i===3 || i===4 || i===5 || i===6) ? currencyFormat(assumptionsContent[i]) : assumptionsContent[i];
	            		if (i===3) {
	            			assumptionstable += '<div class="assumptions-tr"><div class="variableGroupShadow">&nbsp;</div><div class="variableGroup">Annual cultural cost per acre</div></div>';
	            		}
	            		if (i===7) {
	            			assumptionstable += '<div class="assumptions-tr"><div class="variableGroupShadow">&nbsp;</div><div class="variableGroup">Annual yield per acre in tons</div></div>';
	            		}
	                    assumptionstable += '<div class="assumptions-tr"><div class="assumptions-td">' + assumptionsHeaders[i] + '</div><div class="assumptions-td">' + friendlyAssumptionsContent + '</div></div>';
	            };
	            assumptionstable += '</div></section>';

			/***** Add variable definitions section
			---------------------------------------- */
			var varDefs = '<p class="glossary-link hide-on-print"><a href="variable-definitions.html">Variable definitions</a></p><section class="varDefs-printable"><h3 id="variabledefinitions">Variable definitions</h3><p><strong>Cumulative discounted net returns:</strong> The cumulative net returns (returns &minus; costs) per acre over 25 years for a healthy vineyard, an untreated infected vineyard, and infected vineyards where action is taken. Current and future dollar amounts are in 2013 dollars and are discounted to 2013 using a 3% discount rate. </p><p><a id="tablevars"></a></p><p><strong>Additional cumulative discounted net benefits (ACDNB):</strong> The difference in cumulative net returns (returns - costs) per acre over 25 years between an infected vineyard where action is taken and an untreated infected vineyard. Current and future dollar amounts are in 2013 dollars and are discounted to 2013 using a 3% discount rate. </p><p><strong>Last profitable year:</strong> The last year an infected vineyard generates positive annual net returns (returns - costs). This year is the same for discounted and nominal net returns. </p><p><strong>Age adoption pays off:</strong> The age when cumulative discounted net returns (returns – costs) for a treated infected vineyard exceed those from an untreated infected vineyard. </p><p><strong>Infection probability threshold:</strong> The probability of infection where expected cumulative discounted net returns from treating a vineyard equals the expected cumulative discounted net returns from not treating a vineyard. If you perceive a probability of infection less than this probability, then not treating the vineyard generates greater cumulative discounted net returns than a treated vineyard, and vice versa. </p></section>';

			the_table_html += '</tbody></div></section>' + assumptionstable + varDefs + '<p class="print-link"><a href="javascript:window.print()"><i class="fa fa-print" aria-hidden="true"></i> Print these results.</a></p><p class="hide-on-print"><a href="#" class="close-tab">Close results tab</a></p>';

			$('.results').html(the_table_html);

			var whichYears = [];

			if (inputObject.year3)
				whichYears.push('year3');
			if (inputObject.year5)
				whichYears.push('year5');
			if (inputObject.year10)
				whichYears.push('year10');

			var moreParameters = {
				'pc' : inputObject.pc,
				'friendlyRegion' : regionSwitch(inputObject.regionBasis, 'friendly')
			}

			var storage = $.localStorage,
				theFigureParameters = [whichYears, moreParameters, inputObject.figuredisplay, scenarioYieldObject, scenarioCDNRObject];
			storage.set('the-figure-parameters', theFigureParameters);
			console.log('about to call');
			the_figure(theFigureParameters[0], theFigureParameters[1], theFigureParameters[2], theFigureParameters[3], theFigureParameters[4]);

			$('body,html').stop(true,true).animate({scrollTop: $('#results').offset().top - $('header').height()}, '500', 'swing');

			activateCloseTabLinks();
			styleGlossaryLinks();

		});

	});

}