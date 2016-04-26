import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';

import style from './style.css';

  var wordArray = [{
    word: 'default',
    frequency: 0
  }];

export default class WordFreqArray extends Component {

  constructor(props) {
    super(props)
    this.test = this.test.bind(this);
  }

  test(e) {
    this.props.onChange(e.target.innerHTML);
  }

  componentWillMount() {
    wordArray = this.props.categoryWordCloudData;
  }

  componentWillUpdate() {
    wordArray = this.props.categoryWordCloudData;
  }

  _renderWordList(wordArray) {
    return wordArray.map((result, i) => 
      <tr ref="wordfreq" onClick={ this.test } key={result.text + i}>
        <td className="word-list">
          {result.text}
        </td>
        <td>
          {result.size}
        </td>
      </tr>
    )
  }

  render() {
    return (
      <div className="word-frequency-array">
        <table className="table">
          <tbody>
            { wordArray && this._renderWordList(wordArray) }
          </tbody>
        </table>
      </div>
    );
  }
};