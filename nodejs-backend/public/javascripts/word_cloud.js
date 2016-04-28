var category_id = 3;

$.getJSON('/categories/' + category_id + '/word_cloud')
.then(function(allKeywords) {
  var keywords = [];

  allKeywords.sort(compare);

  if (allKeywords.length > 100)
    allKeywords = allKeywords.slice(0, 100);

  $('#word_cloud').load(generateWordle(allKeywords)); 
});


// $.getJSON('/keywords')
// .then(function(allKeywords) {
//   var keywords = [];

//   allKeywords.sort(compare);

//   if (allKeywords.length > 100)
//     allKeywords = allKeywords.slice(0, 100);

//   $('#word_cloud').load(generateWordle(allKeywords)); 
// });

var generateWordle = function (keywords) {

    var fill = d3.scale.category20();

     d3.layout.cloud().size([800, 500])
      .words(keywords)
      .padding(15)
      .rotate(function(d) { return Math.random(); })
      .fontSize(function(d) { return d.size/3; })
      .on("end", draw)
      .start();

  function draw(words) {
    var origSize = 0;
    d3.select("#word_cloud").append('svg')
        .attr("width", 800)
        .attr("height", 500)
      .append("g")
        .attr("transform", "translate(400,250)")
      .selectAll("text")
        .data(words)
      .enter().append("text").style("font-weight", "bold")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")"
        })
        .text(function(d) { return d.text; })
        .on('mouseover', function(d){
            d3.select(this)
            .style('font-weight', 'normal')
            .style('font-size' , origSize = d.size+10);
        })
        .on('mouseout', function(d){
            d3.select(this).style('font-weight', 'bold')
             .style('font-size' , origSize = d.size).transition().delay(2000);
        })
  }
   
}

var compare = function (a,b) {
  if (a.size < b.size)
      return 1;
  else if (a.size > b.size)
      return -1;
  else 
      return 0;
}







// // $('#twitter').on('click', function (e) {
// //     function loadWordCloud() {
// $.getJSON('/keywords', function() {})
// .then(function(keywords) {
//     $('#word_cloud').load(generateWordle(keywords));
// });
// //     }

// //     setTimeout(loadWordCloud, 5000);
// // });


// var generateWordle = function (keywords) {

//     var color = d3.scale.linear()
//             .domain([0,1,2,3,4,5,6,10,15,20,100])

//             .range(["#ff5b00", "#ff7900", "#ffb000", "#ffce00", "#003dff", "#0068ff", "#0092ff", "#00aaff", "#00cfff"]);

//     d3.layout.cloud().size([800, 300])
//             .words(keywords)
//             .rotate(0)
//             .fontSize(function(d) { return d.size; })
//             .on("end", draw)
//             .start();

//     function draw(words) {
//         d3.select("#word_cloud").append("svg")
//                 .attr("width", 1000)
//                 .attr("height", 350)
//                 .attr("class", "wordcloud")
//                 .append("g")
//                 // without the transform, words words would get cutoff to the left and top, they would
//                 // appear outside of the SVG area
//                 .attr("transform", "translate(320,200)")
//                 .selectAll("text")
//                 .data(words)
//                 .enter().append("text")
//                 .style("font-size", function(d) { return d.size + "px"; })
//                 .style("fill", function(d, i) { return color(i); })
//                 .attr("transform", function(d) {
//                     return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//                 })
//                 .text(function(d) { return d.text; });
//     }
// };