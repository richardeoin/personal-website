// Screen dimensions
var w = 650;
var h = 650;

// Some constants
var strat = 11; // stratosphere starts at ~11km

// Parse raw data
//var rawData = [ [0, 10], [2, 20] , [4, 40]];
var rawData = [];
d3.text("rawData.csv", function(text) {
	rawData = d3.csv.parseRows(text).map(function(row) {
		return row.map(function(value) {
			return +value;
		});
	});
	drawData();
});

// Create svg canvas
var svg = d3.select("#content")
	    .insert("svg", "p")
	    .attr("width", w)
	    .attr("height", h);


// Define svg properties
var vertGradient = svg.append("defs")
   .append("linearGradient")
   .attr("id", "vertGrad")
   .attr("x1", "0%")
   .attr("y1", "0%")
   .attr("x2", "0%")
   .attr("y2", "100%");
vertGradient.append("stop")
	.attr("offset", "0%")
        .attr("style", "stop-color:rgb(0,13,55);stop-opacity:1");	
vertGradient.append("stop")
	.attr("offset", "100%")
	.attr("style", "stop-color:rgb(106,149,209);stop-opacity:1");
var radGradient = svg.select("defs")
    .append("radialGradient")
    .attr("id", "radGrad")
    .attr("cx", "60%")
    .attr("cy", "50%")
    .attr("r", "50%");
radGradient.append("stop")
	   .attr("offset", "0%")
	   .attr("style", "stop-color:rgb(255, 255, 255);stop-opacity:1");
radGradient.append("stop")
	   .attr("offset", "100%")
	   .attr("style", "stop-color:rgb(200,200,200);stop-opacity:1");

// Draw background
svg.append("rect")
   .attr("width", "100%")
   .attr("height", "100%")
   .attr("fill", "url(#vertGrad)"); 

// Draw some labels
svg.append("line")
   .attr("x1", 0)
   .attr("y1", (h - strat * 20))
   .attr("x2", w)
   .attr("y2", (h - strat * 20))
   .attr("style", "stroke:white;stroke-width:2");
svg.append("text")
   .attr("x", 10)
   .attr("y", (h - 15 - strat * 20))
   .attr("fill", "white")
   .text(function(d) { return "11km: stratosphere begins here";});

function drawData () {
	// Draw some circles
	svg.selectAll("circle")
	   .data(rawData)
	   .enter()
	   .append("circle")
	   .attr("cx", function(d) {
		   return d[0] * 25 + 20; 
	   })
	   .attr("cy", function(d) {
		return (h - d[1] * 20);
	   })
	   .attr("r", function(d) {
		return 15;
	   })
	   .attr("fill", "url(#radGrad)");
}

