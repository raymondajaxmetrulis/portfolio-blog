var scrollVis = function () {
	var width = 600;
	var height = 420;
	var margin = { top: 80, left: 400, bottom: 0, right: 0 };
	
	var lastIndex = -1;
	var activeIndex = 0;
	
	var squareSize = 10;
	var squarePad = 2;
	var numPerRow = width / (squareSize + squarePad);
	var svg = null;
	var g = null;

	var xBarScale = d3.scaleLinear()
	    .range([0, width]);
	var xAxisBar = d3.axisBottom()
		.scale(xBarScale);

	var activateFunctions = [];
	var updateFunctions = [];
			  
	var chart = function (selection) {
		selection.each(function (rawData) {
			svg = d3.select(this).selectAll('svg').data([wordData]);
			var svgE = svg.enter().append('svg');
			svg = svg.merge(svgE);
			svg.attr('width', width + margin.left + margin.right);
			svg.attr('height', height + margin.top + margin.bottom);
			svg.append('g');
			g = svg.select('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
			
			var wordData = getWords(rawData);
			var fillerWords = getFillerWords(wordData);
			
			setupVis(wordData);
			setupSections();
		});
	};
	
	var setupVis = function (wordData, fillerCounts, histData) {
		// axis
		g.append('g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + height + ')')
			.call(xAxisBar);
		g.select('.x.axis').style('opacity', 0);
		// count openvis title
		g.append('text')
			.attr('class', 'title openvis-title')
			.attr('x', width / 2)
			.attr('y', height / 3)
			.text('2013');
		g.append('text')
			.attr('class', 'sub-title openvis-title')
			.attr('x', width / 2)
			.attr('y', (height / 3) + (height / 5))
			.text('OpenVis Conf');
		g.selectAll('.openvis-title')
			.attr('opacity', 0);
		// count filler word count title
		g.append('text')
			.attr('class', 'title count-title highlight')
			.attr('x', width / 2)
			.attr('y', height / 3)
			.text('180');
		g.append('text')
			.attr('class', 'sub-title count-title')
			.attr('x', width / 2)
			.attr('y', (height / 3) + (height / 5))
			.text('Filler Words');
		g.selectAll('.count-title')
			.attr('opacity', 0);
		// square grid
		var squares = g.selectAll('.square').data(wordData, function (d) { return d.word; });
		var squaresE = squares.enter()
			.append('rect')
			.classed('square', true);
		squares = squares.merge(squaresE)
			.attr('width', squareSize)
			.attr('height', squareSize)
			.attr('fill', '#fff')
			.classed('fill-square', function (d) { return d.filler; })
			.attr('x', function (d) { return d.x;})
			.attr('y', function (d) { return d.y;})
			.attr('opacity', 0);
	};

	var setupSections = function () {
		activateFunctions[0] = showTitle;
		activateFunctions[1] = showFillerTitle;
		activateFunctions[2] = showGrid;
		activateFunctions[3] = highlightGrid;
		for (var i = 0; i < 4; i++) {
			updateFunctions[i] = function () {};
		}
	};

	function showTitle() {
		g.selectAll('.count-title')
		    .transition()
		    .duration(0)
			.attr('opacity', 0);
		g.selectAll('.openvis-title')
			.transition()
		    .duration(600)
		    .attr('opacity', 1.0);
	}

	function showFillerTitle() {
		g.selectAll('.openvis-title')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		g.selectAll('.square')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		g.selectAll('.count-title')
		    .transition()
		    .duration(600)
		    .attr('opacity', 1.0);
	}

	function showGrid() {
		g.selectAll('.count-title')
		   	.transition()
		    .duration(0)
		    .attr('opacity', 0);
		g.selectAll('.square')
		    .transition()
		    .duration(600)
		    .delay(function (d) {
		    	return 5 * d.row;
		    })
		    .attr('opacity', 1.0)
		    .attr('fill', '#ddd');
	}

	function highlightGrid() {
		g.selectAll('.bar')
		    .transition()
		    .duration(600)
		    .attr('width', 0);
		g.selectAll('.bar-text')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		g.selectAll('.square')
		    .transition()
		    .duration(0)
		    .attr('opacity', 1.0)
		    .attr('fill', '#ddd');
		g.selectAll('.fill-square')
		    .transition('move-fills')
		    .duration(800)
		    .attr('x', function (d) {
		    	return d.x;
		    })
		    .attr('y', function (d) {
		        return d.y;
			});
		g.selectAll('.fill-square')
		    .transition()
		    .duration(800)
		    .attr('opacity', 1.0)
		    .attr('fill', function (d) { return d.filler ? '#008080' : '#ddd'; });
	}

	function getWords(rawData) {
		return rawData.map(function (d, i) {
			d.filler = (d.filler === '1') ? true : false;
			d.time = +d.time;
			d.min = Math.floor(d.time / 60);
		  	d.col = i % numPerRow;
	     	d.x = d.col * (squareSize + squarePad);
	      	d.row = Math.floor(i / numPerRow);
	      	d.y = d.row * (squareSize + squarePad);
	      	return d;
		});
	}
			
	function getFillerWords(data) {
	    return data.filter(function (d) {return d.filler; });
	}
		
	chart.activate = function (index) {
		activeIndex = index;
		var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
	    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
	    scrolledSections.forEach(function (i) {
	      	activateFunctions[i]();
	    });
	    lastIndex = activeIndex;
	};

	chart.update = function (index, progress) {
		updateFunctions[index](progress);
	};
	return chart;
};

function display(data) {
	var plot = scrollVis();
	d3.select('#projects')
		.datum(data)
		.call(plot);
	var scroll = scroller()
		.container(d3.select('body'));
	scroll(d3.selectAll('.step'));
	scroll.on('active', function (index) {
		d3.selectAll('.step')
			.style('opacity', function (d, i) { return i === index ? 1 : 0.1; });
		plot.activate(index);
	});
	scroll.on('progress', function (index, progress) {
		plot.update(index, progress);
	});
}
// load data and display
d3.tsv('data/words.tsv', display);