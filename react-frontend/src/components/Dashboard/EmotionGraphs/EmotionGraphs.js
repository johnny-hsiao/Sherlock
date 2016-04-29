import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Emotion from './Emotion';


export default class EmotionGraphs extends Component {

  // componentWillMount() {
  //   console.log("emotions: will mount");
  // }

  // componentDidMount() {
  //   console.log("emotions: did mount");
  // }

  // componentWillReceiveProps() {
  //   console.log("emotion: will receive props");

  // }

  // componentWillUpdate() {
  //   console.log("emotions: will update");
  // }

  // componentDidUpdate() {
  //   console.log("emotions: did update");
  // }

  render() {
    // console.log("render emotion prop", this.props.anger)
    return (
      <div>
        <div id="anger" className="col-xs-2" height="173">
          <Emotion {...this.props } elementId="anger" emotionScore={ this.props.anger } color="#FF6961" name="Anger" />
        </div>
        <div id="disgust" className="col-xs-2" height="173">
          <Emotion {...this.props } elementId="disgust" emotionScore={ this.props.disgust } color="#77DD77" name="Disgust"/>
        </div>
        <div id="fear" className="col-xs-2" height="173">
          <Emotion {...this.props } elementId="fear" emotionScore={ this.props.fear } color="#CB99C9" name="Fear"/>
        </div>
        <div id="joy" className="col-xs-2" height="173">
          <Emotion {...this.props } elementId="joy" emotionScore={ this.props.joy } color="#FFB347" name="Joy"/>
        </div>
        <div id="sadness" className="col-xs-2" height="173">
          <Emotion {...this.props } elementId="sadness" emotionScore={ this.props.sadness } color="#8EA2EF" name="Sadness"/>
        </div>
      </div>
    );
  }
}
