import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';

import style from './style.css';

let articleArray = [{
  title: 'default'
}];

export default class ArticleArray extends Component {

  componentWillMount() {
    articleArray = this.props.categoryArticleListData;
  }

  componentWillUpdate() {
    articleArray = this.props.categoryArticleListData;
  }

  render() {
    return (
      <div className="article-array">
        <table className="table">
          <tbody>

          {articleArray.map((result, i) =>
            <tr key={result.title + result.id}>
              <td className="word-list">
                {result.title}
                <br/>
                <br/>
                <span className="glyphicon glyphicon-user" aria-hidden="true"></span> <strong><em>{result.screen_name}</em></strong>
              </td>
            </tr>
          )}
          
          </tbody>
        </table>
      </div>
    );
  }
};