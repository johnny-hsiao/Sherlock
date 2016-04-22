import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';

import style from './style.css';


var wordArray = [
  {
    word: 'default',
    frequency: 33
  },
  {
    word: 'default',
    frequency: 33
  },
  {
    word: 'default',
    frequency: 33
  },
  {
    word: 'default',
    frequency: 33
  },
  {
    word: 'default',
    frequency: 33
  },
  {
    word: 'default',
    frequency: 33
  },
  {
    word: 'default',
    frequency: 33
  },
  {
    word: 'default',
    frequency: 33
  },
  {
    word: 'default',
    frequency: 33
  },
];


export default class WordFreqArray extends Component {

  render() {
    return (
      <div className="word-frequency-array">
        <table className="table">
          {wordArray.map((result, i) =>
            <tr key={result.word + i}>
              <td className="word-list">
                {result.word}
              </td>
              <td>
                {result.frequency}
              </td>
            </tr>
          )}
        </table>
      </div>
    );
  }
};