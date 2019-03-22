import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, InputGroup, FormControl, Text, Carousel, Jumbotron, Modal, Alert, Row, Label, Col, Panel, Form, Grid, Container, Image,  Button, ButtonToolbar, Table } from 'react-bootstrap/dist/react-bootstrap.js'

//https://react-bootstrap.github.io/components/navbar/
class NavBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">BookAway</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/rent">Rent</Nav.Link>
          <Nav.Link href="/submit">Submit</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar; 