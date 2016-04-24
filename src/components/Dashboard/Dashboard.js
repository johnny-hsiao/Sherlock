import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import style from './style.css';
import axios from 'axios';

import WordCloud from './WordCloud/WordCloud';
import EmotionGraphs from './EmotionGraphs/EmotionGraphs';
import LineGraph from './LineGraph/LineGraph';
import SocialGraph from './SocialGraph/SocialGraph';
import WritingStyle from './WritingStyle/WritingStyle';

import WordFrequency from './WordFrequency/WordFrequency';
import ArticleList from './ArticleList/ArticleList';

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
      emotional_range: undefined,

      keywordData: undefined,
      categoryWordCloudData: undefined,
      categoryArticleListData: undefined
    }
    this._updateToneGraphs = this._updateToneGraphs.bind(this);
    this._updateLineGraph = this._updateLineGraph.bind(this);
    this._updateCategoryCloudData = this._updateCategoryCloudData.bind(this);
    this._updateCategoryArticleListData = this._updateCategoryArticleListData.bind(this);

    this._articleToneAPICall = this._articleToneAPICall.bind(this);
    this._categoryLineAPICall = this._categoryLineAPICall.bind(this);
    this._categoryCloudAPICall = this._categoryCloudAPICall.bind(this);
    this._categoryArticlesAPICall = this._categoryArticlesAPICall.bind(this);
  }
  componentWillMount() {
    console.log("dashboard: will mount");
  }

  componentWillUpdate() {
    console.log("dashboard: will update");
  }

  componentDidUpdate() {
    console.log("dashboard: did update")
  }

  _articleToneAPICall() {
    axios.get('http://127.0.0.1:5000/articles/822')
    .then((res) => {
      console.log("inside dashboard", JSON.parse(res.data[0].emotionTone)[0].score);
      this._updateToneGraphs(res.data);
    });
  }

  _categoryLineAPICall() {
    axios.get('http://127.0.0.1:5000/categories/3/word_line/works')
    .then((res) => {
      console.log("inside dashboard line", res.data.keywords);
      this._updateLineGraph(res.data.keywords);
    });
  }

  _categoryCloudAPICall() {
    axios.get('http://127.0.0.1:5000/categories/3/word_cloud')
    .then((res) => {
      console.log("inside dashboard cloud", res.data);
      this._updateCategoryCloudData(res.data);
    });
  }

  _categoryArticlesAPICall() {
    axios.get('http://127.0.0.1:5000/categories/3/articles')
    .then((res) => {
      // console.log("inside dashboard category articles", res.data);
      this._updateCategoryArticleListData(res.data);
    });
  }

  componentDidMount() {
    console.log("dashboard: did mount");
    this._articleToneAPICall();
    this._categoryLineAPICall();
    this._categoryCloudAPICall();
    this._categoryArticlesAPICall();
  }

  _updateLineGraph(keywordData) {
    this.setState({
      keywordData: keywordData
    })
  }

  _updateCategoryCloudData(keywordData) {
    this.setState({
      categoryWordCloudData: keywordData
    })
  }

  _updateCategoryArticleListData(articleListData) {
    this.setState({
      categoryArticleListData: articleListData
    })
  }

  _updateToneGraphs(article) {
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
    return (
      <div>
        <div className="dashboard-container col-xs-12">
          <div className="row">
            <div className="word-cloud svg-container col-xs-12 col-md-12">
              { this.state.categoryWordCloudData &&
                  <WordCloud { ...this.state } />
                  }
            </div>
          </div>

          <div className="row" id="row2">
            <div className="line-graph col-xs-12 col-md-9">
              { this.state.keywordData &&
                  <LineGraph { ...this.state } />
                  }
            </div>

            <div className="word-frequency col-xs-12 col-md-3">
              { this.state.categoryWordCloudData &&
                  <WordFrequency { ...this.state } />
                  }
            </div>
          </div>

          <div className="row" id="row3">
            <div className="article-list col-xs-12 col-md-3">
              { this.state.categoryArticleListData &&
                <ArticleList { ...this.state } />
              }
              <button onClick={ this._articleToneAPICall } >Change state!</button>
              <button onClick={ this._categoryLineAPICall } >Draw line!</button>
              <button onClick={ this._categoryCloudAPICall } >Draw Cloud!</button>
            </div>

            <div className="watson-graphs col-xs-12 col-md-9">
              <div className="row graph-1">
                <div className="emotion-graph col-xs-12 col-md-12">
                  { this.state.anger &&
                  <EmotionGraphs { ...this.state } />
                  }
                </div>
              </div>
              <div className="row graph-2">
                <div className="social-graph col-xs-7 col-md-7">
                  { this.state.openness &&
                  <SocialGraph { ...this.state } />
                  }
                </div>
                <div className="writing-style col-xs-5 col-md-5">
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
