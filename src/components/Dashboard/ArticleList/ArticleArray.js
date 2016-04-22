import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';

import style from './style.css';

var articleArray = [
  {
    article: 'default',
  },
  {
    article: 'default',
  },
  {
    article: 'default',
  },
  {
    article: 'default',
  },
  {
    article: 'default',
  },
  {
    article: 'default',
  },
  {
    article: 'default',
  },
  {
    article: 'default',
  },
  {
    article: 'default',
  },
];


export default class ArticleArray extends Component {

  render() {
    return (
      <div className="article-array">
        <table className="table">
          {articleArray.map((result, i) =>
            <tr key={result.article + i}>
              <td className="word-list">
                {result.article}
              </td>
            </tr>
          )}
        </table>
      </div>
    );
  }
};