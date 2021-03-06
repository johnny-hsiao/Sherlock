import d3 from 'd3';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import d3tip from 'd3-tip';
import style from './style.css';


export default class WritingStyle extends Component {

  writingGraph(node, props) {
    var div = d3.select(node);
    div.select('svg').remove();

    var data = [{ type: 'Analytical' ,value: props.analytical }, 
                { type: 'Confidence', value: props.confident }, 
                { type: 'Tentative', value: props.tentative }];

    var colors = ["#969696", "#de9ed6", "#9c9ede"];

    var margin = {top: 10, right: 0, bottom: 0, left: 0},

      width = 350,
      height = 173 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");


    var tip = d3tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<span style='color:white'>" + Math.round(d.value) + "%</span>";
    });

    var svg = d3.select(node).append("svg")
        .attr("viewBox", "0 0 455 225")
        .append("g")
        .attr("transform", "translate(52,10)");

    svg.call(tip);


    x.domain(data.map(function(d) { return d.type; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,175)")
        .call(xAxis);


    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("fill", function(d, i){
          return colors[i];
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)        
        .attr("x", function(d) { return x(d.type); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", 0)
        .transition()
        .duration(900)
        .attr("height", function(d) { return height - y(d.value); });

        svg.selectAll(".bar").on('mouseover', tip.show)
        .on('mouseout', tip.hide)

      function type(d) {
        d.value = +d.value;
        return d;
      }
  }

  // componentWillMount() {
  //   console.log("writingstyle: will mount")
  // }
  componentDidMount() {
    // console.log("writingstyle: did mount")
    this.writingGraph(this.refs.barGraph, this.props);
  }
  // componentWillUpdate() {
  //   console.log("writingstyle: will update")
  // }
  componentDidUpdate() {
    // console.log("writingstyle: did update")
    this.writingGraph(this.refs.barGraph, this.props);
  }
  // componentWillUnmount() {
  //   console.log("writingstyle: will unmount")
  // }

  render() {
    // console.log("render writingstyle", this.props.analytical)
    return <div ref="barGraph"></div>;
  };
};
