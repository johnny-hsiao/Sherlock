import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CategoryAccountList from './CategoryAccountList';
import AddCategory from '../Categories/AddCategory';
import axios from 'axios';

import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';

export default class AccountsView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      category: 'technology',
      id: '1',
      accounts: [
        { screen_name: '@ManUtd', category: 'sports' },
      ],
      categoryID: undefined
    };
  }

  componentDidMount() {
    this._accountAPICall(this.props.currentCategory);
  }

  componentDidUpdate() {
    if (this.state.id != this.props.currentCategory) {
      this.setState({
        categoryID: this.props.currentCategory
      });
    }

    if (this.state.categoryID) {
      this._accountAPICall(this.props.currentCategory);
      this.setState({
        categoryID: undefined,
        id: this.props.currentCategory
      });
    }    
  }

  _accountAPICall = (categoryID) => {
    axios.get(`http://127.0.0.1:5000/categories/${ categoryID }/accounts`)
    .then((res) => {
      this._updateAccountList(res.data)
    })
  } 

  _updateAccountList = (newAccounts) => {
    this.setState({
      accounts: newAccounts
    })
  }

  _addAccount = (e) => {
    e.preventDefault();
    console.log("addaccount", this.refs.accountInput.value)
    let self = this;
    

    axios.post(`http://127.0.0.1:5000/categories/${ this.props.currentCategory }/accounts/new`, { screen_name: this.refs.accountInput.value })
    .then(function (res) {
      self._accountAPICall(self.props.currentCategory);
      // self.setState({
      //   accounts: self.state.accounts.concat({ screen_name: self.refs.accountInput.value, category: self.state.category })
      // });
    })
    this._emptyInput();
  };

  _setCategory = (title, newID) => {
    this.setState({ 
      category: title,
    });
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

        <CategoryAccountList { ...this.props } category={this.state.category} accounts={this.state.accounts} />
      </div>
    );
  }
}
