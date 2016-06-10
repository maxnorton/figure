function the_table(e,t,a,r,d,s,o,n,l,y,h,i,p){d3.tsv("yield-rates.tsv",function(f){var v,c,u,b,k,m,g,Y,D,w,C,I,F,E,N=new Array,R={healthy:null,untreated:null,"25y3":0,"50y3":0,"75y3":0,"25y5":0,"50y5":0,"75y5":0,"25y10":0,"50y10":0,"75y10":0},x={healthy:null,untreated:null,"25y3":0,"50y3":0,"75y3":0,"25y5":0,"50y5":0,"75y5":0,"25y10":0,"50y10":0,"75y10":0},A={healthy:0,untreated:1,"25y3":0,"50y3":0,"75y3":0,"25y5":0,"50y5":0,"75y5":0,"25y10":0,"50y10":0,"75y10":0},j={healthy:"Healthy, untreated",untreated:"Infected, untreated","25y3":"25% DCE treatment adopted year 3","25y5":"25% DCE treatment adopted year 5","25y10":"25% DCE treatment adopted year 10","50y3":"50% DCE treatment adopted year 3","50y5":"50% DCE treatment adopted year 5","50y10":"50% DCE treatment adopted year 10","75y3":"75% DCE treatment adopted year 3","75y5":"75% DCE treatment adopted year 5","75y10":"75% DCE treatment adopted year 10"},M=Object.keys(j),T=1/(1+e/100);healthyYields=[n,l,y,h,i,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p,p],untreatedYields=[];for(var B in healthyYields)untreatedYields[B]=healthyYields[B]*f[B].noAction/100;costs=[t,a,r,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d];var O=[];for(var B in untreatedYields)O[B]=o*untreatedYields[B]-costs[B];console.log("untreatedNR:"),console.log(O);var P=[];for(var B in O){var H=Math.pow(T,B);P[B]=O[B]*H}console.log("untreatedDNR:"),console.log(P);for(var L=[P[0]],B=1;B<P.length;B++)L[B]=P[B]+L[B-1];console.log("untreatedCDNR:"),console.log(L);for(var S=[o*healthyYields[0]-costs[0]],U="-",B=1;B<healthyYields.length;B++){var H=Math.pow(T,B);S[B]=(o*healthyYields[B]-costs[B])*H+S[parseInt(B-1)],S[B]>S[parseInt(B-1)]&&(U=B)}var _=S[25]-L[25];_=0>_?"-$"+parseFloat(-1*_).toFixed(2):"$"+parseFloat(_).toFixed(2);var q=-1;for(var B in S)if(S[B+1]>0){q=B;break}-1==q&&(q="Never breaks even",U="-"),v=[];for(var B in S)v[B]=S[B]-L[B];for(var z=0;P[z]<0&&25>z;)z++;if(25==z)z="Untreated vineyard never profitable";else{for(;P[z]>0&&25>z;)z++;z-=1}var G="<hr /><h2>Results</h2><table><thead><th><h4>Scenario</h4></th><th><h4>ACDNB</h4></th><th><h4>Breakeven age</h4></th><th><h4>Last profitable year</h4></th><th><h4>Breakeven probability</h4></th></thead><tbody>";G+="<tr><td>"+j.healthy+"</td><td>"+_+"</td><td>"+q+"</td><td>"+U+"</td><td>0</td></tr>",G+="<tr><td>"+j.untreated+"</td><td>-</td><td>-</td><td>"+z+"</td><td>1</td></tr>";for(var J=2;J<M.length;J++){for(var K=M[J],Q=parseInt(K.substr(3)),V=[],W=0;Q>W;W++)V[W]=0;for(var W=Q;26>W;W++)V[W]=s;var X=[];for(var B in healthyYields)X[B]=o*healthyYields[B]-costs[B]-V[B];var Z=[];for(var B in X){var H=Math.pow(T,B);Z[B]=X[B]*H}for(var ee=[Z[0]],B=1;B<Z.length;B++)ee[B]=Z[B]+ee[B-1];C=[];for(var B in healthyYields)C[B]=healthyYields[B]*f[B][K]/100;I=[];for(var B in C)I[B]=o*C[B]-costs[B]-V[B];F=[];for(var B in I){var H=Math.pow(T,B);F[B]=I[B]*H}E=[F[0]];for(var B=1;B<F.length;B++)E[B]=F[B]+E[B-1];N=[parseInt(V[0])];for(var B=1;B<Z.length;B++)N[B]=parseInt(V[B])+parseInt(N[B-1]);var te=[];for(var B in E)te[B]=E[B]-L[B];switch(K){case"25y3":c=te;break;case"25y5":u=te;break;case"25y10":b=te;break;case"50y3":k=te;break;case"50y5":m=te;break;case"50y10":g=te;break;case"75y3":Y=te;break;case"75y5":D=te;break;case"75y10":w=te}for(var B in E)if(E[B]>L[B]){R[K]=B;break}for(0==R[K]&&E[0]<=L[0]&&(R[K]="Never breaks even"),x[K]=K.substr(3);I[parseInt(x[K])+1]<=0&&parseInt(x[K])<25;)x[K]++;if(25==parseInt(x[K]))x[K]="Treatment never profitable";else for(;I[parseInt(x[K])+1]>0&&parseInt(x[K])<25;)x[K]++;A[K]=(S[25]-ee[25])/(E[25]-ee[25]-(L[25]-S[25])),A[K]>1&&(A[K]=1),A[K]=A[K].toFixed(3);var ae=null!=te[25]?te[25].toFixed(2):"-";"-"!=ae&&0>ae?ae="-$"+parseFloat(-1*ae).toFixed(2):"-"!=ae&&(ae="$"+parseFloat(ae).toFixed(2)),G+="<tr><td>"+j[K]+"</td><td>"+ae+"</td><td>"+R[K]+"</td><td>"+x[K]+"</td><td>"+A[K]+"</td></tr>"}G+='</tbody></table><p class="print-link"><a href="javascript:window.print()"><i class="fa fa-print" aria-hidden="true"></i> Print these results.</a></p><p class="adjust-link"><a href="#form" onclick="$(\'body,html\').stop(true,true).animate({scrollTop: $(\'#form\').offset().top - $(\'header\').height()}, \'500\', \'swing\');">Adjust parameters</a></p>',$(".results").html(G),$("body,html").stop(!0,!0).animate({scrollTop:$("#results").offset().top-$("header").height()},"500","swing")})}var t,a,eff,discount,cost0,cost1,cost2,cost3,pc,price,yield0,yield1,yield2,yield3,yield4,treatedCDNR,treatedDNR,treatedNR,treatedYields=new Array,costs,pcFtnOfT,isProfitable=new Array;