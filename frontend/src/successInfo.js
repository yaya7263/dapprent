import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Container, ListGroup } from 'react-bootstrap/dist/react-bootstrap.js'
import axios from "axios";
import { MonToNum, MonToStr } from './Components/monthConvert.js'
var moment = require('moment');

class successInfo extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            validated: false,
            startDate: new Date(),
            data: [],
            useData: [], // this means the data will be used
            succeeded: [],
            failed: [],
            processing: []
        }
    }
    componentDidMount() {
        this.getDataFromDb()
    }

    getDataFromDb = () => {
        fetch("http://localhost:3001/api/property")
            .then(property => property.json())
            .then(res => {
                this.setState({ data: res.data, useData: res.data.filter(item => item.thisCompany == 1) }, 
                () => {
                    this.setState({ succeeded: this.state.useData.filter(item => item.success == 3)})
                    this.setState({ processing: this.state.useData.filter(item => item.success == 1)})
                    this.setState({ failed: this.state.useData.filter(item => item.success == 2)})
                });
            })
    };

    /*
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
    */
    successList = () =>{
        if (this.state.succeeded.length === 0) 
            return (
                <ListGroup style={{position: 'relative'}}>
                <ListGroup.Item active> <b>Success:</b> </ListGroup.Item> 
                </ListGroup>
            )
        else {
            var items = this.state.succeeded.map(item => <ListGroup.Item> <b>{item.location}</b> by <b> {item.rentee} </b>until <b>{MonToStr(item.end)} </b></ListGroup.Item> )
            return (
                <ListGroup style={{position: 'relative'}}>
                <ListGroup.Item active> <b>Successes:</b> </ListGroup.Item> 
                {items}
                </ListGroup>
            )
        }
    }

    failedList = () =>{
        if (this.state.failed.length === 0) 
            return (
                <ListGroup style={{position: 'relative', top: 50}}>
                <ListGroup.Item active><b> Failed: </b></ListGroup.Item> 
                </ListGroup>
            )
        else {
            var items = this.state.failed.map(item => <ListGroup.Item disabled> <b>{item.location}</b> attemped by <b> {item.rentee} </b> Unavail until <b>{MonToStr(item.end)} </b> </ListGroup.Item> )
            return (
                <ListGroup style={{position: 'relative', top: 50}}>
                <ListGroup.Item active><b> Failed: </b></ListGroup.Item> 
                {items}
                </ListGroup>
            )
        }
    }

    processList = () =>{
        if (this.state.processing.length === 0) 
            return (
                <ListGroup style={{position: 'relative', top: 50}}>
                <ListGroup.Item active> <b> Processing: </b></ListGroup.Item> 
                </ListGroup>
            )
        else {
            var items = this.state.processing.map(item => <ListGroup.Item> <b>{item.location}</b> by <b> {item.rentee} </b>until <b>{MonToStr(item.end)} </b> </ListGroup.Item> )
            return (
                <ListGroup style={{position: 'relative', top: 50}}>
                <ListGroup.Item active> <b>Processing: </b></ListGroup.Item> 
                {items}
                </ListGroup>
            )
        }
    }
    render() {
        return  (
            <Container style={{position: 'relative', top: 10}}>
                {this.successList()}
                {this.failedList()}
                {this.processList()}

                
            </Container>
            
        )
    }
}

export default successInfo; 