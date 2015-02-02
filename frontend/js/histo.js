
function optiondd(target, label, text) {

	var $link = $(label);
    var $img = $link.find('span'); 
    $link.html(text);
    $link.append($img);
	
	$(target).append($('<li/>', {
		'id' : 'xxx3'
	}).append($('<a/>', {
		'id' : 'data3',
		text : 'data sample 3'
	})));
	$('#data3').click(function(){
		myhistoG("data/data3.csv");
	});
	$(target).append($('<li/>', {
		'id' : 'xxx3'
	}).append($('<a/>', {
		'id' : 'data1',
		text : 'data sample 1'
	})));
	$('#data1').click(function(){
		myhistoG("data/data1.csv");
	});
	$(target).append($('<li/>', {
		'id' : 'xxx3'
	}).append($('<a/>', {
		'id' : 'data2',
		text : 'data sample 2'
	})));
	$('#data2').click(function(){
		myhistoG("data/data2.csv");
	});
		
	
	
}

function myhistoG(datan) {
	var outputDiv = "#out1";
	
	var barSize = 40;
	createHistogram(outputDiv, $(outputDiv).width(), Math.max($(outputDiv).height(), $(window).height() / 2), barSize, datan);
}

function createViz() {
	
	var datan = "data/data3.csv";
	progressUp(".progress-bar", 10);
	
	myhistoG(datan);
	progressUp(".progress-bar", 20);
	$(window).resize(function() {
		myhistoG(datan);
	});
	optiondd("#opt1","#title1", " Files History");
	openFiles();
	saveSvg();
	
}
 

function histo(target, width, height, barSize, data) {
	var progress = 90;
	progressUp(".progress-bar", progress);
	
	var progress = 0;
	progressUp(".progress-bar", progress);
	progress += 20;
	// Future size of svg node.
	var margin = {
		top : 80,
		right : 80,
		bottom : 80,
		left : 80
	},
	    width = width - margin.left - margin.right,
	    height = height - margin.top - margin.bottom,
	    barWidth =
	    barSize;

	d3.select(target).selectAll("svg").remove();

	var svg = d3.select(target).append("svg").attr("id", "charts").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	progress += 20;
	progressUp(".progress-bar", progress);

	var numBars = Math.round(width / barWidth);

	// Axes
	var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

	var y = d3.scale.linear().range([height, 0]);

	var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(10);

	var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);

	progress += 20;
	progressUp(".progress-bar", progress);

	data.forEach(function(d) {
		d.value = parseInt(d.value);
	});

	x.domain(data.slice(0, numBars).map(function(d) {
		return d.label;
	}));
	y.domain([0, d3.max(data, function(d) {
		return d.value;
	})]);
	
	create_table(data);

	d3.selectAll(".axis").remove();
	d3.selectAll(".bar").remove();

	svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis).selectAll("text").style("text-anchor", "start").attr("dx", "-1em").attr("dy", "0.5em").attr("transform", "rotate(0)");

	svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end");

	var sel = svg.selectAll(".bar").data(data);

	sel.enter().append("rect").attr("class", "bar").style("fill", "steelblue");

	sel.attr("x", function(d) {
		return x(d.label);
	}).attr("width", x.rangeBand());

	sel.attr("y", height).attr("height", 0);

	sel.transition().attr("y", function(d) {
		return y(d.value);
	}).attr("height", function(d) {
		return height - y(d.value);
	});

	progress += 20;
	progressUp(".progress-bar", progress);
	// Remove the placeholder.
	progress += 20;
	progressUp(".progress-bar", progress);
	d3.selectAll(".holder").remove();

	//d3.select(target).append(svg);

}

function createHistogram(target, width, height, barSize, filename) {
	
	$("#dl1").attr("download","data.csv").attr("href",filename);
	d3.csv(filename, function(error, data) {

		histo(target, width, height, barSize, data);

	});
}
