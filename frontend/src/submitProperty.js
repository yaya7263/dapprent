import React from "react";
import { Container, Modal, Button, Col, Form } from 'react-bootstrap/dist/react-bootstrap.js'
import axios from "axios";
import { scRent, getCompanies } from './Components/scFunctions.js'
// help from https://react-bootstrap.github.io/components/forms/
// THIS IS FOR ADDING A PROP

const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

class submitProperty extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            validated: false,
            showModal: false,
            companies: []
        }
        this.myGetCompanies().then(comps => { this.setState({companies: comps.map(x => web3.toUtf8(x).replace(/\s+/g,''))}, () => console.log(this.state.companies))})
    }

    myGetCompanies = async () => {
        return getCompanies()
    }

    companiesList = () =>{
        if (this.state.companies.length === 0) 
            return (
                <Form.Control as="select" id="companies" onClick={this.handleSelectPropChange}>
                    <option>"Empty"</option>
                </Form.Control>
            )
        else {
            var options = this.state.companies.map(company => <option> {company} </option> )
            return (    
                <Form.Control as="select" id="companies">
                    {options}
                </Form.Control>
           )
        }
    }

    handlePropertySubmit = event => {
        event.preventDefault()
        console.log(event.target.elements.companies.value)
        var prop = {
            status: 0,
            location: event.target.elements.location.value,
            rentee: "empty",
            company: event.target.elements.companies.value,
            price: parseInt(event.target.elements.price.value,10),
            start: 0,
            end: 0,
            image:"./images/99.jpg"
        }
        if (event.target.checkValidity() === false) {
            event.stopPropagation();
        }
        var checked = event.target.elements.addAll.checked
        this.setState({ validated: true }); 
        if (event.target.checkValidity() === true) {
            scRent(prop, prop.company, 5)
            if(checked) {
                    scRent(prop, "All", 5) // add to all sites
            }
            this.setState({showModal: true})
        }
    }
    showModal = () => {
        return (
          <Modal style={{ top: '30%'}} show={this.state.showModal} onHide={()=> this.setState({showModal: false})} >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
              <p>The property has being added</p>
            </Modal.Body>
    
          </Modal.Dialog>
          </Modal> )
    }
    render() {
        return (
            <Container style= {{ marginTop: 30, position: 'relative'}}> 
            {this.showModal()} 
                <Form noValidate validated={this.state.validated} onSubmit={e=> this.handlePropertySubmit(e)} >
                    <Form.Row>
                        <Form.Group as={Col} md="3" style={{marginRight:50}}>
                            <Form.Label style={{color:'silver'}}> <b>Owner's First Name </b></Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Ludwig"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label style={{color:'silver'}}><b>Last Name</b></Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Wittgenstein"
                             />
                        </Form.Group>
                    </Form.Row> 
                    <Form.Row style={{width:550}}>
                        <Form.Group as={Col} > 
                        <Form.Control type="text" placeholder="Location" id="location" required />
                        <Form.Control.Feedback type="invalid">
                            Please enter a location.
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row style={{width:550}}>
                        <Form.Group as={Col} controlId="formGridState">
                            {this.companiesList()}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row md='3'>
                        <Form.Group as={Col} md='3' > 
                        <Form.Control type="text" pattern="[0-9]*" placeholder="Price" id="price" required />
                        <Form.Control.Feedback type="invalid">
                            Please enter a price for the property. 
                        </Form.Control.Feedback>
                        </Form.Group> 
                    </Form.Row>
                    <Form.Check type="checkbox" id="addAll" style={{color:'red'}} label=<b style={{color:'grey'}}>Add as same price to all sites</b> style={{marginBottom:10}}/>
                    <Button type="submit" variant="success" style={{position:'relative'}}>Add Property</Button>
                </Form> 
		    </Container>
             )
    }
}

export default submitProperty; 