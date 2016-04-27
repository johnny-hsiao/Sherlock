import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import style from './style.css';

export default class ProfileImage extends Component {
  render() {
    return (
      <div className="profile-image">
        <img id="profile_image" src={ '../../../assets/images/blue.jpg' }/>
      </div>
    );
  };
};
