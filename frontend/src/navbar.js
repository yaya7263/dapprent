import React, { Component } from "react";
import {Button, Alert, Navbar, Nav, NavDropdown } from 'react-bootstrap/dist/react-bootstrap.js';
import Switch from "react-switch";


class NavBar extends React.Component {
  constructor(props) {
        super(props); 
        this.state = {
            style1:{},
            style2:{},
            style3: {},
            style4:{},
            style5: {},
            show: false, 
            showOwner: true, 
            ownerChecked: false, 
            company: "Homeaway", 
            message: "Wittgenstein", 
       };
  }

    componentDidMount() {
        console.log("hello")
        
      if(this.props.location.pathname == '/rent')
          this.setState({style1: { textDecorationLine: "underline", color: "grey"}})
      if(this.props.location.pathname == '/submitRent') {
          this.setState({style2: { textDecorationLine: "underline", color: "grey"}}) 
          this.setState(prev => ({ ownerChecked: !prev.ownerChecked, showOwner: !prev.showOwner}))
      } 
      if(this.props.location.pathname == '/submitProperty') {
          this.setState({style4: { textDecorationLine: "underline", color: "grey"}}) 
          this.setState(prev => ({ ownerChecked: !prev.ownerChecked, showOwner: !prev.showOwner}))
      } 
      if(this.props.location.pathname == '/change')
          this.setState({style3: { textDecorationLine: "underline", color: "grey"}})
      if(this.props.location.pathname == '/delete') {
          this.setState({style5: { textDecorationLine: "underline", color: "grey"}})
          this.setState(prev => ({ ownerChecked: !prev.ownerChecked, showOwner: !prev.showOwner}))
      }
  }
  rentEnterHandler = () => {
      this.setState({message:"Rent a property "})
      this.setState({show:true})
  }
  rentLeaveHandler = () => {
      this.setState({message:null})
      this.setState({show:false})
  }

  submitEnterHandler = () => {
      this.setState({message:"For Property Owners: Submit a transaction done elsewhere "})
      this.setState({show:true})
  }
  submitLeaveHandler = () => {
      this.setState({message:null})
      this.setState({show:false})
  }
  changeEnterHandler = () => {
      this.setState({message:"Change/Cancel a recent booking "})
      this.setState({show:true})
  }
  changeLeaveHandler = () => {
      this.setState({message:null})
      this.setState({show:false})
  }

  handleOwnerMode = ()=>  {
     this.setState(prev => ({ ownerChecked: !prev.ownerChecked, showOwner: !prev.showOwner}))
  }

  propertyEnterHandler = () => {
      this.setState({message:"List a Property on this site "})
      this.setState({show:true})
  }

  propertyLeaveHandler = () => {
      this.setState({message:null})
      this.setState({show:true})
  }

  deleteEnterHandler = () => {
      this.setState({message:"Delete a listed property "})
      this.setState({show:true})
  }

  deleteLeaveHandler = () => {
      this.setState({message:null})
      this.setState({show:true})
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">BookAway</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link style={this.state.style1} onMouseEnter={this.rentEnterHandler} onMouseLeave={this.rentLeaveHandler} href="/rent">Rent</Nav.Link>
          <Nav.Link href="/change" style={this.state.style3} onMouseEnter={this.changeEnterHandler} onMouseLeave={this.changeLeaveHandler}>Change/Cancel</Nav.Link>
          <Nav.Link href="/submitProperty" hidden={this.state.showOwner} style={this.state.style4} onMouseEnter={this.propertyEnterHandler} onMouseLeave={this.propertyLeaveHandler}> Add Property </Nav.Link>
          <Nav.Link href="/submitRent" hidden={this.state.showOwner} style={this.state.style2} onMouseEnter={this.submitEnterHandler} onMouseLeave={this.submitLeaveHandler}>Submit Renting</Nav.Link>
          <Nav.Link href="/delete" hidden={this.state.showOwner} style={this.state.style5} onMouseEnter={this.deleteEnterHandler} onMouseLeave={this.deleteLeaveHandler}>Delete Prop</Nav.Link>
        </Nav>
        <Alert placement="bottom" variant="info" style = {{ 
            position: "absolute", left: "700px", top: "4px",
            borderColor: "grey",
            borderStyle: 'solid',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20 }} show={this.state.show}>
        {this.state.message}
      </Alert>
      <Button variant="primary" onClick={this.handleOwnerMode} style={{ marginRight: 15, borderColor: "lightblue", width:"7.5%",
          borderStyle: 'solid'}}>Property Owner</Button>
      <Switch onChange={this.handleOwnerMode} checked={this.state.ownerChecked} />
      </Navbar>

    );
  }
}

export default NavBar; 