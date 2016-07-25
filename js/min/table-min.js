function the_table(e,t,a,r,n,s,i,o,d,p,l,h,u){var c=[],y=$("select[name=region]").val();d3.tsv("regional-assumptions.tsv",function(f){var v;switch(y){case"napa":v=0;break;case"nsj":v=1;break;case"cc":v=2;break;case"lake":v=3;break;case"sonoma":v=4;break;case"custom":v=1}""==e&&(e="3",c.push("discount")),""==t&&(t=f[v].cost0,c.push("cost0")),""==a&&(a=f[v].cost1,c.push("cost1")),""==r&&(r=f[v].cost2,c.push("cost2")),""==n&&(n=f[v].cost3,c.push("cost3")),""==s&&(s=0,c.push("pc")),""==i&&(i=f[v].price,c.push("price")),""==o&&(o=f[v].yield0,c.push("yield0")),""==d&&(d=f[v].yield1,c.push("yield1")),""==p&&(p=f[v].yield2,c.push("yield2")),""==l&&(l=f[v].yield3,c.push("yield3")),""==h&&(h=f[v].yield4,c.push("yield4")),""==u&&(u=f[v].yield5,c.push("yield5"))}),d3.tsv("yield-rates.tsv",function(f){var v=[],b=[],g=[],m=[],I=[],k=[],w=[],C=[],x=[],D=[],F=[],E,T=1/(1+e/100),N=[],A={},j={},M=[],S=[],q=[],L=[],B={healthy:null,untreated:null,"25y3":0,"50y3":0,"75y3":0,"25y5":0,"50y5":0,"75y5":0,"25y10":0,"50y10":0,"75y10":0},J={healthy:null,untreated:null,"25y3":0,"50y3":0,"75y3":0,"25y5":0,"50y5":0,"75y5":0,"25y10":0,"50y10":0,"75y10":0},O={healthy:0,untreated:1,"25y3":0,"50y3":0,"75y3":0,"25y5":0,"50y5":0,"75y5":0,"25y10":0,"50y10":0,"75y10":0},_={healthy:"Healthy, untreated",untreated:"Infected, untreated","25y3":"25% DCE treatment adopted year 3","25y5":"25% DCE treatment adopted year 5","25y10":"25% DCE treatment adopted year 10","50y3":"50% DCE treatment adopted year 3","50y5":"50% DCE treatment adopted year 5","50y10":"50% DCE treatment adopted year 10","75y3":"75% DCE treatment adopted year 3","75y5":"75% DCE treatment adopted year 5","75y10":"75% DCE treatment adopted year 10"},z=Object.keys(_);j.healthy=[],j.untreated=[],A.healthy=[],A.untreated=[];var H=[parseInt(o),parseInt(d),parseInt(p),parseInt(l),parseInt(h),parseInt(u),parseInt(u),parseInt(u),parseInt(u),parseInt(u),parseInt(u),parseInt(u),parseInt(u),parseInt(u),parseInt(u),parseInt(u),parseInt(u),parseInt(u),parseInt(u),parseInt(u),parseInt(u),parseInt(u),parseInt(u),parseInt(u),parseInt(u),parseInt(u)],P=[];for(var R in H)P[R]=H[R]*f[R].noAction/100,j.healthy[R]={x:R,y:H[R]},j.untreated[R]={x:R,y:P[R]};F=[t,a,r,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n];var U=[];for(R in P)U[R]=i*P[R]-F[R];var V=[];for(R in U)E=Math.pow(T,R),V[R]=U[R]*E;var G=[V[0]];for(R=1;R<V.length;R++)G[R]=V[R]+G[R-1];var K=[i*H[0]-F[0]],Q="-";for(R=1;R<H.length;R++)E=Math.pow(T,R),K[R]=(i*H[R]-F[R])*E+K[parseInt(R-1)],K[R]>K[parseInt(R-1)]&&(Q=R);var W=K[25]-G[25];W=0>W?"-$"+parseFloat(-1*W).toFixed(2):"$"+parseFloat(W).toFixed(2);var X=-1;for(R in K)if(K[R+1]>0){X=R;break}-1===X&&(X="Never breaks even",Q="-"),N=[];for(R in K)N[R]=K[R]-G[R];for(var Y=0;V[Y]<0&&25>Y;)Y++;if(25===Y)Y="Untreated vineyard never profitable";else{for(;V[Y]>0&&25>Y;)Y++;Y-=1}var Z="";if(c.length>0){var ee;switch(y){case"napa":ee="Napa";break;case"nsj":ee="Northern San Joaquin";break;case"cc":ee="Central Coast";break;case"lake":ee="Lake";break;case"sonoma":ee="Sonoma";break;case"custom":ee="Northern San Joaquin"}for(Z='<p class="alert">No values specified for: ',R=0;R<c.length-1;R++)Z+=c[R]+", ";console.log("pc"in c);var te="pc"in c?"with an preventative practice cost of zero, as with delayed pruning.</p>":".</p>";Z+=c[R]+'</p><p class="alert">Calculations below have been performed using default values for the '+ee+" region"+te}var ae="<hr /><h2>Results</h2>"+Z+'<section class="figure-area"></section><h3>Output table</h3><table><thead><th><h4>Scenario</h4></th><th><h4>ACDNB</h4></th><th><h4>Age adoption pays off</h4></th><th><h4>Last profitable year</h4></th><th><h4>Infection probability threshold</h4></th></thead><tbody>';ae+="<tr><td>"+_.healthy+"</td><td>"+W+"</td><td>"+X+"</td><td>"+Q+"</td><td>0</td></tr>",ae+="<tr><td>"+_.untreated+"</td><td>-</td><td>-</td><td>"+Y+"</td><td>1</td></tr>";for(var re=2;re<z.length;re++){for(var ne=z[re],se=parseInt(ne.substr(3)),ie=[],oe=0;se>oe;oe++)ie[oe]=0;for(oe=se;26>oe;oe++)ie[oe]=s;var de=[];for(R in H)de[R]=i*H[R]-F[R]-ie[R];var pe=[];for(R in de)E=Math.pow(T,R),pe[R]=de[R]*E;var le=[pe[0]];for(R=1;R<pe.length;R++)le[R]=pe[R]+le[R-1];for(R in le)A.healthy[R]={x:R,y:le[R]},A.untreated[R]={x:R,y:G[R]};M=[];for(R in H)M[R]=H[R]*f[R][ne]/100;var he=z[re];j[he]=[];for(R in H)j[he][R]={x:R,y:M[R]};S=[];for(R in M)S[R]=i*M[R]-F[R]-ie[R];q=[];for(R in S)E=Math.pow(T,R),q[R]=S[R]*E;for(L=[q[0]],R=1;R<q.length;R++)L[R]=q[R]+L[R-1];A[he]=[];for(R in H)A[he][R]={x:R,y:L[R]};for(D=[parseInt(ie[0])],R=1;R<pe.length;R++)D[R]=parseInt(ie[R])+parseInt(D[R-1]);var ue=[];for(R in L)ue[R]=L[R]-G[R];switch(ne){case"25y3":v=ue;break;case"25y5":b=ue;break;case"25y10":g=ue;break;case"50y3":m=ue;break;case"50y5":I=ue;break;case"50y10":k=ue;break;case"75y3":w=ue;break;case"75y5":C=ue;break;case"75y10":x=ue}for(R in L)if(L[R]>G[R]){B[ne]=R;break}for(0===parseInt(B[ne])&&L[0]<=G[0]&&(B[ne]="Never breaks even"),J[ne]=ne.substr(3);S[parseInt(J[ne])+1]<=0&&parseInt(J[ne])<25;)J[ne]++;if(25===parseInt(J[ne]))J[ne]="Treatment never profitable";else for(;S[parseInt(J[ne])+1]>0&&parseInt(J[ne])<25;)J[ne]++;O[ne]=(K[25]-le[25])/(L[25]-le[25]-(G[25]-K[25])),O[ne]>1&&(O[ne]=1),O[ne]=O[ne].toFixed(3);var ce=null!==ue[25]?ue[25].toFixed(2):"-";"-"!==ce&&0>ce?ce="-$"+parseFloat(-1*ce).toFixed(2):"-"!==ce&&(ce="$"+parseFloat(ce).toFixed(2)),ae+="<tr><td>"+_[ne]+"</td><td>"+ce+"</td><td>"+B[ne]+"</td><td>"+J[ne]+"</td><td>"+O[ne]+"</td></tr>"}var ye='<section class="varDefs-printable"><h3 id="variabledefinitions">Variable definitions</h3><p><strong>Cumulative discounted net returns:</strong> The cumulative net returns (returns &minus; costs) per acre over 25 years for a healthy vineyard, an untreated infected vineyard, and infected vineyards where action is taken. Current and future dollar amounts are in 2013 dollars and are discounted to 2013 using a 3% discount rate. </p><p><a id="tablevars"></a></p><p><strong>Additional cumulative discounted net benefits (ACDNB):</strong> The difference in cumulative net returns (returns - costs) per acre over 25 years between an infected vineyard where action is taken and an untreated infected vineyard. Current and future dollar amounts are in 2013 dollars and are discounted to 2013 using a 3% discount rate. </p><p><strong>Last profitable year:</strong> The last year an infected vineyard generates positive annual net returns (returns - costs). This year is the same for discounted and nominal net returns. </p><p><strong>Age adoption pays off:</strong> The age when cumulative discounted net returns (returns – costs) for a treated infected vineyard exceed those from an untreated infected vineyard. </p><p><strong>Infection probability threshold:</strong> The probability of infection where expected cumulative discounted net returns from treating a vineyard equals the expected cumulative discounted net returns from not treating a vineyard. If you perceive a probability of infection less than this probability, then not treating the vineyard generates greater cumulative discounted net returns than a treated vineyard, and vice versa. </p></section>';ae+="</tbody></table>"+ye+'<p class="print-link"><a href="javascript:window.print()"><i class="fa fa-print" aria-hidden="true"></i> Print these results.</a></p><p class="adjust-link"><a href="#figureparameters" onclick="$(\'body,html\').stop(true,true).animate({scrollTop: $(\'#figureparameters\').offset().top - $(\'header\').height()}, \'500\', \'swing\');">Adjust parameters</a></p>',$(".results").html(ae),the_figure(j,A),$("body,html").stop(!0,!0).animate({scrollTop:$("#results").offset().top-$("header").height()},"500","swing")})}