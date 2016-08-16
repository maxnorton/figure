function the_figure(t,e,r,a,i){var n,o=$(window).width()>768?3.5:2,s={top:10,right:35,bottom:30,left:50},l={left:$(window).width()>768?40:15,right:0,bottom:20,top:0},d=["red","blue"],c=["untreated","healthy"],f=!1,g=$(window).width()>1024,h=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],p=m/50>4?parseInt(m/50):5;if(console.log("first set set"),$(window).height()/$(window).width()<.56){console.log("<.56");var u=$(window).height()<486?$(window).height()-s.top-s.bottom-50-l.top-l.bottom:486-s.top-s.bottom-100-l.top-l.bottom,y=u/.506;console.log("height="+u+", width="+y)}else{console.log(">.56");var y=$(window).width()<960?$("body").width()-s.left-s.right-l.left-l.right:960-s.left-s.right-l.left-l.right,u=.506*y;console.log("height="+u+", width="+y)}var w=parseInt(y+s.left+l.left+s.right),m=parseInt(u+s.top+l.top+s.bottom+l.bottom);"yield"===r?(f=a,n=g?"Yield (Tons / Acre)":"Yield"):"netreturns"===r&&(f=i,n=g?"Cumulative Discounted Net Returns (2013 dollars)":"CDNR (2013 $)");for(var v=t.length,x=0;v>x;x++)if(f){var b=t[x].substr(4),k=""!==e.pc?e.pc:"0",A="Year "+b,R="yield"===r?"Figure "+parseInt(x+1)+"&#8212;Vineyard Yield (Tons per Acre) at Various Disease Control Efficacy Rates":"Figure "+parseInt(x+1)+"&#8212;Cumulative Discounted Net Returns per Acre at Various Disease Control Efficacy Rates";A+="netreturns"===r?" Adoption of $"+k+" per Acre-Year Preventative Practice":" Preventative Practice Adoption","Custom"!==e.friendlyRegion&&(A+=", "+e.friendlyRegion+" Region"),b&&(d=["yellowgreen","darkorchid","lightskyblue","red","blue"],c=["25y"+b,"50y"+b,"75y"+b,"untreated","healthy"]);var C=d3.scale.linear().range([0,y]),D=d3.scale.linear().range([u,0]),I=d3.svg.axis().scale(C).ticks(5).orient("bottom"),Y=d3.svg.axis().scale(D).ticks(p).tickFormat(function(t){return currencyFormat(t)}).orient("left"),V=d3.svg.line().x(function(t){return C(t.x)}).y(function(t){return D(t.y)}).interpolate("linear");$(".figure-area").append('<section class="figure-wrap" id="figure'+b+'"><h4 class="figTitle">'+R+'</h4><h4 class="figSubhead">'+A+'</h4></section><p><a class="swipebox" href="#figure'+b+'"><i class="fa fa-search-plus" aria-hidden="true"></i> View fullscreen</a></p><div class="figure-bottom-link"><span class="glossary-link hide-on-print hide-on-widescreen"><a href="efficacy-information.html">Disease control efficacy rate information</a></span></div>');var F=d3.select("#figure"+b).append("svg").attr("width",w).attr("height",m).attr("id","figure"+b).append("g").attr("transform","translate("+parseInt(s.left+l.left)+","+s.top+")");C.domain(d3.extent(h)),D.domain(d3.extent(f.healthy,function(t){return t.y})),F.append("g").attr("class","x axis").attr("transform","translate(0,"+u+")").call(I).append("text").attr("x","50%").attr("y","3em").style("text-anchor","end").text("Vineyard Age (Years)"),F.append("g").attr("class","y axis").call(Y).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy",".71em").style("text-anchor","end").text(n);for(var P in c)F.append("path").attr("d",V(f[c[P]])).attr("class","line").attr("stroke",d[P]).attr("stroke-width",2).attr("fill","none"),F.selectAll("dot").data(f[c[P]]).enter().append("circle").attr("r",o).attr("fill",d[P]).attr("cx",function(t){return C(t.x)}).attr("cy",function(t){return D(t.y)})}$(".figure-area svg").each(function(){$(this).after('<div class="legend"><img src="img/figures/legend.png" /></div>')}),0===v&&$(".figure-area").prepend('<p class="alert">To generate a figure, <a href="#" class="close-tab">close this tab</a> or return to the figure parameters form tab and select at least one year of practice adoption.</p>')}function type(t){return t.x=+t.x,t.y=+t.y,t}