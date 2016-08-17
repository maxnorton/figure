function activateScrollToLinks() {
	$('[class^=scroll-to-]').each(function() {
		$(this).click(function() {
			$('body,html').stop(true,true).animate({scrollTop: $( 'input[name=' + $(this).attr('class').substr(10) + ']' ).offset().top - $('header').height()}, '500', 'swing');
			$( 'input[name=' + $(this).attr('class').substr(10) + ']' ).focus();
		});
	});
}

function activateCloseTabLinks() {
	$('.close-tab').each(function() {
		$(this).click(function() {
			if(confirm("Close tab? You will return to the parameter settings page. Alternatively, to preserve your results and re-run the model with a different set of parameters, click Cancel, switch to the parameter settings tab, update your inputs, and re-submit the form. Your updated results will open in a new tab."))
				close();
		})
	})
}

function addThousandsComma(d) {
	return d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function checkHash() {
	var theHash = (window.location.hash) ? window.location.hash : false;
	if (theHash) {
		$('body,html').stop(true,true).animate({scrollTop: $(theHash).offset().top}, '1000', 'swing');
	}
}

function currencyFormat(d) {
	var currencyVal;
	if (d>0) 
		currencyVal = '$' + addThousandsComma(d);
	else if (d<0)
		currencyVal = '-$' + addThousandsComma(parseInt(-1*d));
	else if (d==0)
		currencyVal = '0';
	return currencyVal;
}

function focusCustomParameters() {
	$('.param-row').each(function() {
		$(this).click(function() {
			$(this).find('input').focus();
		});
	});
	$('.param-row input').each(function() {
		$(this).focus(function() {
			$(this).select();
			$(this).parents('.param-row').addClass('focused');
		});
		$(this).focusout(function() {
			$(this).val($(this).val().replace(/[^0-9.]/g,''));
			$(this).parents('.param-row').removeClass('focused');
		});
	});
}

function goBack(e) {
    if(e){
        if(e.preventDefault) {
            e.preventDefault();
        }
        if(e.preventPropagation) {
            e.preventPropagation();
        }
    }
    return false; // stop event propagation and browser default event
	console.log('trying to go back');
    var defaultLocation = "http://maxnorton.github.io/figure";
    var oldHash = window.location.hash;

    history.back(); // Try to go back

    var newHash = window.location.hash;

    if(
        newHash === oldHash &&
        (typeof(document.referrer) !== "string" || document.referrer  === "")
    ){
        window.setTimeout(function(){
            // redirect to default location
            window.location.href = defaultLocation;
        },1000); // set timeout in ms
    }
}

function hideSpecialLinks() {
	$('.glossary-icon').add('.glossary-link').add('.swipebox').each(function() {
		$(this).empty();
	})
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

function openFrame(e, link) {
	if(e){
        if(e.preventDefault) {
            e.preventDefault();
        }
        if(e.preventPropagation) {
            e.preventPropagation();
        }
    }
    if ( $('iframe').size() !== 0 && $('iframe').attr('src') === link.attr('href') ) {
		$('.content-wrap').animate({opacity: 1}, '200');
		$('iframe').fadeToggle('200').delay('200', document.getElementById('iframe0').remove());
		$('#closingX').remove();
		$('.flyout-wrap').css('width', '0');
	} else {
		if ( $('iframe').size() !== 0 ) {
			$('iframe').fadeToggle('200').delay('200', document.getElementById('iframe0').remove());
			$('#closingX').remove();
		}
		$('body, html').stop(true,true);
		var frame = '<iframe id="iframe0" src="' + link.attr('href') + '"></iframe>';
		$('.flyout-wrap').prepend(frame);
		$('.flyout-wrap').css('width', '850px');
		$('iframe').fadeToggle('200');
		$('.content-wrap').animate({opacity: 0}, '200');
		$('iframe').height(parseInt(window.innerHeight - 300));
		link.append('<span id="closingX">&nbsp;&nbsp;&nbsp;&times;</span>');
	}
}

function scrollToHash() {
	if (window.location.hash) {
		var hash = window.location.hash;
		$('body,html').stop(true,true).animate({scrollTop: $(hash).offset().top - $('header').height()}, '500', 'swing');
	}
}

function styleGlossaryLinks() {
	$('.glossary-icon').each(function() {
		$(this).empty();
	})
	$('.glossary-link').prepend('<span class="glossary-icon"><i class="fa fa-question-circle"></i></span>');
	$('.glossary-link-family').prepend('<span class="glossary-icon"><i class="fa fa-question-circle"></i></span>');
	$('.glossary-link-inline-child').click( function(event) {
		event.preventDefault();
		$(this).stop().find('.glossary-inline').toggle('fast');
	});
	$('.glossary-link-inline-sibling').click( function(event) {
		event.preventDefault();
		$(this).stop().parents('.glossary-link-family').find('.glossary-inline').toggle('fast');
	});
}

function toggleFormOptions() {

		/***** Toggle practice options when choosing CDNR and yield for figure
		------------------------------------ */

		// first check status on page load, in case returning from another page and already set to yield
		if ( $('input[name=figuredisplay]:checked').val()==='yield' ) {
				$('.disable-on-yield-alert').slideDown('fast');
				$('input[name=pc]').add('input[name^=cost]').add('input[name=price]').add('input[name=discount]').each(function() {
				$(this).prop('disabled', true);
				$(this).parents('tr').css('background-color','#ffffff');
			});
			$('.disable-on-yield').add('.disable-on-yield a').add('.disable-on-yield i').add('label[for=pc]').add('input[name=pc]').add('label[for^=cost]').add('input[name^=cost]').add('label[for=price]').add('input[name=price]').add('label[for=discount]').add('input[name=discount]').add('.subselect.discount a').add('.subselect.pc a').add('.subselect.pc .glossary-inline').add('.subselect.pc .glossary-link-family').add('.subselect.discount i').add('.subselect.pc i').add('.subselect.discount .param-deadcell').add('.subselect.pc .param-deadcell').css('color', '#999999');
			$('.subselect.pc select').prop('disabled', true);
		} 

		$('input[name=figuredisplay]').change(function() {
			if ( $('input[name=figuredisplay]:checked').val()==='yield' ) {
				$('.disable-on-yield-alert').slideDown('fast');
				$('input[name=pc]').add('input[name^=cost]').add('input[name=price]').add('input[name=discount]').each(function() {
					$(this).prop('disabled', true);
					$(this).parents('tr').css('background-color','#ffffff');
				});
				$('.disable-on-yield').add('.disable-on-yield a').add('.disable-on-yield i').add('label[for=pc]').add('input[name=pc]').add('label[for^=cost]').add('input[name^=cost]').add('label[for=price]').add('input[name=price]').add('label[for=discount]').add('input[name=discount]').add('.subselect.discount a').add('.subselect.pc a').add('.subselect.pc .glossary-inline').add('.subselect.pc .glossary-link-family').add('.subselect.discount i').add('.subselect.pc i').add('.subselect.discount .param-deadcell').add('.subselect.pc .param-deadcell').css('color', '#999999');
				$('.subselect.pc select').prop('disabled', true);
			} else {
				$('.disable-on-yield-alert').slideUp('fast');
				$('input[name=pc]').add('input[name^=cost]').add('input[name=price]').add('input[name=discount]').each(function() {
					$(this).prop('disabled', false);
					$(this).parents('tr').css('background-color','auto');
				});
				$('.disable-on-yield').add('.disable-on-yield a').add('.disable-on-yield i').add('label[for=pc]').add('input[name=pc]').add('label[for^=cost]').add('input[name^=cost]').add('label[for=price]').add('input[name=price]').add('label[for=discount]').add('input[name=discount]').add('.subselect.discount a').add('.subselect.pc a').add('.subselect.pc .glossary-inline').add('.subselect.pc .glossary-link-family').add('.subselect.discount i').add('.subselect.pc i').add('.subselect.discount .param-deadcell').add('.subselect.pc .param-deadcell').css('color', '');
				$('.subselect.pc select').prop('disabled', false);
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
		var regionKey = 'custom';
		for (var regionIndex = 0; regionIndex<5; regionIndex++) {
			if (discount==data[regionIndex]['discount'] && cost0==data[regionIndex]['cost0'] && cost1==data[regionIndex]['cost1'] && cost2==data[regionIndex]['cost2'] && cost3==data[regionIndex]['cost3'] && (pc==data[regionIndex]['pchp'] || pc==data[regionIndex]['pcdbp'] || pc==0 ) && price==data[regionIndex]['price'] && yield0==data[regionIndex]['yield0'] && yield1==data[regionIndex]['yield1'] && yield2==data[regionIndex]['yield2'] && yield3==data[regionIndex]['yield3'] && yield4==data[regionIndex]['yield4'] && yield5==data[regionIndex]['yield5']) {
				regionKey = data[regionIndex]['region'];
			}
		}
		setRegionDisplay(regionKey);
	});
} 

function valueSwitch(value) {
	var valueFriendly;
	switch (value) {
		case 'price':
			valueFriendly =  'price per ton';
			break;
		case 'discount':
			valueFriendly =  'discount rate';
			break;
		case 'pc':
			valueFriendly =  'preventative practice cost';
			break;
		case 'cost0':
			valueFriendly =  'year 0 cultural cost';
			break;
		case 'cost1':
			valueFriendly =  'year 1 cultural cost';
			break;
		case 'cost2':
			valueFriendly =  'year 2 cultural cost';
			break;
		case 'cost3':
			valueFriendly =  'year 3 cultural cost';
			break;
		case 'yield0':
			valueFriendly =  'year 0 yield';
			break;
		case 'yield1':
			valueFriendly =  'year 1 yield';
			break;
		case 'yield2':
			valueFriendly =  'year 2 yield';
			break;
		case 'yield3':
			valueFriendly =  'year 3 yield';
			break;
		case 'yield4':
			valueFriendly =  'year 4 yield';
			break;
		case 'yield5':
			valueFriendly =  'year 5+ yield';
			break;
	}
	return valueFriendly;
}

function regionSwitch(region, returnType) {
	var regionIndex,
		regionFriendly;

	switch (region) {
		case 'napa':
				regionFriendly = 'Napa';
				regionIndex = 0;
				break;
		case 'nsj':
			regionFriendly = 'Northern San Joaquin';
			regionIndex = 1;
			break;
		case 'cc':
			regionFriendly = 'Central Coast';
			regionIndex = 2;
			break;
		case 'lake':
			regionFriendly = 'Lake';
			regionIndex = 3;
			break;
		case 'sonoma':
			regionFriendly = 'Sonoma';
			regionIndex = 4;
			break;
		case 'custom':
			regionFriendly = 'Custom';
			regionIndex = 1;
			break;
	}

	if (returnType==='friendly') {
		return regionFriendly;
	} else if (returnType==='index') {
		return regionIndex;
	}
}

function setRegionDisplay(regionKey) {
	var regionLabel = (regionKey==='custom') ? 'custom values.' : '<span class="regionName">' + regionSwitch(regionKey, 'friendly') + '</span> default values.';
	$('.currentRegion').html(regionLabel + '<input type="hidden" id="region-basis" name="region-basis" value="' + regionKey + '">');
}

function setRegionalDefaults(region) {
	d3.tsv("regional-assumptions.tsv", function(data) {
		var defaultPractice = $('select[name=practice]').val(),
			regionIndex = regionSwitch(region, 'index');
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

		setRegionDisplay(region);

	});
}

function zoomDisable(){
  $('head meta[name=viewport]').remove();
  $('head').prepend('<meta name="viewport" content="user-scalable=0" />');
}
function zoomEnable(){
  $('head meta[name=viewport]').remove();
  $('head').prepend('<meta name="viewport" content="user-scalable=1" />');
}