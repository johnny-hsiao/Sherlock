$.getJSON('/articles/1000')
.then(function(article) {

var writingTone = JSON.parse(article[0].writingTone);
var analytical = writingTone[0].score;
var confident = writingTone[1].score;
var tentative = writingTone[2].score;

var bardata = [analytical * 100, confident * 100, tentative * 100];

var colors = ["#d62728", "#9467bd", "#2ca02c", "#FFB000"]

var yScale = d3.scale.linear()
        .domain([0, d3.max(bardata)])
        .range([0, height]);

var xScale = d3.scale.ordinal()
        .domain(d3.range(0, bardata.length))
        .rangeBands([0, width]);

var height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5;


var myChart = d3.select('#writing').append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .selectAll('rect').data(bardata)
    .enter().append('rect')
        .style('fill', function(d,i) {
            return colors[i];
        })
        .attr('width', width)
        .attr('x', function(d,i) {
            return xScale(i);
        })
        .attr('height', 0)
        .attr('y', height)

    .on('mouseover', function(d) {

        tooltip.transition()
            .style('opacity', .9);

        tooltip.html(d)
            .style('left', (d3.event.pageX - 35) + 'px')
            .style('top',  (d3.event.pageY - 30) + 'px');


        tempColor = this.style.fill;
        d3.select(this)
            .style('opacity', .5)
            .style('fill', 'yellow');
    })

    .on('mouseout', function(d) {
        d3.select(this)
            .style('opacity', 1)
            .style('fill', tempColor);
    });

myChart.transition()
    .attr('height', function(d) {
        return yScale(d);
    })
    .attr('y', function(d) {
        return height - yScale(d);
    })
    .delay(function(d, i) {
        return i * 20;
    })
    .duration(1000)
    .ease('elastic');

});