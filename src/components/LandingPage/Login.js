import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import style from './style.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };

  }

  _handleChange(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <div className="well clearfix">
        <h5 className="sign-up-title">SIGN UP</h5>
        <br/>
        <input className="form-control" type="text" placeholder="First Name"
          onChange={this._handleChange}></input>
        <br/>
        <input className="form-control" type="text" placeholder="Last Name"
          onChange={this._handleChange}></input>
        <br/>
        <input className="form-control" type="text" placeholder="Username"
          onChange={this._handleChange}></input>
        <br/>
        <input className="form-control" type="text" placeholder="Email"
          onChange={this._handleChange}></input>
        <br/>
        <input className="form-control" type="password" placeholder="Password"
          onChange={this._handleChange}></input>
        <br/>
        <input className="form-control" type="password" placeholder="Confirm Password"
          onChange={this._handleChange}></input>
        <br/>
        <button className="btn btn-success pull-right">Login</button>
      </div>
    );
  }
}
