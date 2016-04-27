import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export default class DropdownCategories extends Component {
  _renderMenuItems(menu_items) {
    return menu_items.map((item, index) => {
      return <MenuItem eventKey={index} key={item.name} onClick={this.props.onChange(item.name, item.id)}>{ item.name.capitalizeFirstLetter() }</MenuItem>;
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
