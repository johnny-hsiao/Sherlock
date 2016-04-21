import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Anger from './Anger';
import Disgust from './Disgust';
import Fear from './Fear';
import Joy from './Joy';
import Sadness from './Sadness';


export default class EmotionGraphs extends Component {


  render() {

    console.log(this.state);
    return (
      <div>
        <div id="anger" className="col-xs-2" height="173">
          <Anger {...this.props} />
        </div>
        <div id="disgust" className="col-xs-2" height="173">
          <Disgust />
        </div>
        <div id="fear" className="col-xs-2" height="173">
          <Fear />
        </div>
        <div id="joy" className="col-xs-2" height="173">
          <Joy />
        </div>
        <div id="sadness" className="col-xs-2" height="173">
          <Sadness />
        </div>
      </div>
    );
  }
}



