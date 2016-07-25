function focusCustomParameters(){$("table.form tr").each(function(){$(this).click(function(){$(this).find("input").focus()})}),$("table.form input").each(function(){$(this).focus(function(){$(this).select(),$(this).parents("tr").addClass("focused")}),$(this).focusout(function(){$(this).parents("tr").removeClass("focused")})})}function getGenstates(){var e={figurestate:document.getElementById("figuregen").checked,tablestate:document.getElementById("tablegen").checked};return e}function goBack(e){var a="http://maxnorton.github.io/figure",t=window.location.hash;history.back();var i=window.location.hash;return i!==t||"string"==typeof document.referrer&&""!==document.referrer||window.setTimeout(function(){window.location.href=a},1e3),e&&(e.preventDefault&&e.preventDefault(),e.preventPropagation&&e.preventPropagation()),!1}function mobileSubstitutions(){$(window).width()<1023&&($(".efficacy-info .table-style").html('<a href="img/efficacy-table01.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table'),$(".variable-definitions table:nth-of-type(3)").html('<a href="img/variable-table03.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css("border","0 none"),$(".hide-for-tablets").css("display","none").removeClass("swipebox")),$(window).width()<768&&($(".variable-definitions table:nth-of-type(1)").html('<a href="img/variable-table01.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css("border","0 none"),$(".variable-definitions table:nth-of-type(2)").html('<a href="img/variable-table02.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css("border","0 none"),$(".custom-instructions table:nth-of-type(1)").html('<a href="img/custom-instructions-table01.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css("border","0 none"),$(".custom-instructions table:nth-of-type(2)").html('<a href="img/custom-instructions-table02.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css("border","0 none"),$(".hide-for-phones").css("display","none").removeClass("swipebox"))}function scrollToHash(){if(window.location.hash){var e=window.location.hash;$("body,html").stop(!0,!0).animate({scrollTop:$(e).offset().top-$("header").height()},"500","swing")}}function styleGlossaryLinks(){$(".glossary-link").prepend('<i class="fa fa-question-circle"></i>'),$(".glossary-link-inline-child").click(function(e){e.preventDefault(),$(this).stop().find(".glossary-inline").toggle("fast")})}function styleHoverInfo(){$(".hover-info td").prepend('<i class="fa fa-question-circle"></i>'),$(".hover-info").hover(function(e){$(this).stop().find(".info").fadeToggle("fast")},function(e){$(this).stop().find(".info").fadeToggle("fast")})}function toggleFormOptions(){var e=getGenstates();$("input[name=figuregen]").change(function(){e.figurestate=$(this).prop("checked"),$("fieldset.figure").each(function(){$(this).prop("disabled",!e.figurestate);var t=e.figurestate?"":"#999999";$(this).add($(this).find("a")).add($(this).find("i")).add($(this).find(".glossary-inline")).add($(this).find("label[for=efficacyOrYearfig]")).add("."+a+"-wrap").css("color",t)})}),$("input[name=tablegen]").change(function(){e.tablestate=$(this).prop("checked"),$("fieldset.table").each(function(){$(this).prop("disabled",!e.tablestate);var a=e.tablestate?"":"#999999";$(this).add($(this).find("a")).add($(this).find("i")).add($(this).find(".glossary-inline")).css("color",a)})});var a="";$("input[name=efficacyOrYearfig]").change(function(){a=$(this).val()+"fig";var e;switch(a){case"efficacyfig":e="yearfig";break;default:e="efficacyfig"}$("."+a+"-wrap").add("."+a+"-wrap a").add("."+a+"-wrap i").css("color",""),$("."+e+"-wrap").add("."+e+"-wrap a").add("."+e+"-wrap i").css("color","#999999"),$("input[name="+a+"]").each(function(){$(this).prop("disabled",!1)}),$("input[name="+e+"]").each(function(){$(this).prop("disabled",!0)})});var t=new Boolean(!1);$("input[name=efficacyfig]").one("change",function(){0==t&&(t=!0,$("input[name=efficacyOrYearfig][value=efficacy]").attr("checked",!0).change())}),$("input[name=yearfig]").one("change",function(){0==t&&(t=!0,$("input[name=efficacyOrYearfig][value=year]").attr("checked",!0).change())})}function setPracticeCost(e,a){d3.tsv("regional-assumptions.tsv",function(t){if("dp"===a)$("input[name=pc]").val("0");else if("hp"===a||"dbp"===a){var i;switch(e){case"napa":i=0;break;case"nsj":i=1;break;case"cc":i=2;break;case"lake":i=3;break;case"sonoma":i=4}$("input[name=pc]").val(t[i]["pc"+a])}})}function setPracticeSelect(e,a){0==a?$("select[name=practice]").val("dp"):d3.tsv("regional-assumptions.tsv",function(t){var i;switch(e){case"napa":i=0;break;case"nsj":i=1;break;case"cc":i=2;break;case"lake":i=3;break;case"sonoma":i=4}a==t[i].pchp?$("select[name=practice]").val("hp"):a==t[i].pcdbp?$("select[name=practice]").val("dbp"):$("select[name=practice]").val("custom")})}function checkRegionDisplay(e,a,t,i,n,s,c,o,r,l,f,p,d,u){d3.tsv("regional-assumptions.tsv",function(e){for(var h=-1,b=0;5>b;b++)a!=e[b].discount||t!=e[b].cost0||i!=e[b].cost1||n!=e[b].cost2||s!=e[b].cost3||c!=e[b].pchp&&c!=e[b].pcdbp&&0!=c||o!=e[b].price||r!=e[b].yield0||l!=e[b].yield1||f!=e[b].yield2||p!=e[b].yield3||d!=e[b].yield4||u!=e[b].yield5||(h=b);var g;setRegionDisplay(h)})}function setRegionDisplay(e){var a;switch(e){case-1:a="custom values.";break;case 0:a='<span class="regionName">Napa</span> default values.';break;case 1:a='<span class="regionName">Northern San Joaquin</span> default values.';break;case 2:a='<span class="regionName">Central Coast</span> default values.';break;case 3:a='<span class="regionName">Lake</span> default values.';break;case 4:a='<span class="regionName">Sonoma</span> default values.'}$(".currentRegion").html(a)}function setRegionalDefaults(e){d3.tsv("regional-assumptions.tsv",function(a){var t,i=$("select[name=practice]").val();switch(e){case"napa":t=0;break;case"nsj":t=1;break;case"cc":t=2;break;case"lake":t=3;break;case"sonoma":t=4}$("input[name=price]").val(a[t].price),$("input[name=discount]").val(a[t].discount),$("input[name=cost0]").val(a[t].cost0),$("input[name=cost1]").val(a[t].cost1),$("input[name=cost2]").val(a[t].cost2),$("input[name=cost3]").val(a[t].cost3),$("input[name=yield0]").val(a[t].yield0),$("input[name=yield1]").val(a[t].yield1),$("input[name=yield2]").val(a[t].yield2),$("input[name=yield3]").val(a[t].yield3),$("input[name=yield4]").val(a[t].yield4),$("input[name=yield5]").val(a[t].yield5),"hp"!==i&&"dbp"!==i||$("input[name=pc]").val(a[t]["pc"+i]),setRegionDisplay(t)})}