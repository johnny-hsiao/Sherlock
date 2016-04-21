import d3 from 'd3';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import style from './style.css';


export default class LineGraph extends Component {
    generateLineGraph(node, graphData) {
        var div = d3.select(node);
        div.select('svg').remove();
        // var sorted = Object.keys(graphData).sort(function (a,b) { return a-b })
        var data = [];
        for (var key in graphData) {
            data.push({ date: graphData[key].date, close: graphData[key].frequency })
        }
        // Set the dimensions of the canvas / graph
        var margin = {top: 30, right: 20, bottom: 30, left: 50},
            width = 600 - margin.left - margin.right,
            height = 270 - margin.top - margin.bottom;

        // Parse the date / time
        var parseDate = d3.time.format("%d-%b-%y").parse;

        // Set the ranges
        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        // Define the axes
        var xAxis = d3.svg.axis().scale(x)
            .orient("bottom").ticks(5);

        var yAxis = d3.svg.axis().scale(y)
            .orient("left").ticks(5);

        // Define the line
        var valueline = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close); });
            
        // Adds the svg canvas
        var svg = d3.select(node)
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", 
                      "translate(" + margin.left + "," + margin.top + ")");

        // Get the data
        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.close = +d.close;

            // console.log("in linegraph", d.date, d.close)
        });

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.close; })]);

        // Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data));

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);


    }

    componentDidUpdate() {
        var allKeywords = [{date: '19-Apr-16', frequency: 5},{date: '20-Apr-16', frequency: 124},{date: '22-Apr-16', frequency: 150},{date: '26-Apr-16', frequency: 124},{date: '29-Apr-16', frequency: 124}];
        this.generateLineGraph(this.refs.line_graph, allKeywords);
    }

    render() {
        return <div ref="line_graph"></div>
    }

}