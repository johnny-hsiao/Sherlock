function getFrequency(content){
  var sWords = content.toLowerCase().trim().replace(/[,;.]/g,'').split(/[\s\/]+/g).sort();
  var iWordsCount = sWords.length; // count w/ duplicates

  // array of words to ignore
  var ignore = ["the","of","and","a","to","in","is","you","that","it","he","was","for","on","are","as",
  "with","his","they","I","i","at","be","this","have","from","or","one","had","by","word","but","not","what",
  "all","were","we","when","your","can","said","there","use","an","each","which","she","do","how","their",
  "if","will","up","other","about","out","many","then","them","these","so","some","her","would","make",
  "like","him","into","time","has","look","two","more","write","go","see","no","way","could",
  "my","than","first","been","call","who","its","now","find","long","down","day",
  "did","get","come","made","may","part", "","1","2","3","4","5","6","7","8","9","0"];

  ignore = (function(){
    var o = {}; // object prop checking > in array checking
    var iCount = ignore.length;
    for (var i=0;i<iCount;i++){
      o[ignore[i]] = true;
    }
    return o;
  }());

  var counts = {}; // object for math
  for (var i=0; i<iWordsCount; i++) {
    var sWord = sWords[i];
    if (!ignore[sWord]) {
      counts[sWord] = counts[sWord] || 0;
      counts[sWord]++;
    }
  }

  var arr = []; // an array of objects to return
  for (sWord in counts) {
    arr.push({
      text: sWord,
      size: counts[sWord]
    });
  }

  // sort array by descending size | http://stackoverflow.com/a/8837505
  var results = arr.sort(function(a,b){
    return (a.size > b.size) ? -1 : ((a.size < b.size) ? 1 : 0);
  });

  // function displayKeywordFrequency(results){
  //   var iWordsCount = results.length; // count w/o duplicates
  //   for (var i=0; i<iWordsCount; i++) {
  //     var word = results[i];
  //     //console.log(word);
  //   }
  // };

  // displayKeywordFrequency(results);

  return results
};

module.exports = getFrequency;