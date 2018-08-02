var scrollVis = function () {
	// scrollVis() determines what visuals are presented per section index
	var lastIndex = -1;
	var activeIndex = 0;

	var activateFunctions = [];
	var updateFunctions = [];
			  
	var chart = function (selection) {
		selection.each(function (rawData) {
			svg = d3.select(this).selectAll('svg').data([true]);
			// d3 visuals without the data. Single boolean value is the data instead.
			var svgE = svg.enter().append('svg');
			svg = svg.merge(svgE);
			
			setupVis();
			setupSections();
		});
	};
	
	var setupVis = function () {
		// setupVis() creates svg elements with 0 opacity
		svg.append('text')
			.attr('class', 'about-title')
			.text('About');
		svg.append('svg:image')
			.attr('xlink:href', 'images/me.jpeg')
			.attr('class', 'me');
		svg.append('svg:image')
			.attr('xlink:href', 'images/cats.jpg')
			.attr('class', 'cats');
		svg.append('svg:image')
			.attr('xlink:href', 'images/laser.png')
			.attr('class', 'laser');
		svg.selectAll('.about-title')
			.attr('opacity', 0);
		svg.selectAll('.me')
			.attr('opacity', 0);
		svg.selectAll('.cats')
			.attr('opacity', 0);
		svg.selectAll('.laser')
			.attr('opacity', 0);
		
		svg.append('text')
			.attr('class', 'title-one')
			.text('Instafake');
		svg.append('svg:image')
			.attr('xlink:href', 'images/cam.png')
			.attr('class', 'project-one');
		svg.selectAll('.title-one')
			.attr('opacity', 0);
		svg.selectAll('.project-one')
			.attr('opacity', 0);

		svg.append('text')
			.attr('class', 'title-two')
			.text('Petty Cash Quest');
		svg.append('svg:image')
			.attr('xlink:href', 'images/knight.jpg')
			.attr('class', 'project-two');
		svg.selectAll('.title-two')
			.attr('opacity', 0);
		svg.selectAll('.project-two')
			.attr('opacity', 0);

		svg.append('text')
			.attr('class', 'title-three')
			.text('Cart-o-grapher');
		svg.append('svg:image')
			.attr('xlink:href', 'images/logo.jpg')
			.attr('class', 'project-three');
		svg.selectAll('.title-three')
			.attr('opacity', 0);
		svg.selectAll('.project-three')
			.attr('opacity', 0);
	};

	var setupSections = function () {
		// section visuals display ordering from left to right in array
		activateFunctions[0] = aboutMe;
		activateFunctions[1] = projectOne;
		activateFunctions[2] = projectTwo;
		activateFunctions[3] = projectThree;
		for (var i = 0; i < 4; i++) {
			updateFunctions[i] = function () {};
		}
	};
	// 4 img visuals for 4 sections. 
	// Each section's elements become visible 
	// and adjacent elements have opacity reduced to 0.
	function aboutMe() {
		svg.selectAll('.title-one')
		    .transition()
		    .duration(0)
			.attr('opacity', 0);
		svg.selectAll('.project-one')
		    .transition()
		    .duration(0)
			.attr('opacity', 0);
		svg.selectAll('.about-title')
			.transition()
		    .duration(1000)
		    .attr('opacity', 1.0);
		svg.selectAll('.me')
			.transition()
		    .duration(4000)
		    .attr('opacity', 1.0);
		svg.selectAll('.cats')
			.transition()
		    .duration(4500)
		    .attr('opacity', 1.0);
		svg.selectAll('.laser')
			.transition()
		    .duration(5000)
		    .attr('opacity', 1.0);
	}

	function projectOne() {
		svg.selectAll('.about-title')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		svg.selectAll('.me')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		svg.selectAll('.cats')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		svg.selectAll('.laser')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		svg.selectAll('.title-two')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		svg.selectAll('.project-two')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		svg.selectAll('.title-one')
		    .transition()
		    .duration(1000)
		    .attr('opacity', 1.0);
		svg.selectAll('.project-one')
		    .transition()
		    .duration(1000)
		    .attr('opacity', 1.0);
	}

	function projectTwo() {
		svg.selectAll('.title-one')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		svg.selectAll('.project-one')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		svg.selectAll('.title-three')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		svg.selectAll('.project-three')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		svg.selectAll('.title-two')
		    .transition()
		    .duration(1000)
		    .attr('opacity', 1.0);
		svg.selectAll('.project-two')
		    .transition()
		    .duration(1000)
		    .attr('opacity', 1.0);
	}

	function projectThree() {
		svg.selectAll('.title-two')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		svg.selectAll('.project-two')
		    .transition()
		    .duration(0)
		    .attr('opacity', 0);
		svg.selectAll('.title-three')
		    .transition()
		    .duration(1000)
		    .attr('opacity', 1.0);
		svg.selectAll('.project-three')
		    .transition()
		    .duration(1000)
		    .attr('opacity', 1.0);
	}

	chart.activate = function (index) {
		// keep track of current index accordingly as user scrolls 
		// and activate the above functions based on activeIndex
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
	// once data is loaded, display() is ready to call all necessary functions
	// connects ejs elements with the svg elements
	var plot = scrollVis();
	d3.select('#projects')
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

display();