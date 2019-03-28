import React from "react";
import DatePicker from "react-datepicker";
import { MonToNum, MonToStr } from './Components/monthConvert.js'
import "react-datepicker/dist/react-datepicker.css";
import { Container, Button, Col, Form } from 'react-bootstrap/dist/react-bootstrap.js'
import axios from "axios";
import { scRent }  from "./Components/scFunctions"; 
const scFunctions = require("./Components/scFunctions"); 
var moment = require('moment');

// THIS IS FOR SUBMITTING RENTAL TO DATABASE AND SMART CONTRACT. 
// what this class will do is a direct submit to smart contract
class OwnerSubmit extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            validated: false,
            startDate: new Date(),
            endDate: new Date()
        }
    }
    async submitDB(myProp) {


    }
    handlePropertySubmit = event => {
        event.preventDefault()

        let startDate = moment(this.state.startDate).format('MMMDDYYYY');
        startDate = parseInt(MonToNum(startDate)) 
        let endDate = moment(this.state.endDate).format('MMMDDYYYY');
        endDate = parseInt(MonToNum(endDate)) 
        var prop = {
            status: 2,
            location: event.target.elements.location.value,
            rentee: event.target.elements.firstName.value + event.target.elements.lastName.value,
            company: event.target.elements.company.value,
            price: parseInt(event.target.elements.price.value,10),
            start: startDate,
            end: endDate
        }
        if (event.target.checkValidity() === false) {
            event.stopPropagation();
        }
        this.setState({ validated: true }); 
        if (event.target.checkValidity() === true) {
            axios.post("http://localhost:3001/api/updateData", {
                update: prop
            }).then((result,oreo) => {
                console.log(result.data)
                console.log(oreo)
                prop.status = 1;
                scRent(prop, prop.location)
            })
        }
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
    render() {
        return (
            <Container style= {{ marginTop: 30 }}> 
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
                    <Form.Row>
                        <Form.Group as={Col} md="7" > 
                            <Form.Control type="text" placeholder="Location" id="location" required />
                            <Form.Control.Feedback type="invalid">
                                Please enter a location.
                            </Form.Control.Feedback>
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