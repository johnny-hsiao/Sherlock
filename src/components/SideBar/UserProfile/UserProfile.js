import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import ProfileImage from './ProfileImage';

export default class UserProfile extends Component {
  render() {
    return (
      <div>
        <ProfileImage />
        <h5 className="welcome-message"><strong>Welcome,</strong> Ditty</h5>
      </div>
    );
  };
};
