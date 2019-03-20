import React, { Component } from 'react';
import { Modal, Container, Button, ButtonToolbar, Table } from 'react-bootstrap/dist/react-bootstrap.js'
//help from https://react-bootstrap.github.io/components/modal/

export default class RentModal extends React.Component {

  handleRentSubmit = event => {
    console.log("hi");
    event.preventDefault(); 
    console.log("hi");
    sayHello;
  }
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleRentSubmit}>
            <label>
              Name:
              <input type="text"/>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
