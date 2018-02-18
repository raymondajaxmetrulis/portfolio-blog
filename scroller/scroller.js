var d3 = require("d3");

function scroller() {
  var container = d3.select('#body');
  // // active refers to the element in the viewport
  var dispatch = d3.dispatch('active', 'progress');
  // // all text sections that are scrolled through
  var sections = null;
  // // x coordinates
  var sectionPositions = [];
  var currentIndex = -1;
  var containerStart = 0;
  // // constructor func monitors els, a d3 selection of scrollable elements
  function scroll(els) {
    sections = els;
    // when window is scrolled call position. When it is resized call resize.
    d3.select(window)
      .on('scroll.scroller', position)
      .on('resize.scroller', resize);

    // manually call resize initially to setup scroller.
    resize();

    // // call scroll position once on load
    var timer = d3.timer(function () {
      position();
      timer.stop();
    });
  }

  // // resize resets sectionPositions
  function resize() {
    // // each position relative to top of first
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
  // // if scroll, get user position, dispatch active event
  function position() {
    // // pos: users current page position. pageXOffset: current horizontal position. Offset by 10.
    var pos = window.pageXOffset - 10 - containerStart;
    // // d3.bisect pulls sectionPosition array value to the right of pos. 
    // // Ex. var arr = [2, 5, 10] 
    // // d3.bisect(arr, 4)
    // // returns index of 1
    var sectionIndex = d3.bisect(sectionPositions, pos);
    // // ensure index does not go one past the length of array
    sectionIndex = Math.min(sections.size() - 1, sectionIndex);

    if (currentIndex !== sectionIndex) {
      dispatch.call('active', this, sectionIndex);
      currentIndex = sectionIndex;
    }
    // // Where user has scrolled within a section for within-section visualizations
    var prevIndex = Math.max(sectionIndex - 1, 0);
    var prevLeft = sectionPositions[prevIndex];
    var progress = (pos - prevLeft) / (sectionPositions[sectionIndex] - prevLeft);
    dispatch.call('progress', this, currentIndex, progress);
  }

  // // get/set parent element of sections, for if scrolling doesn't start at top of the page
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