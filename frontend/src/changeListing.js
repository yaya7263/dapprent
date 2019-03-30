import React from "react";
import DatePicker from "react-datepicker";
import { MonToNum, MonToStr } from './Components/monthConvert.js'
import "react-datepicker/dist/react-datepicker.css";
import { Container, Button, Col, Form } from 'react-bootstrap/dist/react-bootstrap.js'
import axios from "axios";
import { scRent }  from "./Components/scFunctions"; 
var moment = require('moment');

// Cancel a rental will be 3, change a listing will be 4
var myDict = { "cancel":0, "change": 1}
class ChangeListing extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            validated: false,
            startDate: new Date(),
            endDate: new Date(),
            select: "cancel",
            data: [],
            useData: [], // this means the data will be used
            selectText: "Cancel a rent",
            property: "Monte Cristo"
        }
    }

    componentDidMount() {
        this.getDataFromDb()
    }
    getDataFromDb = () => {
        fetch("http://localhost:3001/api/property")
            .then(property => property.json())
            .then(res => {
                this.setState({ data: res.data, useData: res.data.filter(item => item.status === 1) });
            }).then
                ( ()=> console.log(this.state.useData))
    };
    handlePropertySubmit = event => {
        event.preventDefault()
        var myStatus = myDict[this.state.select]
        let startDate = moment(this.state.startDate).format('MMMDDYYYY');
        startDate = parseInt(MonToNum(startDate)) 
        let endDate = moment(this.state.endDate).format('MMMDDYYYY');
        endDate = parseInt(MonToNum(endDate)) 
        var prop = {
            status: myStatus,
            location: this.state.property,
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
            axios.post("http://localhost:3001/api/changeData", {
                update: prop
            }).then((result) => {
                if (myStatus == 0) {
                    prop.status = 3
                }
                if (myStatus == 1){
                    prop.status = 4
                }
                console.log(result.data)
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

    handleSelectChange = e => {
        this.setState({select: e.target.value})
        if (e.target.value == "cancel"){
            this.setState({selectText: "Cancel a rent"})
        }
        if (e.target.value == "change"){
            this.setState({selectText: "Change rent date"})
        }
    }

    handleSelectPropChange = (event) => {
        this.setState({
            property: event.target.value
        })
    }
    changeProps = () =>{
        console.log(this.state.useData)
        if (this.state.useData.length === 0) 
            return (
                <Form.Control as="select" id="availProps" onClick={this.handleSelectPropChange}>
                    <option>"Empty"</option>
                </Form.Control>
            )
        else {
            var options = this.state.useData.map(myProp => <option> {myProp.location} </option> )
            return (    
                <Form.Control as="select" id="availProps" onClick={this.handleSelectPropChange}>
                    <option>...</option>
                    {options}
                </Form.Control>
           )
        }
    }
    render() {
        return (
            <Container style= {{ marginTop: 30 }}> 
                <Form noValidate validated={this.state.validated} onSubmit={e=> this.handlePropertySubmit(e)}>
                    <Form.Row>  
                        <h1 style={{marginRight:98, position:"relative", top:-3}}> {this.state.selectText} </h1> 
                        <Form.Control as="select" onChange={this.handleSelectChange} value={this.state.select} style={{width:275}}>
                          <option value="cancel">Cancel</option>
                          <option value="change">Change</option>
                        </Form.Control>
                    </Form.Row> 
                    <hr/>
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
                        {this.changeProps()}
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
    )}
}

export default ChangeListing; 