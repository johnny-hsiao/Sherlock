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
      categoryArticleListData: undefined,

      currentWord: undefined,
      currentArticle: undefined
    }
  }
  componentWillMount() {
    console.log("dashboard: will mount");
  }

  componentWillUpdate() {
    console.log("dashboard: will update");

  }

  componentDidUpdate() {
    console.log("dashboard: did update")
    this._categoryLineAPICall();
  }

  componentDidMount() {
    console.log("dashboard: did mount");
    this._articleToneAPICall();
    this._categoryLineAPICall();
    this._categoryCloudAPICall();
    this._categoryArticlesAPICall();
  }

  _articleToneAPICall = () => {
    axios.get('http://127.0.0.1:5000/articles/916')
    .then((res) => {
      this._updateToneGraphs(res.data);
    });
  }

  _categoryLineAPICall = () => {
    if (this.state.currentWord) {
      axios.get(`http://127.0.0.1:5000/categories/3/word_line/${this.state.currentWord}`)
      .then((res) => {
        this._updateLineGraph(res.data.keywords);
      });
    }
  }

  _categoryCloudAPICall = () => {
    axios.get('http://127.0.0.1:5000/categories/3/word_cloud')
    .then((res) => {
      this._updateCategoryCloudData(res.data);
    });
  }

  _categoryArticlesAPICall = () => {
    axios.get('http://127.0.0.1:5000/categories/3/articles')
    .then((res) => {
      this._updateCategoryArticleListData(res.data);
    });
  }

  _updateCurrentWord = (newWord) => {
    console.log(newWord, "set in dashboard")
    this.setState({
      currentWord: newWord
    })
  }

  _updateLineGraph = (keywordData) => {
    if (this.state.currentWord) {
      this.setState({
        currentWord: undefined,
        keywordData: keywordData
      })
    }
  }

  _updateCategoryCloudData = (keywordData) => {
    this.setState({
      categoryWordCloudData: keywordData
    })
  }

  _updateCategoryArticleListData = (articleListData) => {
    this.setState({
      categoryArticleListData: articleListData
    })
  }

  _updateToneGraphs = (article) => {
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
                  <WordFrequency { ...this.state } onChange={ this._updateCurrentWord } />
                  }
            </div>
          </div>

          <div className="row" id="row3">
            <div className="article-list col-xs-12 col-md-3">
              { this.state.categoryArticleListData &&
                <ArticleList { ...this.state } />
              }

            </div>

            <div className="watson-graphs col-xs-12 col-md-9">
              <div className="row graph-1">
                <h5 className="sentiment-title">Sentiment Analysis</h5>
                <div className="emotion-graph col-xs-12">
                  { this.state.anger &&
                  <EmotionGraphs { ...this.state } />
                  }
                </div>
              </div>
              <div className="row graph-2">
                <div className="social-graph col-xs-7">
                  <h5 className="social-title">Social Summary</h5>
                  <div>
                    { this.state.openness &&
                    <SocialGraph { ...this.state } />
                    }
                  </div>
                </div>
                <div className="language-style col-xs-5">
                  <h5 className="language-title">Language Style</h5>
                  <div>
                    { this.state.analytical &&
                    <WritingStyle { ...this.state } />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
