import d3 from 'd3';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import d3tip from 'd3-tip';


export default class WritingStyle extends Component {

    graph(node) {
        var div = d3.select(node);
        div.select('svg').remove();
        // console.log("inside graph");
        // console.log(this.props);

        var data = [{type: 'Analytical' ,value: this.props.analytical*100}, 
                    {type: 'Confidence', value: this.props.confident*100}, 
                    {type: 'Tentative', value: this.props.tentative*100}];

        var colors = ["#d62728", "#9467bd", "#2ca02c", "#FFB000"];

        var margin = {top: 40, right: 20, bottom: 30, left: 40},
            width = 300 - margin.left - margin.right,
            height = 173 - margin.top - margin.bottom;

        var formatPercent = d3.format("%");

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
            .range([0, height]);

        var svg = d3.select(node).append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);
          svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(data.map(function(d) { return d.type; }));
        y.domain([100, 0]);

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .style('fill', function(d, i){
              return colors[i];
            })
            .attr("x", function(d) { return x(d.type); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); })
    }
    componentWillMount() {
        console.log("writingstyle: will mount")
    }
    componentDidMount() {
        console.log("writingstyle: did mount")
    }
    componentWillUpdate() {
        console.log("writingstyle: will update")
    }
    componentDidUpdate() {
        console.log("writingstyle: did update")
        // console.log(d3.select(this.refs.barGraph).append('svg').attr("height", "200").attr("width", "200"))
        this.graph(this.refs.barGraph);
    }
    componentWillUnmount() {
        console.log("writingstyle: will unmount")
    }

  render() {
    return <div ref="barGraph" id="barGraph">Hello</div>;
  };
};
