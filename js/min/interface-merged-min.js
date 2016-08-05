function activateScrollToLinks(){$("[class^=scroll-to-]").each(function(){$(this).click(function(){$("body,html").stop(!0,!0).animate({scrollTop:$("input[name="+$(this).attr("class").substr(10)+"]").offset().top-$("header").height()},"500","swing"),$("input[name="+$(this).attr("class").substr(10)+"]").focus()})})}function activateCloseTabLinks(){$(".close-tab").each(function(){$(this).click(function(){confirm("Close tab? You will return to the paramter settings page. Alternatively, to preserve your results and re-run the model with a different set of parameters, click Cancel, switch to the parameter settings tab, update your inputs, and re-submit the form. Your updated results will open in a new tab.")&&close()})})}function focusCustomParameters(){$("table.form tr").each(function(){$(this).click(function(){$(this).find("input").focus()})}),$("table.form input").each(function(){$(this).focus(function(){$(this).select(),$(this).parents("tr").addClass("focused")}),$(this).focusout(function(){$(this).val($(this).val().replace(/[^0-9.]/g,"")),$(this).parents("tr").removeClass("focused")})})}function goBack(e){console.log("trying to go back");var a="http://maxnorton.github.io/figure",t=window.location.hash;history.back();var s=window.location.hash;return s!==t||"string"==typeof document.referrer&&""!==document.referrer||window.setTimeout(function(){window.location.href=a},1e3),e&&(e.preventDefault&&e.preventDefault(),e.preventPropagation&&e.preventPropagation()),!1}function mobileSubstitutions(){$(window).width()<1023&&($(".efficacy-info .table-style").html('<a href="img/efficacy-table01.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table'),$(".variable-definitions table:nth-of-type(3)").html('<a href="img/variable-table03.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css("border","0 none"),$(".hide-for-tablets").css("display","none").removeClass("swipebox")),$(window).width()<768&&($(".variable-definitions table:nth-of-type(1)").html('<a href="img/variable-table01.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css("border","0 none"),$(".variable-definitions table:nth-of-type(2)").html('<a href="img/variable-table02.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css("border","0 none"),$(".custom-instructions table:nth-of-type(1)").html('<a href="img/custom-instructions-table01.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css("border","0 none"),$(".custom-instructions table:nth-of-type(2)").html('<a href="img/custom-instructions-table02.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css("border","0 none"),$(".hide-for-phones").css("display","none").removeClass("swipebox"))}function scrollToHash(){if(window.location.hash){var e=window.location.hash;$("body,html").stop(!0,!0).animate({scrollTop:$(e).offset().top-$("header").height()},"500","swing")}}function styleGlossaryLinks(){$(".glossary-link").prepend('<i class="fa fa-question-circle"></i>'),$(".glossary-link-inline-child").click(function(e){e.preventDefault(),$(this).stop().find(".glossary-inline").toggle("fast")})}function toggleFormOptions(){"yield"===$("input[name=figuredisplay]:checked").val()&&($(".disable-on-yield-alert").slideDown("fast"),$("input[name=pc]").add("input[name^=cost]").add("input[name=price]").add("input[name=discount]").each(function(){$(this).prop("disabled",!0),$(this).parents("tr").css("background-color","#ffffff")}),$(".disable-on-yield").add(".disable-on-yield a").add(".disable-on-yield i").add("label[for=pc]").add("input[name=pc]").add("label[for^=cost]").add("input[name^=cost]").add("label[for=price]").add("input[name=price]").add("label[for=discount]").add("input[name=discount]").add(".subselect.discount a").add(".subselect.pc a").add(".subselect.discount i").add(".subselect.pc i").add(".subselect.discount td").add(".subselect.pc td").css("color","#999999"),$(".subselect.pc select").prop("disabled",!0)),$("input[name=figuredisplay]").change(function(){"yield"===$("input[name=figuredisplay]:checked").val()?($(".disable-on-yield-alert").slideDown("fast"),$("input[name=pc]").add("input[name^=cost]").add("input[name=price]").add("input[name=discount]").each(function(){$(this).prop("disabled",!0),$(this).parents("tr").css("background-color","#ffffff")}),$(".disable-on-yield").add(".disable-on-yield a").add(".disable-on-yield i").add("label[for=pc]").add("input[name=pc]").add("label[for^=cost]").add("input[name^=cost]").add("label[for=price]").add("input[name=price]").add("label[for=discount]").add("input[name=discount]").add(".subselect.discount a").add(".subselect.pc a").add(".subselect.discount i").add(".subselect.pc i").add(".subselect.discount td").add(".subselect.pc td").css("color","#999999"),$(".subselect.pc select").prop("disabled",!0)):($(".disable-on-yield-alert").slideUp("fast"),$("input[name=pc]").add("input[name^=cost]").add("input[name=price]").add("input[name=discount]").each(function(){$(this).prop("disabled",!1),$(this).parents("tr").css("background-color","auto")}),$(".disable-on-yield").add(".disable-on-yield a").add(".disable-on-yield i").add("label[for=pc]").add("input[name=pc]").add("label[for^=cost]").add("input[name^=cost]").add("label[for=price]").add("input[name=price]").add("label[for=discount]").add("input[name=discount]").add(".subselect.discount a").add(".subselect.pc a").add(".subselect.discount i").add(".subselect.pc i").add(".subselect.discount td").add(".subselect.pc td").css("color",""),$(".subselect.pc select").prop("disabled",!1))})}function setPracticeCost(e,a){d3.tsv("regional-assumptions.tsv",function(t){if("dp"===a)$("input[name=pc]").val("0");else if("hp"===a||"dbp"===a){var s;switch(e){case"napa":s=0;break;case"nsj":s=1;break;case"cc":s=2;break;case"lake":s=3;break;case"sonoma":s=4}$("input[name=pc]").val(t[s]["pc"+a])}})}function setPracticeSelect(e,a){0==a?$("select[name=practice]").val("dp"):d3.tsv("regional-assumptions.tsv",function(t){var s;switch(e){case"napa":s=0;break;case"nsj":s=1;break;case"cc":s=2;break;case"lake":s=3;break;case"sonoma":s=4}a==t[s].pchp?$("select[name=practice]").val("hp"):a==t[s].pcdbp?$("select[name=practice]").val("dbp"):$("select[name=practice]").val("custom")})}function checkRegionDisplay(e,a,t,s,i,n,c,l,o,d,r,p,u,f){d3.tsv("regional-assumptions.tsv",function(e){for(var b=-1,m=0;5>m;m++)a!=e[m].discount||t!=e[m].cost0||s!=e[m].cost1||i!=e[m].cost2||n!=e[m].cost3||c!=e[m].pchp&&c!=e[m].pcdbp&&0!=c||l!=e[m].price||o!=e[m].yield0||d!=e[m].yield1||r!=e[m].yield2||p!=e[m].yield3||u!=e[m].yield4||f!=e[m].yield5||(b=m);var h;setRegionDisplay(b)})}function setRegionDisplay(e){var a;switch(e){case-1:a="custom values.";break;case 0:a='<span class="regionName">Napa</span> default values.';break;case 1:a='<span class="regionName">Northern San Joaquin</span> default values.';break;case 2:a='<span class="regionName">Central Coast</span> default values.';break;case 3:a='<span class="regionName">Lake</span> default values.';break;case 4:a='<span class="regionName">Sonoma</span> default values.'}$(".currentRegion").html(a)}function setRegionalDefaults(e){d3.tsv("regional-assumptions.tsv",function(a){var t,s=$("select[name=practice]").val();switch(e){case"napa":t=0;break;case"nsj":t=1;break;case"cc":t=2;break;case"lake":t=3;break;case"sonoma":t=4}$("input[name=price]").val(a[t].price),$("input[name=discount]").val(a[t].discount),$("input[name=cost0]").val(a[t].cost0),$("input[name=cost1]").val(a[t].cost1),$("input[name=cost2]").val(a[t].cost2),$("input[name=cost3]").val(a[t].cost3),$("input[name=yield0]").val(a[t].yield0),$("input[name=yield1]").val(a[t].yield1),$("input[name=yield2]").val(a[t].yield2),$("input[name=yield3]").val(a[t].yield3),$("input[name=yield4]").val(a[t].yield4),$("input[name=yield5]").val(a[t].yield5),"hp"!==s&&"dbp"!==s||$("input[name=pc]").val(a[t]["pc"+s]),setRegionDisplay(t)})}