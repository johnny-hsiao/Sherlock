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
    this._updateCurrentWord = this._updateCurrentWord.bind(this);
  }

  _updateCurrentWord(e) {
    this.props.onChange(e.target.innerHTML);
  }

  componentWillMount() {
    wordArray = this.props.wordFreqList;
  }

  componentWillUpdate() {
    wordArray = this.props.wordFreqList;
  }

  _renderWordList(wordArray) {
    return wordArray.map((result, i) => 
      <tr ref="wordfreq" onClick={ this._updateCurrentWord } key={result.text + i}>
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