var frequency_list = [];
$.getJSON('/keywords', function() {

}).then(function(data) {
        data.forEach(function(keyword) {
        // console.log(keyword.word, keyword.frequency);
            frequency_list.push({text: keyword.word, size: keyword.frequency * 2})
        })
        console.log('im inside')
        // console.log(arguments);
        console.log(frequency_list)
        generateWordle(frequency_list);
    }
)


// var frequency_list = [{"text":"study","size":40},{"text":"motion","size":15}];

var generateWordle = function (frequency_list) {

    var color = d3.scale.linear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])

            .range(["#ff5b00", "#ff7900", "#ffb000", "#ffce00", "#003dff", "#0068ff", "#0092ff", "#00aaff", "#00cfff"]);

    d3.layout.cloud().size([800, 300])
            .words(frequency_list)
            .rotate(0)
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

    function draw(words) {
        d3.select(".svg").append("svg")
                .attr("width", 1000)
                .attr("height", 350)
                .attr("class", "wordcloud")
                .append("g")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                .attr("transform", "translate(320,200)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("fill", function(d, i) { return color(i); })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
    }
}