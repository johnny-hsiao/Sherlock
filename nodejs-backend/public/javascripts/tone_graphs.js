$.getJSON('/articles/1500')
.then(function(article) {
  
  var emotionTone = JSON.parse(article[0].emotionTone);
  var anger = emotionTone[0].score * 100;
  var disgust = emotionTone[1].score * 100;
  var fear = emotionTone[2].score * 100;
  var joy = emotionTone[3].score * 100;
  var sadness = emotionTone[4].score * 100;


  var config1 = liquidFillGaugeDefaultSettings();
    config1.circleColor = "#d62728";
    config1.textColor = "#d62728";
    config1.waveTextColor = "#FFFFFF";
    config1.waveColor = "#d62728";
    config1.textVertPosition = 0.5;
    config1.waveAnimateTime = 3000;
  var gauge1 = loadLiquidFillGauge("anger", anger, config1);

  var config2 = liquidFillGaugeDefaultSettings();
    config2.circleColor = "#9467bd";
    config2.textColor = "#9467bd";
    config2.waveTextColor = "#FFFFFF";
    config2.waveColor = "#9467bd";
    config2.textVertPosition = 0.5;
    config2.waveAnimateTime = 3000;
  var gauge2= loadLiquidFillGauge("fear", fear, config2);

  var config3 = liquidFillGaugeDefaultSettings();
    config3.circleColor = "#2ca02c";
    config3.textColor = "#2ca02c";
    config3.waveTextColor = "#FFFFFF";
    config3.waveColor = "#2ca02c";
    config3.textVertPosition = 0.5;
    config3.waveAnimateTime = 3000;
  var gauge3 = loadLiquidFillGauge("disgust", disgust, config3);

  var config4 = liquidFillGaugeDefaultSettings();
    config4.circleColor = "#FFB000";
    config4.textColor = "#FFB000";
    config4.waveTextColor = "#FFFFFF";
    config4.waveColor = "#FFB000";
    config4.textVertPosition = 0.5;
    config4.waveAnimateTime = 3000;
  var gauge4 = loadLiquidFillGauge("joy", joy, config4);

  var config5 = liquidFillGaugeDefaultSettings();
    config5.circleColor = "#1f77b4";
    config5.textColor = "#1f77b4";
    config5.waveTextColor = "#FFFFFF";
    config5.waveColor = "#1f77b4";
    config5.textVertPosition = 0.5;
    config5.waveAnimateTime = 3000;
  var gauge5 = loadLiquidFillGauge("sadness", sadness, config5);

});