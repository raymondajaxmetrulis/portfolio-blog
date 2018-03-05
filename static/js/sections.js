var scrollVis = function () {
	var width = 766;
	var height = 600;
	var margin = { top: 0, left: 0, bottom: 0, right: 0 };
	
	var lastIndex = -1;
	var activeIndex = 0;
	
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
		
		g.append('text')
			.attr('class', 'about-title')
			.attr('x', 600)
			.attr('y', 550)
			.text('About');
		g.append('svg:image')
			.attr('xlink:href', 'images/me.jpg')
			.attr('class', 'me')
			.attr('x', 47)
			.attr('y', 2);
		g.selectAll('.about-title')
			.attr('opacity', 0);
		g.selectAll('.me')
			.attr('opacity', 0);
		
		g.append('text')
			.attr('class', 'title-one')
			.attr('x', 600)
			.attr('y', 550)
			.text('Instafake');
		g.append('svg:image')
			.attr('xlink:href', 'images/cam.png')
			.attr('class', 'project-one')
			.attr('x', 24)
			.attr('y', 10.5);
		g.selectAll('.title-one')
			.attr('opacity', 0);
		g.selectAll('.project-one')
			.attr('opacity', 0);

		g.append('text')
			.attr('class', 'title-two-a')
			.attr('x', 600)
			.attr('y', 450)
			.text('Petty');
		g.append('text')
			.attr('class', 'title-two-b')
			.attr('x', 600)
			.attr('y', 500)
			.text('Cash');
		g.append('text')
			.attr('class', 'title-two-c')
			.attr('x', 600)
			.attr('y', 550)
			.text('Quest');
		g.append('svg:image')
			.attr('xlink:href', 'images/knight.jpg')
			.attr('class', 'project-two')
			.attr('x', 72);
		g.selectAll('.title-two-a')
			.attr('opacity', 0);
		g.selectAll('.title-two-b')
			.attr('opacity', 0);
		g.selectAll('.title-two-c')
			.attr('opacity', 0);
		g.selectAll('.project-two')
			.attr('opacity', 0);

		g.append('text')
			.attr('class', 'title-three')
			.attr('x', 600)
			.attr('y', 550)
			.text('Cart-o-grapher');
		g.append('svg:image')
			.attr('xlink:href', 'images/logo.jpg')
			.attr('class', 'project-three')
			.attr('y', 6);
		g.selectAll('.title-three')
			.attr('opacity', 0);
		g.selectAll('.project-three')
			.attr('opacity', 0);
	};

	var setupSections = function () {
		activateFunctions[0] = aboutMe;
		activateFunctions[1] = projectOne;
		activateFunctions[2] = projectTwo;
		activateFunctions[3] = projectThree;
		for (var i = 0; i < 4; i++) {
			updateFunctions[i] = function () {};
		}
	};

	function aboutMe() {
		g.selectAll('.title-one')
		    .transition()
		    .duration(0)
			.attr('opacity', 0);
		g.selectAll('.project-one')
		    .transition()
		    .duration(0)
			.attr('opacity', 0);
		g.selectAll('.about-title')
			.transition()
		    .duration(1000)
		    .attr('opacity', 1.0);
		g.selectAll('.me')
			.transition()
		    .duration(4000)
		    .attr('opacity', 1.0);
	}

	function projectOne() {
		g.selectAll('.about-title')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		g.selectAll('.me')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		g.selectAll('.title-two-a')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		g.selectAll('.title-two-b')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		g.selectAll('.title-two-c')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		g.selectAll('.project-two')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		g.selectAll('.title-one')
		    .transition()
		    .duration(1000)
		    .attr('opacity', 1.0);
		g.selectAll('.project-one')
		    .transition()
		    .duration(1000)
		    .attr('opacity', 1.0);
	}

	function projectTwo() {
		g.selectAll('.title-one')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		g.selectAll('.project-one')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		g.selectAll('.title-three')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		g.selectAll('.project-three')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		g.selectAll('.title-two-a')
		    .transition()
		    .duration(1000)
		    .attr('opacity', 1.0);
		g.selectAll('.title-two-b')
		    .transition()
		    .duration(1000)
		    .attr('opacity', 1.0);
		g.selectAll('.title-two-c')
		    .transition()
		    .duration(1000)
		    .attr('opacity', 1.0);
		g.selectAll('.project-two')
		    .transition()
		    .duration(1000)
		    .attr('opacity', 1.0);
	}

	function projectThree() {
		g.selectAll('.title-two-a')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		g.selectAll('.title-two-b')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		g.selectAll('.title-two-c')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		g.selectAll('.project-two')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		g.selectAll('.title-three')
		    .transition()
		    .duration(1000)
		    .attr('opacity', 1.0);
		g.selectAll('.project-three')
		    .transition()
		    .duration(1000)
		    .attr('opacity', 1.0);
	}

	function getWords(rawData) {
		return rawData.map(function (d) {
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

d3.tsv('data/words.tsv', display);