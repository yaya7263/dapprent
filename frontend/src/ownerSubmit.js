import React from "react";
import DatePicker from "react-datepicker";
import { MonToNum, MonToStr } from './Components/monthConvert.js'
import "react-datepicker/dist/react-datepicker.css";
import { Container, Button, Col, Form, Modal } from 'react-bootstrap/dist/react-bootstrap.js'
import axios from "axios";
import { scRent }  from "./Components/scFunctions"; 
var moment = require('moment');

// THIS IS FOR SUBMITTING RENTAL TO DATABASE AND SMART CONTRACT. 
// what this class will do is a direct submit to smart contract
class OwnerSubmit extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            validated: false,
            startDate: new Date(),
            data: [],
            useData: [], // this means the data will be used
            endDate: new Date(),
            property: "empty",
            showModal: false
        }
    }
    componentDidMount() {
        this.getDataFromDb()
    }
    getDataFromDb = () => {
        fetch("http://localhost:3001/api/property")
            .then(property => property.json())
            .then(res => {
                this.setState({ data: res.data, useData: res.data.filter(item => item.status === 0) });
            }).then
                ( ()=> console.log(this.state.useData))
    };

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
    handlePropertySubmit = event => {
        event.preventDefault()

        let startDate = moment(this.state.startDate).format('MMMDDYYYY');
        startDate = parseInt(MonToNum(startDate)) 
        console.log(event.target.elements.company.value)
        let endDate = moment(this.state.endDate).format('MMMDDYYYY');
        endDate = parseInt(MonToNum(endDate)) 
        var prop = {
            status: 2,
            location: this.state.property,
            rentee: event.target.elements.firstName.value + event.target.elements.lastName.value,
            company: event.target.elements.company.value,
            price: parseInt(event.target.elements.price.value,10),
            start: startDate,
            end: endDate
        }
        console.log(this.state.property)
        if (event.target.checkValidity() === false) {
            event.stopPropagation();
        }
        this.setState({ validated: true }); 
        if (event.target.checkValidity() === true) {
            console.log("bumitting)")
            axios.post("http://localhost:3001/api/updateData", {
                update: prop
            }).then((result) => {
                console.log(result.data)
                prop.status = 1;
                scRent(prop, prop.company)
            })
            this.setState({showModal: true})
        }
    }

    handleSelectChange = (event) => {
        this.setState({
            property: event.target.value
        })
    }

   handleStartDateChange = date => {
        this.setState({
            startDate: date
        });
    }

    handleEndDateChange = date => {
        this.setState({
            endDate: date
        });

    }

    showModal = () => {
        return (
          <Modal style={{ top: '30%'}} show={this.state.showModal} onHide={()=> this.setState({showModal: false})} >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
              <p>The property submission is being processed</p>
            </Modal.Body>
    
          </Modal.Dialog>
          </Modal> )
    }
    render() {
        return (
            <Container style= {{ marginTop: 30 }}> 
                {this.showModal()}
                <Form noValidate validated={this.state.validated} onSubmit={e=> this.handlePropertySubmit(e)}>
                    <Form.Row>
                        <Form.Group as={Col} md="3" style={{marginRight:50}}>
                            <Form.Label> First Name</Form.Label>
                            <Form.Control
                            id="firstName"
                            type="text"
                            placeholder="Lev"
                            required
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                            id="lastName"
                            type="text"
                            placeholder="Myshkin the Prince"
                             />
                        </Form.Group>
                    </Form.Row> 
                    <Form.Row style={{width:610}}>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Properties</Form.Label>
                            {this.availProps()}
                            </Form.Group>
                    </Form.Row>
                    <Form.Row> 
                        <Form.Group as={Col} md="3" style = {{marginLeft: 5 }}> 
                            <Form.Row> 
                            <Form.Label> Start Date </Form.Label>
                            </Form.Row>
                            <Form.Row>
                            <DatePicker
                            dateFormat="MMMM d, yyyy"
                            selected={this.state.startDate}
                            onChange={this.handleStartDateChange}
                           />
                           </Form.Row>
                        </Form.Group>   
                        <Form.Group as={Col} md="3" style = {{marginLeft: 50}}>
                            <Form.Row> 
                            <Form.Label> End Date </Form.Label>
                            </Form.Row>
                            <Form.Row>
                            <DatePicker
                        dateFormat="MMMM d, yyyy"
                        selected={this.state.endDate}
                        onChange={this.handleEndDateChange}
                       />
                       </Form.Row>
                       </Form.Group> 
                    </Form.Row> 
                    <Form.Row>
                        <Form.Group as={Col} md="3" style={{marginRight:50}}> 
                            <Form.Control type="text" placeholder="Company" id="company" required />
                            <Form.Control.Feedback type="invalid">
                                Please enter where the property was rented. 
                            </Form.Control.Feedback>
                        </Form.Group> 
                        <Form.Group as={Col} md="3"> 
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

export default OwnerSubmit; 