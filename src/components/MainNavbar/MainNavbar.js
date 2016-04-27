import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from  './style.css';

import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
var Navbar = require('react-bootstrap/lib/NavbarHeader');

export default class MainNavbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a id="navbar-brand" href="#">
        <img alt="Brand" src="../assets/images/sherlock.png" id="brand-image"></img><span id="sherlock-title">Sherlock</span></a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Sign Out</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
