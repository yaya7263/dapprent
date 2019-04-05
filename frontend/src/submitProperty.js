import React from "react";
import { Container, Modal, Button, Col, Form } from 'react-bootstrap/dist/react-bootstrap.js'
import axios from "axios";
import { scRent } from './Components/scFunctions.js'
// help from https://react-bootstrap.github.io/components/forms/
// THIS IS FOR ADDING A PROP

class submitProperty extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            validated: false,
            showModal: false
        }
    }


    handlePropertySubmit = event => {
        event.preventDefault()
        var prop = {
            status: 0,
            location: event.target.elements.location.value,
            rentee: "empty",
            company: "empty",
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
            this.setState({showMod:true})
            axios.post("http://localhost:3001/api/property", {
                property: prop
            }).then(() => {
                if(checked) {
                    scRent(prop, prop.company, 5)
                }
            })
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
                            <Form.Label>Owner's First Name</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Ludwig"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Wittgenstein"
                             />
                        </Form.Group>
                    </Form.Row> 
                    <Form.Row>
                        <Form.Group as={Col} md="7" > 
                        <Form.Control type="text" placeholder="Location" id="location" required />
                        <Form.Control.Feedback type="invalid">
                            Please enter a location.
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="7"> 
                        <Form.Control type="text" pattern="[0-9]*" placeholder="Price" id="price" required />
                        <Form.Control.Feedback type="invalid">
                            Please enter a price for the property. 
                        </Form.Control.Feedback>
                        </Form.Group> 
                    </Form.Row>
                    <Form.Check type="checkbox" id="addAll" label="Add to all sites" style={{marginBottom:10}}/>
                    <Button type="submit" variant="success" style={{position:'relative'}}>Add Property</Button>
                </Form> 
		    </Container>
             )
    }
}

export default submitProperty; 