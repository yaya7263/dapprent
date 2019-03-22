
import React, { Component } from "react";
import axios from "axios";
import './App.css';
//import '../node_modules/jquery/dist/jquery.min.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import { MonToNum, MonToStr } from './Components/monthConvert.js'
import "react-datepicker/dist/react-datepicker.css";
import { Jumbotron, Modal, Alert, Row, Label, Col, Panel, Form, Grid, Container, Image,  Button, ButtonToolbar, Table } from 'react-bootstrap/dist/react-bootstrap.js'

const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
const scFunctions = require("./Components/scFunctions"); 
var moment = require('moment');

const pathToImages = require.context('', true);

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
      rentProperty: "DongFang",
      startDate: new Date(),
      endDate: new Date(),
      firstName: "Ludwig",
      showConflict: false,
      lastName: "Wittgenstein",
      processing: []
    };
    this.handleCompanySubmit = this.handleCompanySubmit.bind(this);

  }

  handleRentSubmit = event => {
    event.preventDefault(); 
    this.state.rentProperty.rentee = this.state.firstName + this.state.lastName
    scFunctions.scRent(this.state.rentProperty, this.state.company);
    this.state.rentProperty.status = 2; 
    this.updateDB(this.state.rentProperty);
    this.state.processing.push(this.state.rentProperty.location)
    this.handleClose()
    //console.log(this.state.processing[0])
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
      .then(res => this.setState({ data: res.data }))
      .then(this.compareData)

  };

  compareData = () => {
    this.setState({showConflict: true})
  }

  handleConflictClose = () => {
    this.setState({showConflict: false})
  }

  showConflictModal = () => {
    return (
      <Modal style={{ top: '30%'}} show={this.state.showConflict} onHide={this.handleConflictClose} >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Info</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Please Refresh Page after Update</p>
        </Modal.Body>

      </Modal.Dialog>
      </Modal> )
  }

  getRentals = async () => {
    return await scFunctions.getRents();
  } 
  getDataBC = () => {
    this.getRentals().then((rentals) => {
      console.log(rentals)
      var lastIndex = rentals[0].length - 1
      for(let i = 0; i < rentals[0].length; i++){
        let currentProp = {
          status: rentals[0][lastIndex - i].toNumber(),
          location: web3.toUtf8(rentals[1][lastIndex- i]).replace(/\s+/g,''),
          company: web3.toUtf8(rentals[2][lastIndex - i]).replace(/\s+/g,''),
          price: rentals[3][lastIndex - i].toNumber(),
          start: rentals[4][lastIndex - i].toNumber(),
          end: rentals[5][lastIndex - i].toNumber(),
          help: "haha"
        }
        this.updateDB(currentProp)
      }
      this.getDataFromDb() 
    })
    
  }

  updateDB = (updateToApply) => {
    axios.post("http://localhost:3001/api/updateData", {
      update: updateToApply
    });
  };


/*
    scFunctions.scRent(prop, this.state.company);
    prop.status = 2; 
    this.updateDB(prop); 
*/

// this is gonna be handle rent property MODAL show, before submission. 
  handleRentProperty = prop =>{
    this.setState({show: true}); 
    this.setState({rentProperty: prop })

  }



  handleUpdateProperty = () => {
    this.getDataBC(); 
    console.log(this.state.data[4].rentee)
    console.log(this.state.data[4].company)
    console.log(this.state.data[4].status)
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
    let datez = moment(this.state.startDate).format('MMMDDYYYY');
    datez = parseInt(MonToNum(datez)) 
    this.state.rentProperty.start = datez
  }

  handleEndDateChange = date => {
    this.setState({
      endDate: date
    });
    let datez = moment(this.state.startDate).format('MMMDDYYYY');
    datez = parseInt(MonToNum(datez)) 
    this.state.rentProperty.end = datez

  }

  renderStatusButton = property => {
    if (property.status == 1){
      return <Button variant="danger"> Unavailable rented By Company {property.company} until {property.end} </Button>
    }
    else if (property.status == 2){
      return <Button variant="primary" onClick={()=>this.handleRentProperty(property)}> Processing by Rentee {property.rentee}</Button>
    }
    return <Button variant="success" onClick={()=>this.handleRentProperty(property)}> Rent Property </Button>
  }
  renderProperties = data => {
    var properties = []
    var propRow = []
    data.forEach((property,index) => {
      propRow.push(<Col xs={{ size:3, offset: .5}}> 
        <Jumbotron style = {{ 
          borderColor: "grey",
          borderStyle: 'solid',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20}}>
          <Image style= {{
                borderColor: "lightgrey",
                borderStyle: 'solid',
                width: 300,
                height: 250,
                overflow: "hidden"}}
            src={pathToImages(property.image)} fluid rounded />
          <b> {property.location} </b> 
          <h1> Price: {property.price} </h1> 
          <div> 
          {this.renderStatusButton(property)}
          </div>
        </Jumbotron> 
      </Col>)
      if((index+1)%3 == 0){ // if first in the row
        properties.push(<Row>{ propRow }</Row>)
        propRow = []
      }

    })
    return (
      <Container>
        {properties}
      </Container> 
    )
  }

  handleFirstName = e => {
    this.setState({ firstName: e.target.value })
  }

  handleLastName = e => {
    this.setState({ lastName: e.target.value })
  }
  showModal = () => {
    return (
        <Modal style={{ top: '30%'}} show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton style={{backgroundImage: 'url(https://www.pictorem.com/collection/900_1994202HighRes.jpg)'}}>
            <Container >
                  {this.state.rentProperty.location} 
            </Container> 
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit = {this.handleRentSubmit} >
                   <Row style={{ paddingBottom:"10px" }}> 
                    <Col> 
                      <b> First Name </b> 
                      <Form.Control style={{ width:"178px" }} type="text" onChange={this.handleFirstName} />
                    </Col>
                    <Col>
                      <b> Last Name </b> 
                      <Form.Control style={{ width:"178px" }} type="text" onChange={this.handleLastName} />
                    </Col> 
                  </Row>
                  <Row> 
                    <Col style={{ justifyContent: 'center'}}> 
                      <b> Start Date </b> 
                      <DatePicker
                        dateFormat="MMMM d, yyyy"
                        selected={this.state.startDate}
                        onChange={this.handleStartDateChange}
                      />
                    </Col>
                    <Col style={{ justifyContent: 'center'}}>  
                      <b> End Date </b> 
                      <DatePicker
                        dateFormat="MMMM d, yyyy"
                        selected={this.state.endDate}
                        onChange={this.handleEndDateChange}
                      />
                    </Col>     
                  </Row> 
                  <Row>
                    <Col>  
                      {this.state.rentProperty.location}
                    </Col> 
                  </Row>
                  <input type="submit" value="BookAway" />
              </Form> 
          </Modal.Body>
        </Modal>)
  }

  render() {
    const { data } = this.state;
    const show = this.state.show;
    return (
      <div>
        {this.showModal()} 
        {this.showConflictModal()} 
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


        {this.renderProperties(data)} 

      <rentModal />; 

      </div>

    );
  }
}

export default App;