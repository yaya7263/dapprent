
import React, { Component } from "react";
import axios from "axios";
import './App.css';
import '../node_modules/jquery/dist/jquery.min.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Alert, Row, Label, Col, Panel, Form, Grid, Container, Image,  Button, ButtonToolbar, Table } from 'react-bootstrap/dist/react-bootstrap.js'

const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
const scFunctions = require("./Components/scFunctions"); 

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      data: [],
      show: false, // show of the rental modal
      company: "Homeaway", 
      id: 0,
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
      rentProperty: "hello",
      startDate: new Date(),
      endDate: new Date()
    };
    this.handleCompanySubmit = this.handleCompanySubmit.bind(this);

  }

  handleRentSubmit = event => {
    console.log("hello");
    event.preventDefault(); 
    console.log("hello");
  }



  componentDidMount() {
    console.log("Component did mount")
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 99100000);
      this.setState({ intervalIsSet: interval });
    }
  }


  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch("http://localhost:3001/api/property")
      .then(property => property.json())
      .then(res => this.setState({ data: res.data }));
  };
  getDataBC = () => {
    var rentals = scFunctions.getRents();
    console.log(web3.toAscii(rentals[1][0]));


    for(let i = 0; i < rentals[0].length; i++){
      let currentProp = {
        status: rentals[0][i].toNumber(),
        location: web3.toUtf8(rentals[1][i]).replace(/\s+/g,''),
        company: web3.toUtf8(rentals[2][i]).replace(/\s+/g,''),
        price: rentals[3][i].toNumber(),
        start: rentals[4][i].toNumber(),
        end: rentals[5][i].toNumber(),
        help: "haha"
      }
      currentProp.price = 1000; 
      console.log(currentProp)
      this.updateDB(currentProp);
    }
    this.getDataFromDb(); 
  };


  updateDB = (updateToApply) => {
    axios.post("http://localhost:3001/api/updateData", {
      update: updateToApply
    });
  };


/*
    scFunctions.scRent(prop, this.state.company);
    console.log("Added transaction to smart Contract");
    prop.status = 2; 
    this.updateDB(prop); 
*/
  handleRentProperty = prop =>{
    this.setState({show: true}); 
    this.setState({rentProperty: prop.location })

  }



  handleUpdateProperty = () => {
    this.getDataBC(); 
//db.inventory.find( { status: "D" } )
  }
    
//0 for avail, 1 for rented, 2 for processing
  figureOutStatus = id => {
    if (id == 0) {
      return "avail"
    }
    else if (id == 2){ 
      return "processing"
    }
    else 
      return "rented"
  }
  handleCompanySubmit(event) {
    console.log("company submit")
    event.preventDefault(); 
    this.setState({company: event.target.elements.company.value })
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleStartDateChange = date => {
    this.setState({
      startDate: date
    });
  }

  handleEndDateChange = date => {
    this.setState({
      EndDate: date
    });
  }

  showProperty = prop => {
    return(
      <h1> {prop.location} </h1>
      )
  }

  showModal = () => {
    return (
        <Modal style={{ top: '30%'}} show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton style={{backgroundImage: 'url(https://www.pictorem.com/collection/900_1994202HighRes.jpg)'}}>
            <Container >
                  {this.state.rentProperty} 
            </Container> 
          </Modal.Header>
          <Modal.Body>
              <Form>
                   <Row style={{ paddingBottom:"10px" }}> 
                    <Col> 
                      <b> First Name </b> 
                      <Form.Control style={{ width:"178px" }} type="text" />
                    </Col>
                    <Col>
                      <b> Last Name </b> 
                      <Form.Control style={{ width:"178px" }} type="text"  />
                    </Col> 
                  </Row>
                  <Row> 
                    <Col style={{ justifyContent: 'center'}}> 
                      <b> Start Date </b> 
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleStartDateChange}
                      />
                    </Col>
                    <Col style={{ justifyContent: 'center'}}>  
                      <b> End Date </b> 
                      <DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleEndDateChange}
                      />
                    </Col>     
                  </Row> 
                  <Row>
                    <Col>  
                      {this.state.rentProperty}
                    </Col> 
                  </Row>
              </Form> 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>)
  }

  render() {
    const { data } = this.state;
    const show = this.state.show;
    return (
      <div>
        {this.showModal()} 
        <div style={{ padding: "10px" }}>
          <form onSubmit={this.handleCompanySubmit}>
            <label>
              <input placeholder="put company name here" id="company"/>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div> 
          <h2> {this.state.company} </h2> 
        </div>
        <div>
          <button 
            onClick={() =>
              this.handleUpdateProperty() 
            }>
            Update Properties 
          </button>
        </div> 

      <Container> 
        <Table striped hover>
          <thead> 
            <tr>
              <th> Status </th> 
              <th> Location </th>
              <th> Rentee </th> 
              <th> Company </th>
              <th> Price </th> 
              <th> Start </th>
              <th> End </th> 
              <th> Rent Property </th> 
            </tr>
          </thead> 
          <tbody> 
            {data.length <= 0
              ? "No Properties... Connected To Database?"
              : data.map((dat,index) => (
              <tr>
                {this.showProperty(dat)}
                {index}
              </tr> 
              ))}
            </tbody> 
        </Table> 

      </Container> 
      <rentModal />; 

      </div>

    );
  }
}

export default App;