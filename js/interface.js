function focusCustomParameters() {
	$('table.form tr').each(function() {
		$(this).click(function() {
			$(this).find('input').focus();
		});
	});
	$('table.form input').each(function() {
		$(this).focus(function() {
			$(this).select();
			$(this).parents('tr').addClass('focused');
		});
		$(this).focusout(function() {
			$(this).parents('tr').removeClass('focused');
		});
	});
}

function getGenstates() {
	var genstates = { 
		'figurestate' : document.getElementById('figuregen').checked,
		'tablestate' : document.getElementById('tablegen').checked
	};
	return genstates;
}

function mobileSubstitutions() {
	if ($(window).width() < 1023) {
		$('.efficacy-info .table-style').html('<a href="img/efficacy-table01.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table');
		$('.variable-definitions table:nth-of-type(3)').html('<a href="img/variable-table03.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css('border', '0 none');
		$('.hide-for-tablets').css('display', 'none').removeClass('swipebox');
	}
	if ($(window).width() < 768) {
		$('.variable-definitions table:nth-of-type(1)').html('<a href="img/variable-table01.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css('border', '0 none');
		$('.variable-definitions table:nth-of-type(2)').html('<a href="img/variable-table02.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css('border', '0 none');
		$('.custom-instructions table:nth-of-type(1)').html('<a href="img/custom-instructions-table01.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css('border', '0 none');
 		$('.custom-instructions table:nth-of-type(2)').html('<a href="img/custom-instructions-table02.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css('border', '0 none');
		$('.hide-for-phones').css('display', 'none').removeClass('swipebox');
	}
}

function scrollToHash() {
	if (window.location.hash) {
		var hash = window.location.hash;
		$('body,html').stop(true,true).animate({scrollTop: $(hash).offset().top - $('header').height()}, '500', 'swing');
	}
}

function styleGlossaryLinks() {
	$('.glossary-link').add('.glossary-link-inline-child').prepend('<i class="fa fa-question-circle"></i>');
	$('.glossary-link-inline-child').click( function(event) {
		event.preventDefault();
		$(this).stop().children('.glossary-inline').toggle('fast');
	});
}

function styleHoverInfo() {
	$('.hover-info td').prepend('<i class="fa fa-question-circle"></i>');
	$('.hover-info').hover( 
		function(event) {
			$(this).stop().find('.info').fadeToggle('fast');
		}, function(event) {
			$(this).stop().find('.info').fadeToggle('fast');
		}
	);
}

function toggleFormOptions() {
	/***** Toggle input options when gentable, genfigure are switched on/off
		------------------------------------ */

		var genstates = getGenstates();

		$('input[name=figuregen]').change(function() {
			genstates['figurestate'] = $(this).prop('checked');
			$('fieldset.figure').each(function() {
				$(this).prop('disabled', !genstates['figurestate']);
				var textColor = (genstates['figurestate']) ? '' : '#999999';
				$(this).add($(this).find('a')).add($(this).find('i')).add($(this).find('.glossary-inline')).add($(this).find('label[for=efficacyOrYearfig]')).add('.' + efficacyOrYearchoice + '-wrap').css('color', textColor);
			});
		});
		$('input[name=tablegen]').change(function() {
			genstates['tablestate'] = $(this).prop('checked');
			$('fieldset.table').each(function() {
				$(this).prop('disabled', !genstates['tablestate']);
				var textColor = (genstates['tablestate']) ? '' : '#999999';
				$(this).add($(this).find('a')).add($(this).find('i')).add($(this).find('.glossary-inline')).css('color', textColor);
			});
		});

		/***** Toggle input options when choosing between efficacy and year vars for figure
		------------------------------------ */

		var efficacyOrYearchoice = '';
		$('input[name=efficacyOrYearfig]').change(function() {
			efficacyOrYearchoice = $(this).val() + 'fig';
			var efficacyOrYeardisabledvar;
			switch (efficacyOrYearchoice) {
				case 'efficacyfig':
					efficacyOrYeardisabledvar = 'yearfig';
					break;
				default:
					efficacyOrYeardisabledvar = 'efficacyfig';
			}
			$('.' + efficacyOrYearchoice + '-wrap').add('.' + efficacyOrYearchoice + '-wrap a').add('.' + efficacyOrYearchoice + '-wrap i').css('color', '');
			$('.' + efficacyOrYeardisabledvar + '-wrap').add('.' + efficacyOrYeardisabledvar + '-wrap a').add('.' + efficacyOrYeardisabledvar + '-wrap i').css('color', '#999999');
			$('input[name=' + efficacyOrYearchoice + ']').each(function() {
				$(this).prop('disabled', false);
			});
			$('input[name=' + efficacyOrYeardisabledvar + ']').each(function() {
				$(this).prop('disabled', true);
			});
		});
		var efficacyOrYearselected = new Boolean(false);
		$('input[name=efficacyfig]').one('change', function() {
			if (efficacyOrYearselected==false) {
				efficacyOrYearselected = true;
				$('input[name=efficacyOrYearfig][value=efficacy]').attr('checked', true).change();
			};
		});
		$('input[name=yearfig]').one('change', function() {
			if (efficacyOrYearselected==false) {
				efficacyOrYearselected = true;
				$('input[name=efficacyOrYearfig][value=year]').attr('checked', true).change();
			}
		});	
}

function setPracticeCost(region, practice) {
	d3.tsv("regional-assumptions.tsv", function(data) {
		if (practice==='dp') {
			$('input[name=pc]').val('0');
		} else if (practice==='hp' || practice==='dbp') {
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
			} 
			$('input[name=pc]').val(data[regionIndex]['pc' + practice]);
		}
	});
}

function setPracticeSelect(region, pc) {
	if (pc==0) {
		$('select[name=practice]').val('dp');
	} else {
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
			} 
			if (pc==data[regionIndex]['pchp']) {
				$('select[name=practice]').val('hp');
			} else if (pc==data[regionIndex]['pcdbp']) {
				$('select[name=practice]').val('dbp');
			} else {
				$('select[name=practice]').val('custom');
			}
		});
	}
}

function checkRegionDisplay(region, discount, cost0, cost1, cost2, cost3, pc, price, yield0, yield1, yield2, yield3, yield4, yield5) {
	d3.tsv("regional-assumptions.tsv", function(data) {
		var regionKey = -1;
		for (var regionIndex = 0; regionIndex<5; regionIndex++) {
			if (discount==data[regionIndex]['discount'] && cost0==data[regionIndex]['cost0'] && cost1==data[regionIndex]['cost1'] && cost2==data[regionIndex]['cost2'] && cost3==data[regionIndex]['cost3'] && (pc==data[regionIndex]['pchp'] || pc==data[regionIndex]['pcdbp'] || pc==0 ) && price==data[regionIndex]['price'] && yield0==data[regionIndex]['yield0'] && yield1==data[regionIndex]['yield1'] && yield2==data[regionIndex]['yield2'] && yield3==data[regionIndex]['yield3'] && yield4==data[regionIndex]['yield4'] && yield5==data[regionIndex]['yield5']) {
				regionKey = regionIndex;
			}
		}
		var regionLabel;
		setRegionDisplay(regionKey);
	});
} 

function setRegionDisplay(regionKey) {
	var regionLabel;
	switch (regionKey) {
		case -1:
			regionLabel = 'custom values.';
			break;
		case 0:
			regionLabel = '<span class="regionName">Napa</span> default values.';
			break;
		case 1:
			regionLabel = '<span class="regionName">Northern San Joaquin</span> default values.';
			break;
		case 2:
			regionLabel = '<span class="regionName">Central Coast</span> default values.';
			break;
		case 3:
			regionLabel = '<span class="regionName">Lake</span> default values.';
			break;
		case 4:
			regionLabel = '<span class="regionName">Sonoma</span> default values.';
			break;
	}
	$('.currentRegion').html(regionLabel);
}

function setRegionalDefaults(region) {
	d3.tsv("regional-assumptions.tsv", function(data) {
		var regionIndex;
		var defaultPractice = $('select[name=practice]').val();
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
		}
		$('input[name=price]').val(data[regionIndex]['price']);
		$('input[name=discount]').val(data[regionIndex]['discount']);
		$('input[name=cost0]').val(data[regionIndex]['cost0']);
		$('input[name=cost1]').val(data[regionIndex]['cost1']);
		$('input[name=cost2]').val(data[regionIndex]['cost2']);
		$('input[name=cost3]').val(data[regionIndex]['cost3']);
		$('input[name=yield0]').val(data[regionIndex]['yield0']);
		$('input[name=yield1]').val(data[regionIndex]['yield1']);
		$('input[name=yield2]').val(data[regionIndex]['yield2']);
		$('input[name=yield3]').val(data[regionIndex]['yield3']);
		$('input[name=yield4]').val(data[regionIndex]['yield4']);
		$('input[name=yield5]').val(data[regionIndex]['yield5']);

		if (defaultPractice === 'hp' || defaultPractice === 'dbp') {
			$('input[name=pc]').val(data[regionIndex]['pc' + defaultPractice]);
		}

		setRegionDisplay(regionIndex);

	});
}