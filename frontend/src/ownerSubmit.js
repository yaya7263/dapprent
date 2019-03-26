import React from "react";
import DatePicker from "react-datepicker";
import { MonToNum, MonToStr } from './Components/monthConvert.js'
import "react-datepicker/dist/react-datepicker.css";
import { Jumbotron, Modal, Alert, Row, Label, Col, Panel, Form, Grid, Container, Image,  Button, ButtonToolbar, Table } from 'react-bootstrap/dist/react-bootstrap.js'

const scFunctions = require("./Components/scFunctions"); 
// what this class will do is a direct submit to smart contract
class OwnerSubmit extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
    	location: "Venus",
    	firstName: "Ludwig",
    	lastName: "Wittgenstein",
    	price: 0,
    	start: 0,
    	end: 0,
    	company: "Homeaway"
    }
  }
  handleFirstName = e => {
    this.setState({ firstName: e.target.value })
  }

  handleLastName = e => {
    this.setState({ lastName: e.target.value })
  }
  handleLocation = e => {
    this.setState({ location: e.target.value })
  }
  handlePrice = e => {
    this.setState({ price: parseInt(e.target.value,10) })
  }
  handleStart = e => {
    this.setState({ start: parseInt(e.target.value,10) })
  }
  handleEnd = e => {
    this.setState({ end: parseInt(e.target.value) })
  }
  handleCompany = e => {
    this.setState({ company: e.target.value })
  }

  handleSubmit = e => {
  	e.preventDefault()
  	var property ={
        status: 1, 
  		location: this.state.location,
  		price: this.state.price,
  		start: this.state.start,
  		end: this.state.end,
  		company: this.state.company
  	}
	scFunctions.scRent(property, property.company);
  }
  render() {
    return (
    	<Container style= {{ marginTop: 30 }}> 
			<Form onSubmit={e => this.handleSubmit(e)}>
			  <Form.Row>
			    <Form.Group as={Col} md="3">
			      <Form.Label>First Name</Form.Label>
			      <Form.Control onChange={this.handleFirstName} />
			    </Form.Group>
			    <Form.Group as={Col} style= {{marginLeft: 50}} md="3">
			      <Form.Label>Last Name</Form.Label>
			      <Form.Control onChange={this.handleLastName}/>
			    </Form.Group>
			  </Form.Row>
			  <Form.Row> 
			  	<Form.Group >
				  <Form.Label>Address</Form.Label>
				  <Form.Control style={{width: 605}} placeholder="Planet name please" onChange={this.handleLocation}/>
				</Form.Group>
			  </Form.Row> 
			  <Form.Row>
			    <Form.Group as={Col} md="3">
			      <Form.Label>Start Date</Form.Label>
			      <Form.Control placeholder="date as integer with no spaces" onChange={this.handleStart} />
			    </Form.Group>
			    <Form.Group as={Col} md="3" style= {{marginLeft: 50}}>
			      <Form.Label>End Date</Form.Label>
			      <Form.Control placeholder="date as integer with no spaces" onChange={this.handleEnd}/>
			    </Form.Group>
			  </Form.Row>
			  <Form.Row> 
				  <Form.Group as={Col} md="3">
				  	<Form.Label> Company </Form.Label> 
				    <Form.Control placeholder="Rented from whom? " onChange={this.handleCompany} />
				  </Form.Group>
				  <Form.Group as={Col} md="3" style= {{marginLeft: 50}}>
				  	<Form.Label> Price </Form.Label> 
				    <Form.Control onChange={this.handlePrice} />
				  </Form.Group>
			  </Form.Row> 
			  <Button variant="primary" type="submit" >
			    Submit
			  </Button>
			</Form>
		</Container>
    )
 
  }
}

export default OwnerSubmit; 