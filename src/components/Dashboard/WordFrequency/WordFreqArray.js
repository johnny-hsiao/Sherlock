import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';

import style from './style.css';

  var wordArray = [{
    word: 'default',
    frequency: 0
  }];


export default class WordFreqArray extends Component {

  componentWillMount() {
    // var allKeywords = [{text: 'Hello', size: 110},{text: 'Hello', size: 40},{text: 'Hello', size: 110},{text: 'Hello', size: 150},{text: 'Hello', size: 70},{text: 'Hello', size: 180},{text: 'Hello', size: 110},{text: 'Hello', size: 110},{text: 'Hello', size: 40},{text: 'Hello', size: 110},{text: 'Hello', size: 150},{text: 'Hello', size: 70},{text: 'Hello', size: 180},{text: 'Hello', size: 110},{text: 'Hello', size: 110},{text: 'Hello', size: 40},{text: 'Hello', size: 110},{text: 'Hello', size: 150},{text: 'Hello', size: 70},{text: 'Hello', size: 180},{text: 'Hello', size: 110},{text: 'Hello', size: 110},{text: 'Hello', size: 40},{text: 'Hello', size: 110},{text: 'Hello', size: 150},{text: 'Hello', size: 70},{text: 'Hello', size: 180},{text: 'Hello', size: 110},{text: 'Hello', size: 110},{text: 'Hello', size: 40},{text: 'Hello', size: 110},{text: 'Hello', size: 150},{text: 'Hello', size: 70},{text: 'Hello', size: 180},{text: 'Hello', size: 110},{text: 'Hello', size: 110},{text: 'Hello', size: 40},{text: 'Hello', size: 110},{text: 'Hello', size: 150},{text: 'Hello', size: 70},{text: 'Hello', size: 180},{text: 'Hello', size: 110},{text: 'Hello', size: 110},{text: 'Hello', size: 40},{text: 'Hello', size: 110},{text: 'Hello', size: 150},{text: 'Hello', size: 70},{text: 'Hello', size: 180},{text: 'Hello', size: 110},{text: 'Hello', size: 110},{text: 'Hello', size: 40},{text: 'Hello', size: 110},{text: 'Hello', size: 150},{text: 'Hello', size: 70},{text: 'Hello', size: 180},{text: 'Hello', size: 110}];
    wordArray = this.props.categoryWordCloudData;
  }

  componentWillUpdate() {
    // var allKeywords = [{text: 'Hello', size: 110},{text: 'Hello', size: 40},{text: 'Hello', size: 110},{text: 'Hello', size: 150},{text: 'Hello', size: 70},{text: 'Hello', size: 180},{text: 'Hello', size: 110},{text: 'Hello', size: 110},{text: 'Hello', size: 40},{text: 'Hello', size: 110},{text: 'Hello', size: 150},{text: 'Hello', size: 70},{text: 'Hello', size: 180},{text: 'Hello', size: 110},{text: 'Hello', size: 110},{text: 'Hello', size: 40},{text: 'Hello', size: 110},{text: 'Hello', size: 150},{text: 'Hello', size: 70},{text: 'Hello', size: 180},{text: 'Hello', size: 110},{text: 'Hello', size: 110},{text: 'Hello', size: 40},{text: 'Hello', size: 110},{text: 'Hello', size: 150},{text: 'Hello', size: 70},{text: 'Hello', size: 180},{text: 'Hello', size: 110},{text: 'Hello', size: 110},{text: 'Hello', size: 40},{text: 'Hello', size: 110},{text: 'Hello', size: 150},{text: 'Hello', size: 70},{text: 'Hello', size: 180},{text: 'Hello', size: 110},{text: 'Hello', size: 110},{text: 'Hello', size: 40},{text: 'Hello', size: 110},{text: 'Hello', size: 150},{text: 'Hello', size: 70},{text: 'Hello', size: 180},{text: 'Hello', size: 110},{text: 'Hello', size: 110},{text: 'Hello', size: 40},{text: 'Hello', size: 110},{text: 'Hello', size: 150},{text: 'Hello', size: 70},{text: 'Hello', size: 180},{text: 'Hello', size: 110},{text: 'Hello', size: 110},{text: 'Hello', size: 40},{text: 'Hello', size: 110},{text: 'Hello', size: 150},{text: 'Hello', size: 70},{text: 'Hello', size: 180},{text: 'Hello', size: 110}];
    wordArray = this.props.categoryWordCloudData;
  }
  render() {
    console.log("wordfreq array", this.props.categoryWordCloudData);
    return (
      <div className="word-frequency-array">
        <table className="table">
          <tbody>
          {wordArray.map((result, i) =>
            <tr key={result.text + i}>
              <td className="word-list">
                {result.text}
              </td>
              <td>
                {result.size}
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    );
  }
};