import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CategoryAccountList from './CategoryAccountList';
import AddCategory from '../Categories/AddCategory';

import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';

export default class AccountsView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      category: 'Technology',
      accounts: [
        { handle: '@ManUtd', category: 'Sports' },
        { handle: '@theScore', category: 'Sports' },
        { handle: '@bomani_jones', category: 'Sports' },
        { handle: '@SportsCenter', category: 'Sports' },
        { handle: '@MapleLeafs', category: 'Sports' },

        { handle: '@finansakrobat', category: 'Finance' },
        { handle: '@MorganStanley', category: 'Finance' },
        { handle: '@GoldmanSachs', category: 'Finance' },
        { handle: '@BondVigilantes', category: 'Finance' },
        { handle: '@ReformedBroker', category: 'Finance' },

        { handle: '@tim_cook', category: 'Technology' },
        { handle: '@TechCrunch', category: 'Technology' },
        { handle: '@Wired', category: 'Technology' },
        { handle: '@BBCTech', category: 'Technology' },
        { handle: '@guardiantech', category: 'Technology' }
      ]

    };

  }

  _addAccount = (e) => {
    e.preventDefault();
    this.setState({
      accounts: this.state.accounts.concat({ handle: '@' + this.refs.accountInput.value, category: this.state.category })
    });
    this._emptyInput();

  };

  _setCategory = (title) => {
    this.setState({ category: title });
  };

  _emptyInput = (e) => {
    this.refs.accountInput.value = '';
  };

  render() {
    return (
      <div>
        <AddCategory onTitleChange={this._setCategory}/>
        <h5 className="accounts-heading"> Add Account </h5>
        <form onSubmit={this._addAccount}>
          <input id="account_input" type="text" placeholder="@" ref="accountInput"/>
        </form>
        <h5 className="accounts-heading">Your Accounts</h5>
        <CategoryAccountList category={this.state.category} accounts={this.state.accounts} />
      </div>
    );
  }
}
