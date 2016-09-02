function the_table(e){var t=[];d3.tsv("regional-assumptions.tsv",function(a){var s=regionSwitch(e.regionAssumed,"index");""===e.price&&(e.price=a[s].price,t.push("price")),""===e.discount&&(e.discount="3",t.push("discount")),""===e.pc&&(e.pc=0,t.push("pc")),""===e.cost0&&(e.cost0=a[s].cost0,t.push("cost0")),""===e.cost1&&(e.cost1=a[s].cost1,t.push("cost1")),""===e.cost2&&(e.cost2=a[s].cost2,t.push("cost2")),""===e.cost3&&(e.cost3=a[s].cost3,t.push("cost3")),""===e.yield0&&(e.yield0=a[s].yield0,t.push("yield0")),""===e.yield1&&(e.yield1=a[s].yield1,t.push("yield1")),""===e.yield2&&(e.yield2=a[s].yield2,t.push("yield2")),""===e.yield3&&(e.yield3=a[s].yield3,t.push("yield3")),""===e.yield4&&(e.yield4=a[s].yield4,t.push("yield4")),""===e.yield5&&(e.yield5=a[s].yield5,t.push("yield5")),d3.tsv("yield-rates.tsv",function(a){var s=[],i=[],r=[],n=[],o=[],d=[],l=[],c=[],p=[],u=[],y=[],v,h=1/(1+e.discount/100),f=[],g={},b={},m=[],I=[],w=[],A=[],k={healthy:null,untreated:null,"25y3":0,"50y3":0,"75y3":0,"25y5":0,"50y5":0,"75y5":0,"25y10":0,"50y10":0,"75y10":0},x={healthy:null,untreated:null,"25y3":0,"50y3":0,"75y3":0,"25y5":0,"50y5":0,"75y5":0,"25y10":0,"50y10":0,"75y10":0},S={healthy:0,untreated:1,"25y3":0,"50y3":0,"75y3":0,"25y5":0,"50y5":0,"75y5":0,"25y10":0,"50y10":0,"75y10":0},T={healthy:"Healthy<br /><em>Hypothetical scenario, as all California vineyards are highly susceptible to infection.</em>",untreated:"Expected effects of typical infection","25y3":"Adopted year 3","25y5":"Adopted year 5","25y10":"Adopted year 10","50y3":"Adopted year 3","50y5":"Adopted year 5","50y10":"Adopted year 10","75y3":"Adopted year 3","75y5":"Adopted year 5","75y10":"Adopted year 10"},C=Object.keys(T);b.healthy=[],b.untreated=[],g.healthy=[],g.untreated=[];var D=[parseInt(e.yield0),parseInt(e.yield1),parseInt(e.yield2),parseInt(e.yield3),parseInt(e.yield4),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5),parseInt(e.yield5)],Y=[];for(var G in D)Y[G]=D[G]*a[G].noAction/100,b.healthy[G]={x:G,y:D[G]},b.untreated[G]={x:G,y:Y[G]};y=[e.cost0,e.cost1,e.cost2,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3,e.cost3];var F=[];for(G in Y)F[G]=e.price*Y[G]-y[G];var E=[];for(G in F)v=Math.pow(h,G),E[G]=F[G]*v;var B=[E[0]];for(G=1;G<E.length;G++)B[G]=E[G]+B[G-1];var N=[e.price*D[0]-y[0]],L="-";for(G=1;G<D.length;G++)v=Math.pow(h,G),N[G]=(e.price*D[G]-y[G])*v+N[parseInt(G-1)],N[G]>N[parseInt(G-1)]&&(L=G);var M=currencyFormat(parseFloat(N[25]-B[25]).toFixed(2)),O="-";f=[];for(G in N)f[G]=N[G]-B[G];for(var P=0;E[P]<0&&25>P;)P++;if(25===P)P="Untreated vineyard never profitable";else{for(;E[P]>0&&25>P;)P++;P-=1}var R="";if(t.length>0){var U=regionSwitch(e.regionAssumed,"friendly");for("Custom"===U&&(U="Northern San Joaquin"),R='<p class="alert">No values specified for: ',G=0;G<t.length;G++)R+=valueSwitch(t[G]),G!==t.length-1?R+=", ":G===t.length-1&&(R+=".");var V=$.inArray("pc",t)>=0?" with a preventative practice cost of zero, as with delayed pruning":"";V+='.</p><p class="alert hide-on-print">[<a href="index.html#form" class="back-link">Return to the previous page</a> to update these parameters and re-run your calculations.]</p>',R+='</p><p class="alert">Calculations below have been performed using default values for the <strong>'+U+"</strong> region"+V}var _="<h2>Results</h2>"+R+'<section class="figure-area"></section><section class="output-wrap"><h3>Output table</h3><p class="landscape-alert" style="font-style: italic;">On mobile devices, we recommend viewing your results in landscape mode.</p><div class="output-table"><div class="output-thead"><div class="output-th">Scenario</div><div class="output-th">ACDNB</div><div class="output-th">Age adoption pays off</div><div class="output-th">Last profitable year</div><div class="output-th">Infection probability threshold</div></div><tbody>';_+='<div class="output-tr"><div class="untreated scenarioGroupShadow">&nbsp;</div><div class="untreated scenarioGroup">Untreated vineyard</div></div>',_+='<div class="output-tr"><div class="output-td">'+T.healthy+'</div><div class="output-td">'+M+'</div><div class="output-td">'+O+'</div><div class="output-td">'+L+'</div><div class="output-td">0</div></div>',_+='<div class="output-tr"><div class="output-td">'+T.untreated+'</div><div class="output-td">-</div><div class="output-td">-</div><div class="output-td">'+P+'</div><div class="output-td">1</div></div>';for(var j=2;j<C.length;j++){2!==j&&5!==j&&8!==j||(_+='<div class="output-tr"><div class="scenarioGroupShadow dce'+C[j].substr(0,2)+'">&nbsp;</div><div class="scenarioGroup dce'+C[j].substr(0,2)+'">Preventative management with '+C[j].substr(0,2)+"% DCE</div></div>");for(var q=C[j],z=parseInt(q.substr(3)),H=[],J=0;z>J;J++)H[J]=0;for(J=z;26>J;J++)H[J]=e.pc;var K=[];for(G in D)K[G]=e.price*D[G]-y[G]-H[G];var Q=[];for(G in K)v=Math.pow(h,G),Q[G]=K[G]*v;var W=[Q[0]];for(G=1;G<Q.length;G++)W[G]=Q[G]+W[G-1];for(G in W)g.healthy[G]={x:G,y:W[G]},g.untreated[G]={x:G,y:B[G]};m=[];for(G in D)m[G]=D[G]*a[G][q]/100;var X=C[j];b[X]=[];for(G in D)b[X][G]={x:G,y:m[G]};I=[];for(G in m)I[G]=e.price*m[G]-y[G]-H[G];w=[];for(G in I)v=Math.pow(h,G),w[G]=I[G]*v;for(A=[w[0]],G=1;G<w.length;G++)A[G]=w[G]+A[G-1];g[X]=[];for(G in D)g[X][G]={x:G,y:A[G]};for(u=[parseInt(H[0])],G=1;G<Q.length;G++)u[G]=parseInt(H[G])+parseInt(u[G-1]);var Z=[];for(G in A)Z[G]=A[G]-B[G];switch(q){case"25y3":s=Z;break;case"25y5":i=Z;break;case"25y10":r=Z;break;case"50y3":n=Z;break;case"50y5":o=Z;break;case"50y10":d=Z;break;case"75y3":l=Z;break;case"75y5":c=Z;break;case"75y10":p=Z}for(G in A)if(A[G]>B[G]){k[q]=G;break}for(0===parseInt(k[q])&&A[0]<=B[0]&&(k[q]="Never breaks even"),x[q]=q.substr(3);I[parseInt(x[q])+1]<=0&&parseInt(x[q])<25;)x[q]++;if(25===parseInt(x[q]))x[q]="Treatment never profitable";else for(;I[parseInt(x[q])+1]>0&&parseInt(x[q])<25;)x[q]++;S[q]=(N[25]-W[25])/(A[25]-W[25]-(B[25]-N[25])),S[q]>1&&(S[q]=1),S[q]=S[q].toFixed(3);var ee=null!==Z[25]?Z[25].toFixed(2):"-";"-"!==ee&&(ee=currencyFormat(ee)),_+='<div class="output-tr"><div class="output-td">'+T[q]+'</div><div class="output-td">'+ee+'</div><div class="output-td">'+k[q]+'</div><div class="output-td">'+x[q]+'</div><div class="output-td">'+S[q]+"</div></div>"}var te=["Price per ton","Discount rate","Additional annual cost per acre of preventative practice","Year 0: Establishing vineyard","Year 1: Establishing vineyard","Year 2: Establishing vineyard","Year 3+: Established vineyard","Year 0","Year 1","Year 2","Year 3","Year 4","Year 5+"],ae=[e.price,e.discount+"%",e.pc,e.cost0,e.cost1,e.cost2,e.cost3,e.yield0,e.yield1,e.yield2,e.yield3,e.yield4,e.yield5],se='<section class="assumptions-wrap"><h3>Parameter Values Used in Calculations</h3>';if("custom"!==e.regionBasis)se+='<p class="parameterSetDescription">All parameters are set to '+regionSwitch(e.regionBasis,"friendly")+" regional default values in the present set of calculations.";else if(0===t.length)se+='<p class="parameterSetDescription">These values describe a custom scenario designed by the user of this tool.</p>';else{for(se+='<p class="parameterSetDescription">These values describe a custom scenario, designed by the user of this tool, except where '+regionSwitch(e.regionAssumed,"friendly")+" regional defaults have been incorporated for unspecified values: ",G=0;G<t.length;G++)se+=valueSwitch(t[G]),t.length>2&&G!==t.length-1&&(se+=", "),G===t.length-2&&(se+=" and "),G===t.length-1&&(se+=".</p>");-1!==t.indexOf("pc")&&(se+='<p class="parameterSetDescription">The default preventative practice cost is zero, as with delayed pruning.</p>')}se+='<div class="assumptions-table">';for(var G=0;G<te.length;G++){var ie=0===G||2===G||3===G||4===G||5===G||6===G?currencyFormat(ae[G]):ae[G];3===G&&(se+='<div class="assumptions-tr"><div class="variableGroupShadow">&nbsp;</div><div class="variableGroup">Annual cultural cost per acre</div></div>'),7===G&&(se+='<div class="assumptions-tr"><div class="variableGroupShadow">&nbsp;</div><div class="variableGroup">Annual yield per acre in tons</div></div>'),se+='<div class="assumptions-tr"><div class="assumptions-td">'+te[G]+'</div><div class="assumptions-td">'+ie+"</div></div>"}se+="</div></section>";var re='<section class="varDefs-printable"><h3 id="variabledefinitions">Variable definitions</h3><p><strong>Cumulative discounted net returns:</strong> The cumulative net returns (returns &minus; costs) per acre over 25 years for a healthy vineyard, an untreated infected vineyard, and infected vineyards where action is taken. Current and future dollar amounts are in 2013 dollars and are discounted to 2013 using a 3% discount rate. </p><p><a id="tablevars"></a></p><p><strong>Additional cumulative discounted net benefits (ACDNB):</strong> The difference in cumulative net returns (returns - costs) per acre over 25 years between an infected vineyard where action is taken and an untreated infected vineyard. Current and future dollar amounts are in 2013 dollars and are discounted to 2013 using a 3% discount rate. </p><p><strong>Last profitable year:</strong> The last year an infected vineyard generates positive annual net returns (returns - costs). This year is the same for discounted and nominal net returns. </p><p><strong>Age adoption pays off:</strong> The age when cumulative discounted net returns (returns – costs) for a treated infected vineyard exceed those from an untreated infected vineyard. </p><p><strong>Infection probability threshold:</strong> The probability of infection where expected cumulative discounted net returns from treating a vineyard equals the expected cumulative discounted net returns from not treating a vineyard. If you perceive a probability of infection less than this probability, then not treating the vineyard generates greater cumulative discounted net returns than a treated vineyard, and vice versa. </p></section><p class="hide-on-print"><span class="print-link"><a href="javascript:window.print()"><i class="fa fa-print" aria-hidden="true"></i> Print these results.</a></span><span class="hide-on-widescreen"> | <span class="glossary-link hide-on-print" style="display: inline;"><a href="variable-definitions.html">Variable definitions</a></span></span></p>';_+="</tbody></div></section>"+se+re+'<p class="hide-on-print"><span class="hide-on-print"><a href="index.html#figureparameters" class="backlink">Return to input form</a> to modify this scenario.</span> | <span class="hide-on-print"><a href="index.html#fresh" target="_blank">Design a new scenario in a new tab</a> to preserve this output.</span></p>',$(".results").html(_);var ne=[];e.year3&&ne.push("year3"),e.year5&&ne.push("year5"),e.year10&&ne.push("year10");var oe={pc:e.pc,friendlyRegion:regionSwitch(e.regionBasis,"friendly")},de=$.localStorage,le=[ne,oe,e.figuredisplay,b,g];de.set("the-figure-parameters",le),console.log("about to call"),the_figure(le[0],le[1],le[2],le[3],le[4]),$("body,html").stop(!0,!0).animate({scrollTop:$("#results").offset().top-$("header").height()},"500","swing"),activateCloseTabLinks(),styleGlossaryLinks()})})}