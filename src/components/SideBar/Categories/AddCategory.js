import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropdownCategories from '../DropdownCategories/DropdownCategories';
import AddCategoryModal from './AddCategoryModal';
import AccountsView from '../TwitterAccounts/AccountsView';
import axios from 'axios';
import styles from  './style.css';

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/lib/Modal';

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export default class AddCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      categories: [{name: 'Technology', id: "1" },
                  {name: 'Finance', id: "2"},
                  {name: 'Sports', id: "3"},
                  {name: 'Education', id: "4"}],
      title: null,
      currentCategory: this._setCategoryTitle
    };

    this.state.title = this.state.categories[0].name;
    this._toggleModal = this._toggleModal.bind(this);
    this._addCategory = this._addCategory.bind(this);
    // this._setCategoryTitle = this._setCategoryTitle.bind(this);
  }

  componentWillMount() {
    let self = this;
    axios.get(`http://127.0.0.1:5000/categories`)
    .then(function (res) {
      self.setState({
        categories: res.data.categories
      });
    })
  }

  _toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  _addCategory(newCategory) {
    let self = this;
    axios.post(`http://127.0.0.1:5000/categories/new`, { name: newCategory })
    .then(function (res) {
      console.log(res, "added category!");
      self.setState({
        categories: [...self.state.categories, {name: res.data.newCategory.name, id: res.data.newCategory.id }]
      });
    })
    
  }


  _setCategoryTitle = (newTitle, newID) => {
    return () => {
      if (this.props.onTitleChange) {
        this.props.onTitleChange(newTitle);
        this.props.onCategoryChange(newID);
      }
      this.setState({ title: newTitle.capitalizeFirstLetter() });
    };
  }

  render() {
    return (
      <div>
        <AddCategoryModal closeModal={ this._toggleModal } showModal={ this.state.showModal } addCategory={ this._addCategory } />
        <DropdownCategories
          onChange={this._setCategoryTitle}
          color='default'
          title={this.state.title}
          toggleModal={this._toggleModal}
          items_list={this.state.categories}
        />
      </div>
    );
  }
}
