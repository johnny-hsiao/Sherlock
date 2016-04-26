import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import style from './style.css';

export default class AccountList extends Component {
  constructor(props) {
    super(props);
    this._test = this._test.bind(this);
  }

  _test(e) {
    let reactid = e.target.getAttribute('data-reactid');
    console.log(reactid.match(/accountID(\d*)/));
    let accountID = reactid.match(/accountID(\d*)/)[1];
    this.props.onAccountChange(accountID);
  }

  render() {
    return (
      <div className="list-group account-list">
      {this.props.accounts.map((account) =>
        this.props.category === account.category 
          ? <button type="button" 
               className="list-group-item account-list-item" 
                     key={account.screen_name + "accountID" + account.id}
                 onClick={ this._test }

                     >@{account.screen_name}</button>
          : null
      )}
      </div>
    );
  }
};