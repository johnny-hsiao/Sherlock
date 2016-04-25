import d3 from 'd3';
import d3tip from 'd3-tip';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import style from  './style.css';


export default class Social extends Component {

  socialGraph (node, props) {

    var div = d3.select(node);
    div.select('svg').remove();

    var data = [{ type: 'Openness' ,value: props.openness }, 
                    { type: 'Concientiousness', value: props.conscientiousness }, 
                    { type: 'Extraversion', value: props.extraversion },
                    { type: 'Agreeableness', value: props.agreeableness },
                    { type: 'Emotional Range', value: props.emotional_range }];


    var colors = ["#fdae6b", "#74c476", "#6baed6", "#9e9ac8", "#9edae5"];

    var margin = {top: 5, right: 0, bottom: 0, left: 0},
        width = 500,
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
          .attr("viewBox", "0 0 650 225")
      .append("g")
        .attr("transform", "translate(50,10)");


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
        .attr("x", function(d) { return x(d.type); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);


      function type(d) {
        d.frequency = +d.frequency;
        return d;
      }
  }

  // componentWillMount() {
  //   console.log("socialgraph: will mount")
  // }
  componentDidMount() {
    console.log("socialgraph: did mount")
    this.socialGraph(this.refs.social, this.props);
  }
  // componentWillUpdate() {
  //   console.log("socialgraph: will update")
  // }
  componentDidUpdate() {
    console.log("socialgraph: did update");
    this.socialGraph(this.refs.social, this.props);
  }
  // componentWillUnmount() {
  //   console.log("socialgraph: will unmount")
  // }

  render () {
    return <div ref="social" ></div>;
  }
}

