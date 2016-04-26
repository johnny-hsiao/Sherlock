import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import style from './style.css';

export default class ProfileImage extends Component {
  render() {
    return (
      <div className="profile-image">
        <img id="profile_image" src={ 'http://orig14.deviantart.net/8159/f/2011/132/7/5/smurf_by_n1mr0d-d3g6uc4.jpg' }/>
      </div>
    );
  };
};
