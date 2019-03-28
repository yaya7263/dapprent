import React from "react";
import { Container, Button, Col, Form } from 'react-bootstrap/dist/react-bootstrap.js'
import axios from "axios";

// help from https://react-bootstrap.github.io/components/forms/
// THIS IS FOR ADDING A PROP

class deleteProperty extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            validated: false
        }
    }

    handlePropertySubmit = event => {
        event.preventDefault()
 
        var prop = {
            status: 1,
            location: event.target.elements.location.value,
            rentee: "empty",
            company: "empty",
            price: parseInt(event.target.elements.price.value,10),
            start: 0,
            end: 0
        }
        if (event.target.checkValidity() === false) {
            event.stopPropagation();
        }
        this.setState({ validated: true }); 
        if (event.target.checkValidity() === true) {
            axios.post("http://localhost:3001/api/property", {
                property: prop
            });
        }
    }
    render() {
        return (
            <Container style= {{ marginTop: 30 }}> 
                <Form noValidate validated={this.state.validated} onSubmit={e=> this.handlePropertySubmit(e)}>
                    <Form.Row>
                        <Form.Group as={Col} md="3" style={{marginRight:50}}>
                            <Form.Label>Rentor's First Name</Form.Label>
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
<Button type="submit">Submit Property</Button>
</Form> 
</Container>
)
    }
    }

export default deleteProperty; 