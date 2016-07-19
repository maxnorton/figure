function focusCustomParameters(){$("table.form tr").each(function(){$(this).click(function(){$(this).find("input").focus()})}),$("table.form input").each(function(){$(this).focus(function(){$(this).select(),$(this).parents("tr").addClass("focused")}),$(this).focusout(function(){$(this).parents("tr").removeClass("focused")})})}function getGenstates(){var e={figurestate:document.getElementById("figuregen").checked,tablestate:document.getElementById("tablegen").checked};return e}function mobileSubstitutions(){$(window).width()<1023&&($(".efficacy-info .table-style").html('<a href="img/efficacy-table01.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table'),$(".variable-definitions table:nth-of-type(3)").html('<a href="img/variable-table03.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css("border","0 none"),$(".hide-for-tablets").css("display","none").removeClass("swipebox")),$(window).width()<768&&($(".variable-definitions table:nth-of-type(1)").html('<a href="img/variable-table01.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css("border","0 none"),$(".variable-definitions table:nth-of-type(2)").html('<a href="img/variable-table02.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css("border","0 none"),$(".custom-instructions table:nth-of-type(1)").html('<a href="img/custom-instructions-table01.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css("border","0 none"),$(".custom-instructions table:nth-of-type(2)").html('<a href="img/custom-instructions-table02.png" class="swipebox"><i class="fa fa-table" aria-hidden="true"></i> Open reference table').css("border","0 none"),$(".hide-for-phones").css("display","none").removeClass("swipebox"))}function scrollToHash(){if(window.location.hash){var e=window.location.hash;$("body,html").stop(!0,!0).animate({scrollTop:$(e).offset().top-$("header").height()},"500","swing")}}function styleGlossaryLinks(){$(".glossary-link").prepend('<i class="fa fa-question-circle"></i>'),$(".glossary-inline-link").click(function(e){e.preventDefault(),$(this).stop().siblings(".glossary-inline").toggle("fast")})}function styleHoverInfo(){$(".hover-info td").prepend('<i class="fa fa-question-circle"></i>'),$(".hover-info").hover(function(e){$(this).stop().find(".info").fadeToggle("fast")},function(e){$(this).stop().find(".info").fadeToggle("fast")})}function toggleFormOptions(){var e=getGenstates();$("input[name=figuregen]").change(function(){e.figurestate=$(this).prop("checked"),$("fieldset.figure").each(function(){$(this).prop("disabled",!e.figurestate);var i=e.figurestate?"":"#999999";$(this).add($(this).find("a")).add($(this).find("i")).add($(this).find(".glossary-inline")).add($(this).find("label[for=efficacyOrYearfig]")).add("."+a+"-wrap").css("color",i)})}),$("input[name=tablegen]").change(function(){e.tablestate=$(this).prop("checked"),$("fieldset.table").each(function(){$(this).prop("disabled",!e.tablestate);var a=e.tablestate?"":"#999999";$(this).add($(this).find("a")).add($(this).find("i")).add($(this).find(".glossary-inline")).css("color",a)})});var a="";$("input[name=efficacyOrYearfig]").change(function(){a=$(this).val()+"fig";var e;switch(a){case"efficacyfig":e="yearfig";break;default:e="efficacyfig"}$("."+a+"-wrap").add("."+a+"-wrap a").add("."+a+"-wrap i").css("color",""),$("."+e+"-wrap").add("."+e+"-wrap a").add("."+e+"-wrap i").css("color","#999999"),$("input[name="+a+"]").each(function(){$(this).prop("disabled",!1)}),$("input[name="+e+"]").each(function(){$(this).prop("disabled",!0)})});var i=new Boolean(!1);$("input[name=efficacyfig]").one("change",function(){0==i&&(i=!0,$("input[name=efficacyOrYearfig][value=efficacy]").attr("checked",!0).change())}),$("input[name=yearfig]").one("change",function(){0==i&&(i=!0,$("input[name=efficacyOrYearfig][value=year]").attr("checked",!0).change())})}