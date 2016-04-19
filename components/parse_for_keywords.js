function parseForKeywords(content){
  var sWords = content.toLowerCase().trim().replace(/[0123456789!@#$%^&*()_+=\-?.,:;"'{}\\|`~\/\]\[—><’“”]/g,'').split(/[\s\/]+/g).sort();
  var iWordsCount = sWords.length; // count w/ duplicates

  // array of words to ignore
  var ignore = ["the","and","you","that","was","for","are","with","his","they","this","have","from","one","had","word",
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
  "whether","whither","whoever","whole","whom","whose","why","within","without","yet","yours","yourself","yourselves",
  "don’t","name","people","it’s","know","new","jesus","fuck","fucking","doesn’t","want","say","really","sure","that’s",
  "far","best","worst","better","worse","maybe","posts","things","thing","middle","good","began","can’t","lots","role",
  "i’m","year","actually","agree","believe","important","isn’t","probably","tell","little","issue","great","man","bad",
  "does","comes","need","changes","you’re","i’ve","location","men","learn","learning","twitter","tweet","tweets","dont",
  "thats","theres","lot","different","used","var","doesnt","big","hard","yes","isnt","theyre","low","quite","start","read",
  "obj","endobj","space","data","students","student","percent","institutions","plan","sports","sport","team","teams",
  "season","seasons","width","million","null","true","false","rsh","week","video","height","end","tbd","points","espn",
  "fpa","block","rating","divnewspredictions","display","rgba","background","pxpx","color","font","says","job","pay",
  "median","base","edt","overall","financial","market","markets","list","ago","right","abs","left","buzzfeed",
  "help","likes","like","companies","company","news","information","score","scores","llc","user","users","mccrory",
  "work","youtube","technology","human","smaller","small","software","life","facebook","model","makes","went",
  "file","tech","email","experience","case","key","lab","problem","home","messenger","range","try","doing","having",
  "age","click","game","games","free","ways","site","pingback","value","tool","reading","training","idea","staff",
  "fairhaven","structure","cash","based","problems","able","school","schools","teacher","teachers","kids","kid",
  "point","ask","focus","program","education","helps","media","play","available"];

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
    if (sWord.length > 2 && !ignore[sWord]) {
      counts[sWord] = counts[sWord] || 0;
      counts[sWord]++;
    }
  }

  var arr = []; // an array of objects to return
  for (sWord in counts) {
    arr.push({
      text: sWord,
      frequency: counts[sWord]
    });
  }

  // sort array by descending frequency | http://stackoverflow.com/a/8837505
  var results = arr.sort(function(a,b){
    return (a.frequency > b.frequency) ? -1 : ((a.frequency < b.frequency) ? 1 : 0);
  });

  return results
};

module.exports = parseForKeywords;