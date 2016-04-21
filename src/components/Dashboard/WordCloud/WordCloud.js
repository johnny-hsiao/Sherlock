import index from 'd3.layout.cloud';
import d3 from 'd3';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';

export default class WordCloud extends Component {

  generateWordle(allKeywords, node) {

      var fill = d3.scale.category20();

       index().size([800, 500])
        .words(allKeywords)
        .padding(15)
        .rotate(function(d) { return Math.random(); })
        .fontSize(function(d) { return d.size/3; })
        .on('end', draw)
        .start();

    function draw(words) {
      var origSize = 0;
      d3.select(node).append('svg')
          .attr('width', 800)
          .attr('height', 500)
        .append('g')
          .attr('transform', 'translate(400,250)')
        .selectAll('text')
          .data(words)
        .enter().append('text').style('font-weight', 'bold')
          .style('font-size', function(d) { return d.size + 'px'; })
          .style('fill', function(d, i) { return fill(i); })
          .attr('text-anchor', 'middle')
          .attr('transform', function(d) {
            return 'translate(' + [d.x, d.y] + ')';
          })
          .text(function(d) { return d.text; })
          .on('mouseover', function(d){
              d3.select(this)
              .style('font-weight', 'normal')
              .style('font-size' , origSize = d.size+10);
          })
          .on('mouseout', function(d) {
              d3.select(this).style('font-weight', 'bold')
               .style('font-size' , origSize = d.size).transition().delay(2000);
          });
    }

  };

  compare (a,b) {
    if (a.size < b.size)
        return 1;
    else if (a.size > b.size)
      return -1;
    else
      return 0;
  };

  componentDidUpdate() {
    var allKeywords = [{text: 'Hello', size: 124},{text: 'Hello', size: 124},{text: 'Hello', size: 124},{text: 'Hello', size: 124},{text: 'Hello', size: 124},{text: 'Hello', size: 124},{text: 'Hello', size: 124},{text: 'Hello', size: 124},{text: 'Hello', size: 124},{text: 'Hello', size: 124},{text: 'Hello', size: 124},{text: 'Hello', size: 124},{text: 'Hello', size: 124},{text: 'Hello', size: 124},{text: 'Hello', size: 124},];
    this.generateWordle(allKeywords, this.refs.word_cloud);
  }

  render() {
    return <div ref="word_cloud"></div>
  }
}