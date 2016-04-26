import index from 'd3.layout.cloud';
import d3 from 'd3';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import style from '../SocialGraph/style.css';

export default class WordCloud extends Component {

  generateWordle(allKeywords, node) {
    var scaledFonts = [];
    // var starting_size = 100;
    // var median_size = allKeywords[allKeywords.length/2].size;
    // console.log(median_size);
    // if(median_size > 100){
    //   starting_size = median_size;
    // } else if(median_size > 50 && median_size < 75){
    //   starting_size = median_size*1.5;
    // } else if(median_size < 50 && allKeywords.length < 50){
    //   starting_size = median_size * 5;
    // } else {
    //   starting_size = 100;
    // }
    if(allKeywords[allKeywords.length/2].size < 30 ){
      allKeywords.forEach(function (keyword) {
        scaledFonts.push({ text: keyword.text.toUpperCase(), size: keyword.size});
      });
    } else {
     allKeywords.forEach(function (keyword) {
        scaledFonts.push({ text: keyword.text.toUpperCase(), size: keyword.size/15});
      });
    }

    var div = d3.select(node);
    div.select('svg').remove();

    var fill = d3.scale.category20();

     index().size([1220, 350])
      .words(scaledFonts)
      .padding(15)
      .rotate(function(d) { return Math.random(); })
      .fontSize(function(d) { return d.size; })
      .on('end', draw)
      .start();

    function draw(words) {
      var origSize = 0;
      d3.select(node).append('svg')
          .attr("preserveAspectRatio", "xMinYMin meet")
          .attr("viewBox", "50 0 1468.5 346")
          .attr("class", "word-cloud-text svg-content-responsive", true)
        .append('g')
          .attr('transform', 'translate(734,175)')
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

  componentDidMount() {
    this.generateWordle(this.props.categoryWordCloudData, this.refs.word_cloud);
  }

  componentDidUpdate() {
    this.generateWordle(this.props.categoryWordCloudData, this.refs.word_cloud);
  }

  render() {
    return <div ref="word_cloud"></div>
  }
}