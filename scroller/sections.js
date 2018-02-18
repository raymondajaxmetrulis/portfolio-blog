// var scrollVis = function () {  
//   /**
//    * setupVis - creates initial elements for all
//    * sections of the visualization.
//    *
//    * @param wordData - data object for each word.
//    * @param fillerCounts - nested data that includes
//    *  element for each filler word type.
//    * @param histData - binned histogram data
//    */
//   var setupVis = function (wordData, fillerCounts, histData) {
//     // axis
//     g.append('g')
//       .attr('class', 'x axis')
//       .attr('transform', 'translate(0,' + height + ')')
//       .call(xAxisBar);
//     g.select('.x.axis').style('opacity', 0);

//     // count openvis title
//     g.append('text')
//       .attr('class', 'title openvis-title')
//       .attr('x', width / 2)
//       .attr('y', height / 3)
//       .text('2013');

//     g.append('text')
//       .attr('class', 'sub-title openvis-title')
//       .attr('x', width / 2)
//       .attr('y', (height / 3) + (height / 5))
//       .text('OpenVis Conf');

//     g.selectAll('.openvis-title')
//       .attr('opacity', 0);

//     // count filler word count title
//     g.append('text')
//       .attr('class', 'title count-title highlight')
//       .attr('x', width / 2)
//       .attr('y', height / 3)
//       .text('180');

//     g.append('text')
//       .attr('class', 'sub-title count-title')
//       .attr('x', width / 2)
//       .attr('y', (height / 3) + (height / 5))
//       .text('Filler Words');

//     g.selectAll('.count-title')
//       .attr('opacity', 0);

//     // square grid
//     // @v4 Using .merge here to ensure
//     // new and old data have same attrs applied
//     var squares = g.selectAll('.square').data(wordData, function (d) { return d.word; });
//     var squaresE = squares.enter()
//       .append('rect')
//       .classed('square', true);
//     squares = squares.merge(squaresE)
//       .attr('width', squareSize)
//       .attr('height', squareSize)
//       .attr('fill', '#fff')
//       .classed('fill-square', function (d) { return d.filler; })
//       .attr('x', function (d) { return d.x;})
//       .attr('y', function (d) { return d.y;})
//       .attr('opacity', 0);
//   };
// };