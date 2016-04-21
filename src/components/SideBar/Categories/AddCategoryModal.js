import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from  './style.css';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/lib/Modal';

const INITIAL_STATE = { input: 'Add Category' };

export default class AddCategoryModal extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this._updateInput = this._updateInput.bind(this);
    this._save = this._save.bind(this);
    this._closeModalCustom = this._closeModalCustom.bind(this);
  }

  _updateInput(e) {
    let newValue = this.refs.categoryInput.value;
    this.setState({ input: newValue.length > 0 ? newValue : INITIAL_STATE.input });
  }

  _save(e) {
    let newCategoryName = this.refs.categoryInput.value;
    this.props.addCategory(newCategoryName);
    this._closeModalCustom();
  }

  _closeModalCustom() {
    this.setState(INITIAL_STATE);
    this.props.closeModal();
  }

  render() {
    return (
      <div>
        <Modal show={ this.props.showModal }>
          <Modal.Header closeButton onHide={ this._closeModalCustom }>
            <Modal.Title className="modal-title">{ this.state.input }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input ref="categoryInput" className="modal-input" type="text" onChange={ this._updateInput }/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={ this._closeModalCustom }>Close</Button>
            <Button bsStyle="success" onClick={ this._save } >Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
