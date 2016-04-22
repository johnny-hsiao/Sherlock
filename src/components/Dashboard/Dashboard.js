import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import WordCloud from './WordCloud/WordCloud';
import EmotionGraphs from './EmotionGraphs/EmotionGraphs';
import LineGraph from './LineGraph/LineGraph';
import SocialGraph from './SocialGraph/SocialGraph';
import WritingStyle from './WritingStyle/WritingStyle';
var axios = require('axios');


import style from './style.css';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      analytical: undefined,
      confident: undefined,
      tentative: undefined,

      anger: undefined,
      disgust: undefined,
      fear: undefined,
      joy: undefined,
      sadness: undefined,
      
      openness: undefined,
      conscientiousness: undefined,
      extraversion: undefined,
      agreeableness: undefined,
      emotional_range: undefined
    }
    this._updateGraphs = this._updateGraphs.bind(this);
    this.apiCall = this.apiCall.bind(this);
  }
  componentWillMount() {
    console.log("dashboard: will mount");
  }


  componentWillUpdate() {
    console.log("dashboard: will update");
    // axios.get('http://127.0.0.1:5000/articles/1043')
    // .then((res) => {
    //   console.log("inside dashboard", JSON.parse(res.data[0].emotionTone)[0].score)
    //   this._updateGraphs(res.data)
   
    // });
  }

  componentDidUpdate() {
      console.log("dashboard: did update")
      // console.log(d3.select(this.refs.barGraph).append('svg').attr("height", "200").attr("width", "200"))
      // this.graph(this.refs.barGraph);

  }

  apiCall() {
    axios.get('http://127.0.0.1:5000/articles/1500')
    .then((res) => {
      console.log("inside dashboard", JSON.parse(res.data[0].emotionTone)[0].score)
      this._updateGraphs(res.data)
    });
  }

  componentDidMount() {
    console.log("dashboard: did mount");
    this.apiCall();

  }

  _updateGraphs(article) {
    let writingTone = JSON.parse(article[0].writingTone);
    let emotionTone = JSON.parse(article[0].emotionTone);
    let socialTone = JSON.parse(article[0].socialTone);
    this.setState({
      analytical: writingTone[0].score * 100,
      confident: writingTone[1].score * 100,
      tentative: writingTone[2].score * 100,

      anger: emotionTone[0].score * 100,
      disgust: emotionTone[1].score * 100,
      fear: emotionTone[2].score * 100,
      joy: emotionTone[3].score * 100,
      sadness: emotionTone[4].score * 100,

      openness: socialTone[0].score * 100,
      conscientiousness: socialTone[1].score * 100,
      extraversion: socialTone[2].score * 100,
      agreeableness: socialTone[3].score * 100,
      emotional_range: socialTone[4].score * 100
    })
  } 

  render() {

    console.log('...', this.state.anger)
    return (
      <div>
        <div className="dashboard-container col-xs-12">
          <div className="row">
            <div className="word-cloud svg-container col-xs-12 col-md-12">
              <WordCloud />
            </div>
          </div>

          <div className="row" id="row2">
            <div className="line-graph col-xs-12 col-md-9">
              <LineGraph />
            </div>

            <div className="word-frequency col-xs-12 col-md-3">
              <p>WORD FREQUENCY</p>
            </div>
          </div>

          <div className="row" id="row3">
            <div className="article-list col-xs-12 col-md-3">
              <p>ARTICLE LIST</p>
              {console.log("before button call", this)}
              <button onClick={ this.apiCall } >Change state!</button>
            </div>

            <div className="watson-graphs col-xs-12 col-md-9">
              <div className="row graph-1">
                <div className="emotion-graph col-xs-12 col-md-12">
                  { this.state.anger &&
                  <EmotionGraphs {...this.state} />
                  }
                </div>
              </div>
              <div className="row graph-2">
                <div className="social-graph col-xs-6 col-md-6">
                  { this.state.openness &&
                  <SocialGraph {...this.state} />
                  }
                </div>
                <div className="writing-style col-xs-6 col-md-6">
                  { this.state.analytical &&
                  <WritingStyle { ...this.state } />
                  }
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
