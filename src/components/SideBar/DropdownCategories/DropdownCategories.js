import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

export default class DropdownCategories extends Component {
  _renderMenuItems(menu_items) {
    console.log(menu_items)
    return menu_items.map((item, index) => {
      return <MenuItem eventKey={index} key={item.title} onClick={this.props.onChange(item.title, item.id)}>{item.title}</MenuItem>;
    });
  }

  render() {
    return (
      <DropdownButton
          bsStyle={ this.props.color }
          title={ this.props.title }
          id={`dropdown-basic-${this.props.title}`}>
        { this._renderMenuItems(this.props.items_list) }
        <MenuItem divider />
        <MenuItem key={'new_category'} onClick={ this.props.toggleModal }>Add Category</MenuItem>
      </DropdownButton>
    );
  }
}
