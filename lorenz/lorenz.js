var width = 500;
var height = 400;

var h = 0.01;

var sigma = 10;
var r = 28;
var b = 8/3;
var scale = 10;

var init = -10 + Math.random() * 20
var lastValues = {"x": init, "y": init, "z": init};
var nextValues = {"x": init, "y": init, "z": init};

var svg = d3.select(".col-md-12").append("svg")
.attr("width", width).attr("height", height);
svg.attr("style", "border-style: solid; border-width: 1px;");

var line = d3.svg.line()
	.x(function(d) { return d.x; })
	.y(function(d) { return d.y; })
	.interpolate("basis");

g = svg.append("g")

var dispData  = [];

svg.on("click", function() {
	var coords = [0, 0];
	coords = d3.mouse(this);
	var x = coords[0];
	var y = coords[1];

	lastValues = {"x": (x-300)/scale, "y": 0, "z": (y+80)/scale};

	d3.timer(function() {
	var value = sigma * (lastValues.y - lastValues.x);
	nextValues.x = lastValues.x + (h * value);

	value = (r * lastValues.x) - lastValues.y - (lastValues.x*lastValues.z);
	nextValues.y = lastValues.y + (h * value);

	value = (lastValues.x * lastValues.y) - (b * lastValues.z);
	nextValues.z = lastValues.z + (h * value);

	dispData.push({"x": scale*nextValues.x+300, "y": scale*nextValues.z-80});
	d3.select("g").remove();
	var g = svg.append("g").datum(dispData);
	g.append("path").attr("d", line).attr("style", "fill:none; stroke:black; stroke-width: 1;");
	lastValues.x = nextValues.x;
	lastValues.y = nextValues.y;
	lastValues.z = nextValues.z;

	if (dispData.length > 1000) {
		dispData.shift()
	}
5});});
