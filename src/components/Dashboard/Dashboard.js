import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import WordCloud from './WordCloud/WordCloud';
import Anger from './EmotionGraphs/Anger';
import FearGraph from './EmotionGraphs/FearGraph';
import JoyGraph from './EmotionGraphs/JoyGraph';
import SadnessGraph from './EmotionGraphs/SadnessGraph';
import DisgustGraph from './EmotionGraphs/DisgustGraph';
import LineGraph from './LineGraph/LineGraph';
import WritingStyle from './WritingStyle/WritingStyle2';
var axios = require('axios');


import style from './style.css';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      analytical: 0,
      confident: 0,
      tentative: 0
    }
    this._updateGraphs = this._updateGraphs.bind(this);
  }
  componentWillMount() {
    console.log("dashboard: will mount")
  }
  
  componentDidMount() {
    console.log("dashboard: did mount");
    axios.get('http://127.0.0.1:5000/articles/1500')
    .then((res) => {
      this._updateGraphs(res.data)

    });
  }


componentWillUpdate() {
    console.log("dashboard: will update")
}
componentDidUpdate() {
    console.log("dashboard: did update")
    // console.log(d3.select(this.refs.barGraph).append('svg').attr("height", "200").attr("width", "200"))
    this.graph(this.refs.barGraph);
}
componentWillUnmount() {
    console.log("dashboard: will unmount")
}


  _updateGraphs(article) {
    let writingTone = JSON.parse(article[0].writingTone)
    console.log(writingTone)
    this.setState({
      analytical: writingTone[0].score,
      confident: writingTone[1].score,
      tentative: writingTone[2].score
    })
  } 

  render() {
    return (
      <div>
        <div className="dashboard-container col-xs-12">
          <div className="row">
            <div className="word-cloud col-xs-12 col-md-12">
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
            </div>

            <div className="watson-graphs col-xs-12 col-md-9">
              <div className="row graph-1">
                <div className="emotion-graph col-xs-12 col-md-12">
                  <div id="anger" className="col-xs-2" height="173">
                    <Anger />
                  </div>

                </div>
              </div>
              <div className="row graph-2">
                <div className="social-graph col-xs-6 col-md-6">
                  <p>SOCIAL GRAPH</p>
                </div>
                <div className="writing-style col-xs-6 col-md-6">
                  <WritingStyle { ...this.state } />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
