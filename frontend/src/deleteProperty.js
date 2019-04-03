import React from "react";
import { Button, Modal, Container, Col, Form } from 'react-bootstrap/dist/react-bootstrap.js'
import axios from "axios";
import { scRent } from './Components/scFunctions.js'

// THIS is for deleting a prop
// help from https://stackoverflow.com/questions/55424709/why-do-you-need-to-pass-in-this-state-example-for-page-to-rerender#55424845
class deleteProperty extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            validated: false,
            data: [],
            useData: [], // this means the data will be used
            property: "empty",
            showModal: false
        }
    }
    componentDidMount() {
        this.getDataFromDb()
    }
    handleSelectChange = (event) => {
        this.setState({
            property: event.target.value
        })
    }

    availProps = () =>{
        if (this.state.useData.length == 0) 
            return (
                <Form.Control as="select" id="availProps" onClick={this.handleSelectChange}>
                    <option>"Empty"</option>
                </Form.Control>
            )
        else {
            var options = this.state.useData.map(myProp => <option> {myProp.location} </option> )
            return (    
                <Form.Control as="select" id="availProps" onClick={this.handleSelectChange}>
                    <option>...</option>
                    {options}
                </Form.Control>
                )
        }
    }

    getDataFromDb = () => {
        fetch("http://localhost:3001/api/property")
            .then(property => property.json())
            .then(res => {
                this.setState({ data: res.data, useData: res.data.filter(item => item.status === 0) });
            }).then
                ( ()=> console.log(this.state.useData))
    };

    handlePropertySubmit = event => {
        event.preventDefault()
 
        var prop = {
            status: 6,
            location: this.state.property,
            rentee: event.target.elements.firstName.value + event.target.elements.lastName.value,
            company: "empty",
            price: 0,
            start: 0,
            end: 0
        }
        var checked = event.target.elements.deleteAll.checked // have to record it here since the event changes with delete...
        console.log(this.state.property)
            
        axios.delete("http://localhost:3001/api/delete", {
            data: {property: prop} 
        }).then(() => {
            if (checked) {
                console.log("deleting all")
                scRent(prop, prop.location)
            } else {
                console.log("just off of this site")
            }
        }).then(this.getDataFromDb)
        this.setState({showModal: true})
            
    }

    showModal = () => {
        return (
          <Modal style={{ top: '30%'}} show={this.state.showModal} onHide={()=> this.setState({showModal: false})} >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
              <p>The deletion has being processed</p>
            </Modal.Body>
    
          </Modal.Dialog>
          </Modal> )
    }
    render() {
        return (
        <Container>
            {this.showModal()}
            <Form onSubmit={e=> this.handlePropertySubmit(e)} style={{marginTop:50}}>
            <Form.Row>
                <Form.Group as={Col} md="3" style={{marginRight:50}}>
                    <Form.Label> First Name </Form.Label>
                    <Form.Control
                    id="firstName"
                    type="text"
                    placeholder="Rodion"
                    required
                    />
                </Form.Group>
                    <Form.Group as={Col} md="3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                    id="lastName"
                    type="text"
                    placeholder="Raskolnikov"
                    required
                    />
                </Form.Group>
            </Form.Row>
            <Form.Row style={{width:700}}> 
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Unbooked Properties</Form.Label>
                    {this.availProps()}
                </Form.Group>
                <Form.Group as={Col} style={{position:"relative", left: 40}}>
                    <Form.Check type="checkbox" id="deleteAll" label="Delete from all sites" />
                    <Button variant="dark" type="submit" style={{position:"relative",top:8}}> Delete Property </Button>
                </Form.Group>
            </Form.Row>
            </Form>
        </Container>
    )} 
                        }

export default deleteProperty; 