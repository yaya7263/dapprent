import React from "react";
import DatePicker from "react-datepicker";
import { MonToNum, MonToStr } from './Components/monthConvert.js'
import "react-datepicker/dist/react-datepicker.css";
import { Jumbotron, Modal, Alert, Row, Label, Col, Panel, Form, Grid, Container, Image,  Button, ButtonToolbar, Table } from 'react-bootstrap/dist/react-bootstrap.js'

// what this class will do is a direct submit to smart contract
class OwnerSubmit extends React.Component {
  render() {
    return (
    	<Container> 
			<Form style={{ marginTop: 20 }}>
			  <Form.Group controlId="formBasicEmail">
			    <Form.Label>Email address</Form.Label>
			    <Form.Control type="email" placeholder="Enter email" />
			    <Form.Text className="text-muted">
			      We'll never share your email with anyone else.
			    </Form.Text>
			  </Form.Group>

			  <Form.Group controlId="formBasicPassword">
			    <Form.Label>Password</Form.Label>
			    <Form.Control type="password" placeholder="Password" />
			  </Form.Group>
			  <Form.Group controlId="formBasicChecbox">
			    <Form.Check type="checkbox" label="Check me out" />
			  </Form.Group>
			  <Button variant="primary" type="submit">
			    Submit
			  </Button>
			</Form>	
		</Container>
    )
 
  }
}

export default OwnerSubmit; 