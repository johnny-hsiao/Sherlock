import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropdownCategories from '../DropdownCategories/DropdownCategories';
import AddCategoryModal from './AddCategoryModal';
import AccountsView from '../TwitterAccounts/AccountsView';
import styles from  './style.css';

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/lib/Modal';

export default class AddCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      categories: [{title: 'Technology', id: 1 }, 
                  {title: 'Finance', id: 2}, 
                  {title: 'Sports', id: 3}],
      title: null,
      currentCategory: this._setCategoryTitle
    };

    this.state.title = this.state.categories[0].title;

    this._toggleModal = this._toggleModal.bind(this);
    this._addCategory = this._addCategory.bind(this);
    // this._setCategoryTitle = this._setCategoryTitle.bind(this);
  }

  _toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  _addCategory(newCategory) {
    this.setState({
      categories: [...this.state.categories, newCategory]
    });
  }

  _setCategoryTitle = (newTitle, newID) => {
    return () => {
      if (this.props.onTitleChange) {
        this.props.onTitleChange(newTitle);
        this.props.onCategoryChange(newID);
      }
      this.setState({ title: newTitle });
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
