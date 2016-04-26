import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import style from './style.css';

export default class ProfileImage extends Component {
  render() {
    return (
      <div className="profile-image">
        <img id="profile_image" src={ 'http://www.trbimg.com/img-5588928c/turbine/la-me-ln-sean-diddy-combs-arrested-at-ucla-20150622' }/>
      </div>
    );
  };
};
