import d3 from 'd3';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import style from './style.css';
import d3tip from 'd3-tip';

export default class LineGraph extends Component {
    generateLineGraph(node, graphData) {
        var div = d3.select(node);
        div.select('svg').remove();
        // var sorted = Object.keys(graphData).sort(function (a,b) { return a-b })
        var data = [];
        for (var key in graphData) {
            data.push({ date: graphData[key].date, close: graphData[key].frequency });
        }
        console.log(data);
        // Set the dimensions of the canvas / graph
        var margin = {top: 30, right: 20, bottom: 20, left: 85},
            width = 1118 - margin.left - margin.right,
            height = 260 - margin.top - margin.bottom;

        // Parse the date / time
        var parseDate = d3.time.format("%d-%b-%y").parse;

        // Set the ranges
        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);


        // Define the line
        var valueline = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close); });
        var tip = d3tip()
             .attr('class', 'd3-tip')
             .offset([-10, 0])
             .html(function (d) {
             return "<strong>Frequency:</strong> <span style='color:white'>  " + d.close + "</span><div><strong> Date of Article:</strong><span style='color:white'>  " + d.date.toString().slice(0, 10) + "</span></div>";
         });

        // Adds the svg canvas
        var svg = d3.select(node).append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "50 0 1118.5 260")
            .classed("svg-content-responsive", true)
            .append("g")
                .attr("transform", 
                      "translate(" + margin.left + "," + margin.top + ")");
        svg.call(tip);
        // Get the data
        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.close = +d.close;
        });

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.close; })]);

        // Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data));

        svg.selectAll(".circle")
         .data(data)
         .enter()
         .append("svg:circle")
         .attr("class", "circle")
         .attr("cx", function (d, i) {
         return x(d.date);
     })
        .attr("cy", function (d, i) {
         return y(d.close);
     })
        .attr("r", 5)
         .on('mouseover', tip.show)
         .on('mouseout', tip.hide);
        // Add the X Axis

    }

    componentDidMount() {
      this.generateLineGraph(this.refs.line_graph, this.props.keywordData);
    }

    componentDidUpdate() {
      this.generateLineGraph(this.refs.line_graph, this.props.keywordData);
    }

    render() {
      return <div ref="line_graph"></div>;
    }

}
