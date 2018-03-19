// scroller() finds where user is scrolled 
function scroller() {
	// d3 event dispatching visuals to the #body div
	let container = d3.select('#body');
	let dispatch = d3.dispatch('active', 'progress');
	
	// text sections to accompany d3 vis
	let sections = null;
	// position of text sections by x-coordinates of scroll bar
	let sectionPositions = [];
	let currentIndex = -1;
	let containerStart = 0;
	
	function scroll(els) {
		// call d3 functions when window is scrolled or resized
		sections = els;
		
		d3.select(window)
		  .on('scroll.scroller', position)
		  .on('resize.scroller', resize);

		resize();
		// call scroll once on load
		let timer = d3.timer(function () {
			position();
			timer.stop();
		});
	}

	function resize() {
		// resets section positions
		sectionPositions = [];
		let startPos;
		sections.each(function (d, i) {
			let left = this.getBoundingClientRect().left;
			if (i === 0) {
			   	startPos = left;
			}
			sectionPositions.push(left - startPos);
		});
		containerStart = container.node().getBoundingClientRect().left + window.pageXOffset;
	}	

	function position() {
		// dispatches event if user's current position is different from the last position
		// pageXOffset: current horizontal position. Offset by 400.
		let pos = window.pageXOffset - 400 - containerStart;
		let sectionIndex = d3.bisect(sectionPositions, pos);
		// ensure index does not go one past the length of array
		sectionIndex = Math.min(sections.size() - 1, sectionIndex);

		if (currentIndex !== sectionIndex) {
			dispatch.call('active', this, sectionIndex);
			currentIndex = sectionIndex;
		}
		// Where user has scrolled within a section for within-section visualizations
		let prevIndex = Math.max(sectionIndex - 1, 0);
		let prevLeft = sectionPositions[prevIndex];
		let progress = (pos - prevLeft) / (sectionPositions[sectionIndex] - prevLeft);
		dispatch.call('progress', this, currentIndex, progress);
	}
	// get/set parent element of sections, for if scrolling doesn't start at top of the page
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
			