import d3 from 'd3';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import style from  './style.css';

export default class Social extends Component {

  socialGraph (node, props) {
    var data = [{ type: 'Openness' ,value: props.openness }, 
                { type: 'Concientiousness', value: props.conscientiousness }, 
                { type: 'Extraversion', value: props.extraversion },
                { type: 'Agreeableness', value: props.agreeableness },
                { type: 'Emotional Range', value: props.emotional_range }];

    var div = d3.select(node);
    div.select('svg').remove();

    var colors = ["#fdae6b", "#74c476", "#6baed6", "#9e9ac8", "#9edae5"];

    var margin = {top:0, right: 0, bottom: 0, left:0 },
      width = 299 - margin.left - margin.right,
      height = 173 - margin.top - margin.bottom;

    // D3 scales = just math
    // x is a function that transforms from "domain" (data) into "range" (usual pixels)
    // domain gets set after the data loads
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    // D3 Axis - renders a d3 scale in SVG
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "%");

    // create an SVG element (appended to body)
    // set size
    // add a "g" element (think "group")
    // annoying d3 gotcha - the 'svg' variable here is a 'g' element
    // the final line sets the transform on <g>, not on <svg>
    var svg = d3.select(node).append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-86 0 421 200")
        .attr("width", '100%' )
        .attr("height", height)
        .classed("svg-content-responsive", true)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    function draw(data) {
      // measure the domain (for x, unique types) (for y [0,maxvalue])
      // now the scales are finished and usable
      x.domain(data.map(function(d) { return d.type; }));
      y.domain([0, d3.max(data, function(d) { return d.value; })]);

      // another g element, this time to move the origin to the bottom of the svg element
      // someSelection.call(thing) is roughly equivalent to thing(someSelection[i])
      //   for everything in the selection\
      // the end result is g populated with text and lines!
      svg.select('.x.axis').transition().duration(300).call(xAxis);

      // same for yAxis but with more transform and a title
      svg.select(".y.axis").transition().duration(300).call(yAxis);

      // THIS IS THE ACTUAL WORK!
      var bars = svg.selectAll(".bar").data(data, function(d) { return d.type; });// (data) is an array/iterable thing, second argument is an ID generator function

      bars.exit()
        .transition()
          .duration(300)
        .attr("y", y(0))
        .attr("height", height - y(0))
        .style('fill-opacity', 1e-6)
        .remove();

      // data that needs DOM = enter() (a set/selection, not an event!)
      bars.enter().append("rect")
        .attr("fill", function (d, i) {
          return colors[i];
        })
        .attr("y", y(0))
        .attr("height", height - y(0));

      // the "UPDATE" set:
      bars.transition().duration(500).attr("x", function(d) { return x(d.type); }) // (d) is one item from the data array, x is the scale object from above
        .attr("width", x.rangeBand()) // constant, so no callback function(d) here
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); }); // flip the height, because y's domain is bottom up, but SVG renders top down
    }

    draw(data);
  }
  
  componentWillMount() {
    console.log("socialgraph: will mount")
  }
  componentDidMount() {
    console.log("socialgraph: did mount")
    this.socialGraph(this.refs.social, this.props);
  }
  componentWillUpdate() {
    console.log("socialgraph: will update")
  }
  componentDidUpdate() {
    console.log("socialgraph: did update");
    this.socialGraph(this.refs.social, this.props);
  }
  componentWillUnmount() {
    console.log("socialgraph: will unmount")
  }

  render () {
    return <div ref="social" ></div>;
  }
}

