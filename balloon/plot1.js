// Dimensions of SVG window
var w = 800;
var h = 500;

// Import data
var data = [];
d3.text("data.csv", function(text) {
	var rawData = d3.csv.parseRows(text);

	parsetime = d3.time.format("%H:%M:%S").parse;
	// Convert non-date values to numbers
	for (var i = 0; i < rawData.length; i++) {
		data.push({"x": parsetime(rawData[i][0]), "y": Number(rawData[i][3])})
	}
	dataseries = [{"values": data, "key": "Altitude", "color": '#ff7f0e'}];

	nv.addGraph(function() {
		var chart = nv.models.lineChart().margin({left: 80, right: 40});
		chart.xAxis.tickFormat(function (d) {
			return d3.time.format("%H:%M:%S")(new Date(d))
		});
		chart.xAxis.axisLabel('Time')
		chart.yAxis.axisLabel('Altitude (m)')

		chart.showLegend(false);
		d3.select(".col-md-12").append("svg")
		.attr("width", w).attr("height", h)
		.datum(dataseries).call(chart);
	nv.utils.windowResize(function() { chart.update() });
	return chart;
	});
});

