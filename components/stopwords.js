var stopWords = ["a","about","above","above","across","after","afterwards","again","against","all","almost","alone","along",
"already","also","although","always","am","among","amongst","amoungst","amount","an","and","another","any","anyhow","anyone",
"anything","anyway","anywhere","are","around","as","at","back","be","became","because","become","becomes","becoming","been",
"before","beforehand","behind","being","below","beside","besides","between","beyond","bill","both","bottom","but","by","call",
"can","cannot","cant","co","con","could","couldnt","cry","de","describe","detail","do","done","down","due","during","each",
"eg","eight","either","eleven","else","elsewhere","empty","enough","etc","even","ever","every","everyone","everything",
"everywhere","except","few","fifteen","fify","fill","find","fire","first","five","for","former","formerly","forty","found",
"four","from","front","full","further","get","give","go","had","has","hasnt","have","he","hence","her","here","hereafter",
"hereby","herein","hereupon","hers","herself","him","himself","his","how","however","hundred","ie","if","in","inc","indeed",
"interest","into","is","it","its","itself","keep","last","latter","latterly","least","less","ltd","made","many","may","me",
"meanwhile","might","mill","mine","more","moreover","most","mostly","move","much","must","my","myself","name","namely",
"neither","never","nevertheless","next","nine","no","nobody","none","noone","nor","not","nothing","now","nowhere","of",
"off","often","on","once","one","only","onto","or","other","others","otherwise","our","ours","ourselves","out","over","own",
"part","per","perhaps","please","put","rather","re","same","see","seem","seemed","seeming","seems","serious","several","she",
"should","show","side","since","sincere","six","sixty","so","some","somehow","someone","something","sometime","sometimes",
"somewhere","still","such","system","take","ten","than","that","the","their","them","themselves","then","thence","there",
"thereafter","thereby","therefore","therein","thereupon","these","they","thickv","thin","third","this","those","though",
"three","through","throughout","thru","thus","to","together","too","top","toward","towards","twelve","twenty","two","un",
"under","until","up","upon","us","very","via","was","we","well","were","what","whatever","when","whence","whenever","where",
"whereafter","whereas","whereby","wherein","whereupon","wherever","whether","which","while","whither","who","whoever","whole",
"whom","whose","why","will","with","within","without","would","yet","you","your","yours","yourself","yourselves","the"]


var currentList = ["the","and","you","that","was","for","are","with","his","they","this","have","from","one","had","word",
  "but","not","what","all","were","when","your","can","said","there","use","each","which","she","how","their",
  "will","other","about","out","many","then","them","these","some","her","would","make","like","him","into",
  "time","has","look","two","more","write","see","way","could","than","first","been","call","who","its","now","find","long",
  "down","day","did","get","come","made","may","part","2015","2016","title","div","our","most","after","before",
  "later","over","away","just","while","ever","already","off","youre","january","february","march","april",
  "may","june","july","august","september","october","november","december","jan","feb","mar","apr","jun","jul","aug","sept",
  "oct","nov","dec","monday","tuesday","wednesday","thursday","friday","saturday","sunday","mon","tues","wed","thurs","fri","sat",
  "should","would","could","only","here","wouldnt","going","est","using","got","put","hes","didnt","think","likely","years","front",
  "page","loading","above","above","across","afterwards","again","against","almost","alone","along","also","although","always",
  "among","amongst","amoungst","amount","another","any","anyhow","anyone","anything","anyway","anywhere","around","back","became",
  "because","become","becomes","becoming","beforehand","behind","being","below","beside","besides","between","beyond",
  "bill","both","bottom","cannot","cant","con","couldnt","cry","describe","detail","done","due","during","eight","either",
  "eleven","else","elsewhere","empty","enough","etc","even","every","everyone","everything","everywhere","except","few",
  "fifteen","fify","fill","fire","five","former","formerly","forty","found","four","full","further","give","hasnt","hence",
  "hereafter","hereby","herein","hereupon","hers","herself","himself","however","hundred","inc","indeed","interest","itself",
  "keep","last","latter","latterly","least","less","ltd","meanwhile","might","mill","mine","moreover","mostly","move",
  "much","must","myself","name","namely","neither","never","nevertheless","next","nine","nobody","none","noone","nor",
  "nothing","nowhere","often","once","onto","others","otherwise","ours","ourselves","own","per","perhaps","please","rather",
  "same","seem","seemed","seeming","seems","serious","several","show","side","since","sincere","six","sixty","somehow",
  "someone","something","sometime","sometimes","somewhere","still","such","system","take","ten","themselves","thence",
  "thereafter","thereby","therefore","therein","thereupon","thickv","thin","third","those","though","three","through",
  "throughout","thru","thus","together","too","top","toward","towards","twelve","twenty","under","until","upon","very",
  "via","well","whatever","whence","whenever","where","whereafter","whereas","whereby","wherein","whereupon","wherever",
  "whether","whither","whoever","whole","whom","whose","why","within","without","yet","yours","yourself","yourselves"]

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

var newList = [];
stopWords.forEach(function (word) {
  console.log(word, isInArray(word, currentList));
  if (!isInArray(word, currentList) && word.length > 2) {
    newList.push(word);
  }
});
console.log(newList);