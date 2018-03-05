function scroller() {
	var container = d3.select('#body');
	var dispatch = d3.dispatch('active', 'progress');
	
	var sections = null;

	var sectionPositions = [];
	var currentIndex = -1;
	var containerStart = 0;
	
	function scroll(els) {
		sections = els;
		
		d3.select(window)
		  .on('scroll.scroller', position)
		  .on('resize.scroller', resize);

		resize();

		var timer = d3.timer(function () {
			position();
			timer.stop();
		});
	}

	function resize() {
		sectionPositions = [];
		var startPos;
		sections.each(function (d, i) {
			var left = this.getBoundingClientRect().left;
			if (i === 0) {
			   	startPos = left;
			}
			sectionPositions.push(left - startPos);
		});
		containerStart = container.node().getBoundingClientRect().left + window.pageXOffset;
	}	

	function position() {
		var pos = window.pageXOffset - 400 - containerStart;
		var sectionIndex = d3.bisect(sectionPositions, pos);
		sectionIndex = Math.min(sections.size() - 1, sectionIndex);

		if (currentIndex !== sectionIndex) {
			dispatch.call('active', this, sectionIndex);
			currentIndex = sectionIndex;
		}
		
		var prevIndex = Math.max(sectionIndex - 1, 0);
		var prevLeft = sectionPositions[prevIndex];
		var progress = (pos - prevLeft) / (sectionPositions[sectionIndex] - prevLeft);
		dispatch.call('progress', this, currentIndex, progress);
	}

	scroll.container = function (value) {
		if (arguments.length === 0) {
			return container;
		}
		container = value;
		return scroll;
	};

	scroll.on = function (action, callback) {
		dispatch.on(action, callback);
	};

	return scroll;
}
			