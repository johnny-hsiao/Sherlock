import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';

import AccountsView from './TwitterAccounts/AccountsView';
import UserProfile from './UserProfile/UserProfile';
// import style from './style.css';

export default class SideBar extends Component {
  render() {
    return (
      <div>
        <UserProfile />
        <AccountsView />
      </div>
    );
  }
}
