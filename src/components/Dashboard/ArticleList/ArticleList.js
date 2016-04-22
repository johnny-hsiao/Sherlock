import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import ArticleArray from './ArticleArray';

import style from './style.css';

export default class ArticleList extends Component {

  render() {
    return (
      <div>
        <h5 className="article-title"> Article List </h5>
        <ArticleArray />
      </div>
    );
  }
};