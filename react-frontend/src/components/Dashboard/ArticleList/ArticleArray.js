import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';

import style from './style.css';

let articleArray = [{
  title: 'default'
}];

export default class ArticleArray extends Component {

  constructor(props) {
    super(props)
    this.updateCurrentArticle = this.updateCurrentArticle.bind(this);
  }

  componentWillMount() {
    articleArray = this.props.categoryArticleListData;
  }

  componentWillUpdate() {
    articleArray = this.props.categoryArticleListData;
  }

  updateCurrentArticle(e) {
    let reactid = e.target.getAttribute('data-reactid');
    let articleID = reactid.match(/articleID(\d*)/)[1];

    this.props.onChange(articleID);
  }

  _renderArticleList(articleArray) {
    return articleArray.map((result, i) =>
      <tr key={result.title + "articleID" + result.id} onClick={ this.updateCurrentArticle } >
        <td className="word-list">
          {result.title}
          <br/>
          <br/>
          <span className="glyphicon glyphicon-user" aria-hidden="true"></span> <strong><em>{result.screen_name}</em></strong>
        </td>
      </tr>
    )       
  }

  render() {
    return (
      <div className="article-array">
        <table className="table">
          <tbody>
            { articleArray && this._renderArticleList(articleArray) }
          </tbody>
        </table>
      </div>
    );
  }
};