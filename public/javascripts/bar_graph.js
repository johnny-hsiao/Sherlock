$.getJSON('/articles/1000')
.then(function(article) {

var writingTone = JSON.parse(article[0].writingTone);
var analytical = writingTone[0].score;
var confident = writingTone[1].score;
var tentative = writingTone[2].score;

var data = [{type: 'Analytical' ,value: analytical * 100}, {type: 'Confidence', value: confident * 100}, {type: 'Tentative', value: tentative * 100}];

var colors = ["#d62728", "#9467bd", "#2ca02c", "#FFB000"];

var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format("%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([100, height]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");



var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong></strong> <span style='color:white'>" + Math.round(d.value) + "%</span>";
  })

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);


  x.domain(data.map(function(d) { return d.type; }));
  y.domain([100, 0]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

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
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

});

function type(d) {
  d.value = +d.value;
  return d;

}