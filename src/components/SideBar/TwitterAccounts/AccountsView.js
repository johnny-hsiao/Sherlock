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
      category: 'technology',
      accounts: [
        { handle: '@ManUtd', category: 'sports' },
        { handle: '@theScore', category: 'sports' },
        { handle: '@bomani_jones', category: 'sports' },
        { handle: '@SportsCenter', category: 'sports' },
        { handle: '@MapleLeafs', category: 'sports' },

        { handle: '@finansakrobat', category: 'finance' },
        { handle: '@MorganStanley', category: 'finance' },
        { handle: '@GoldmanSachs', category: 'finance' },
        { handle: '@BondVigilantes', category: 'finance' },
        { handle: '@ReformedBroker', category: 'finance' },

        { handle: '@tim_cook', category: 'technology' },
        { handle: '@TechCrunch', category: 'technology' },
        { handle: '@Wired', category: 'technology' },
        { handle: '@BBCTech', category: 'technology' },
        { handle: '@guardiantech', category: 'technology' }
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
        <AddCategory { ...this.props } onTitleChange={this._setCategory}/>

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
