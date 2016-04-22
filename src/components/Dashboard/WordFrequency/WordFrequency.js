import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import WordFreqArray from './WordFreqArray';

import style from './style.css';

export default class WordFrequency extends Component {

  render() {
    return (
      <div>
        <h5 className="word-frequency-title"> Word Frequency </h5>
        <WordFreqArray />
      </div>
    );
  }
};