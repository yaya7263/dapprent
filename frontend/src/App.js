
import React, { Component } from "react";
import axios from "axios";
import './App.css';
//import '../node_modules/jquery/dist/jquery.min.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import { MonToNum, MonToStr } from './Components/monthConvert.js'
import "react-datepicker/dist/react-datepicker.css";
import { Jumbotron, Modal, Row, Col, Form, Container, Image,  Button, Breadcrumb, BreadcrumbItem } from 'react-bootstrap/dist/react-bootstrap.js'
import { scRent } from "./Components/scFunctions";

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
      company: "Vrbo", 
      id: 0,
      message: null,
      intervalIsSet: false,
      intervalIsSet2: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
      rentProperty:"ANaRKH",
      startDate: new Date(),
      endDate: new Date(),
      myStart: 4202019,
      myEnd: 4202019,
      firstName: "Spira",
      showConflict: false,
      showProcessing: false,
      searchVal: null,
      showSearch: false, 
      lastName: "Spera",
      processing: [],
      successful: [],
      unsuccessful: [],
      rentMessage: "empty",
      currentIndex: 0,
      searchProps: null
    };
    this.handleCompanySubmit = this.handleCompanySubmit.bind(this);

  }

  handleRentSubmit = event => {
    event.preventDefault(); 
    let myProp = this.state.rentProperty
    myProp.rentee = this.state.firstName + this.state.lastName
    myProp.status = 2;
    myProp.thisCompany = 1;
    myProp.success = 1;
    this.setState({ processing: [...this.state.processing, myProp.location] }) // add location to processing 
    axios.post("http://localhost:3001/api/updateLocal", {
      update: myProp
    }).then(res => {
      if (res.data.success){
        this.setState({rentMessage: "Please wait while your rent is being processed. ~15 seconds"},
          () => // brings up the modal after setting the message
            this.setState({showConflict: true})
        )
        scRent(myProp, this.state.company, 1) 
      }
      else{
        this.setState({rentMessage: "We are sorry. The property is not avail for rent"}, 
          ()=>
            this.setState({showConflict: true})
        ) 
        
      }
    }
    );
    this.handleClose()
    /*
    this.state.rentProperty.rentee = this.state.firstName + this.state.lastName
    this.state.rentProperty.status = 1;  

    //so first send it to blockchain with status " rented" , then set current state of property o
    scFunctions.scRent(this.state.rentProperty, this.state.company)
    let rentSubmitProp = this.state.rentProperty
    rentSubmitProp.status = 2; 
    this.updateDB(rentSubmitProp)
   
   // this.state.processing.push(this.state.rentProperty.location)
    this.handleClose()
    */
  }



  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataBC, 5000);
      let interval2 = setInterval(this.getDataFromDb, 5000);
      this.setState({ intervalIsSet: interval, intervalIsSet2: interval2 });
    }
  }


  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      clearInterval(this.state.intervalIsSet2);
      this.setState({ intervalIsSet: null, intervalIsSet2: null });
    }
  }

  getDataFromDb = () => {
    fetch("http://localhost:3001/api/property")
      .then(property => property.json())
      .then(res => this.setState({ data: res.data }))

  };



  handleConflictClose = () => {
    this.setState({showConflict: false})
  }

  showProcessingModal = () => {
    return (
      <Modal style={{ top: '30%'}} show={this.state.showProcessing} onHide={()=> this.setState({showProcessing: false})} >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.firstName} {this.state.lastName}: </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h2> refreshing or switching pages removes this status info.. </h2> 
          <h1> Processing </h1> 
          <p>{this.state.processing}</p>
          <h1> Successful </h1> 
          <p>{this.state.successful}</p>
          <h1> Unsuccessful </h1> 
          <p>{this.state.unsuccessful}</p>
        </Modal.Body>

      </Modal.Dialog>
      </Modal> )
  }

  handleSelectChange = e => {
    this.setState({searchVal: e.target.value})
  }
  

  handleSearch = e => {
    e.preventDefault();
    let myVal = this.state.searchVal
    let searchAs = e.target.elements.searchAs.value
    if (myVal == "company"){
      axios.get("http://localhost:3001/api/search",     {headers: {
        "myoption" : myVal, 
        "mydata" : searchAs
      }
      }).then( myProp=>{
      let myData = () => {
          if (myProp.length === 0) 
          return (
            <Breadcrumb>
              <BreadcrumbItem active>No Result</BreadcrumbItem>
            </Breadcrumb>
          )
          else {
          var results = myProp.map(myProp1 => <BreadcrumbItem> {myProp1.location} </BreadcrumbItem> )
          return (    
            <Breadcrumb>
              {results}
            </Breadcrumb>
         )
      }
        }
        this.setState({searchProps: myData})
      })

    }
    else if(myVal == "rentee") {
      axios.get("http://localhost:3001/api/search",     {headers: {
        "myoption" : myVal,
        "mydata" : searchAs
      }
      }).then( myProp =>{
        this.setState({searchProps: myProp.data.data[0].location}, () => console.log(this.state.searchProps))
      })

    }
  
    else if (myVal =="location"){
      axios.get("http://localhost:3001/api/search",     {headers: {
        "myoption" : myVal,
        "mydata" : searchAs
      }
      }).then( myProp=> {
        //console.log(myProp.data.data)
        this.setState({searchProps: myProp.data.data.rentee}, () => console.log(this.state.searchProps))
      })
  }
  }

  showSearchModal = () => {
    return (
      <Modal style={{ top: '30%'}} show={this.state.showSearch} onHide={()=> this.setState({showSearch: false})} >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.firstName} {this.state.lastName}: </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={e=> this.handleSearch(e)}>
            <Form.Group>
              <Form.Label>Search by ... </Form.Label>
              <Form.Control as="select" onChange={this.handleSelectChange}>
                <option>...</option>
                <option value="rentee">Rentee</option>
                <option value="company">Company</option>
                <option value="location">Location</option>
              </Form.Control>
              <Form.Control
                        id="searchAs"
                        type="text"
                        placeholder="Search as"
              />
              <Button type="submit" style={{position:"relative", top:10, right:-90}}> Search </Button>
              <div style={{left:50}}> {this.state.searchProps} </div>
            </Form.Group>
          </Form>
        </Modal.Body>

      </Modal.Dialog>
      </Modal> )
  }


  showConflictModal = () => {
    return (
      <Modal style={{ top: '30%'}} show={this.state.showConflict} onHide={this.handleConflictClose} >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Rent</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{this.state.rentMessage}</p>
        </Modal.Body>

      </Modal.Dialog>
      </Modal> )
  }

  getRentals = async () => {
    return await scFunctions.getRents(this.state.currentIndex);
  } 
  getDataBC = () => {
    this.getRentals().then(async (rentals) => {
      var returnLength = rentals[0].length
      this.setState({currentIndex: this.state.currentIndex + returnLength})
      for(let i = 0; i < rentals[0].length; i++){
        let currentProp = {
          status: rentals[0][i].toNumber(),
          location: web3.toUtf8(rentals[1][i]).replace(/\s+/g,''),
          company: web3.toUtf8(rentals[2][i]).replace(/\s+/g,''),
          price: rentals[3][i].toNumber(),
          start: rentals[4][i].toNumber(),
          end: rentals[5][i].toNumber(),
          help: "haha",
          success: 0
        }

        // Processing is a notification center for current component and whether or not transactions succeeded
        if (currentProp.status == 1) {
          let index = this.state.processing.indexOf(currentProp.location) // check if in record books
          if (index > -1) { // not gonna do anything if not in record
            console.log(this.state.processing[index])
            console.log(index)
            this.setState({ processing: this.state.processing.splice(index+1,1)}, ()=> console.log(this.state.processing[index])) // remove from list so not rerun
            if (this.state.company == currentProp.company) {   
              this.setState({successful: [...this.state.successful, currentProp.location]})
            }
            else {
              this.setState({unsuccessful: [...this.state.unsuccessful, currentProp.location]})
            }
          }
        }
        if (currentProp.status == 6) { //delete
          await axios.delete("http://localhost:3001/api/delete", {
              data: {property: currentProp} 
          })
        }
        if (currentProp.status == 5) { //add, would only be created if not in database
          currentProp.status = 0; 
          currentProp.image  = "./images/99.jpg"
          if (currentProp.company == "All" || currentProp.company == this.state.company){
            await axios.post("http://localhost:3001/api/property", {
            property: currentProp
            }) 
          } 
        }
        if (currentProp.status == 4) { //change
          currentProp.status = 1
          await axios.post("http://localhost:3001/api/changeData", {
            update: currentProp
          })
        }
        if (currentProp.status == 3) { //cancel
          currentProp.status = 0
          await axios.post("http://localhost:3001/api/changeData", {
            update: currentProp
          })
        }
        if (currentProp.status == 1) {
          if (this.state.company == currentProp.company) {
            currentProp.success = 3
          } else {
            currentProp.success = 2
          }
          await axios.post("http://localhost:3001/api/updateData", {
            update: currentProp
          });
        }

    //    await this.updateDB(currentProp)
       // this.getDataFromDb() 
      }
    })
    
  }

  updateDB = (updateToApply) => {
    axios.post("http://localhost:3001/api/updateData", {
      update: updateToApply
    });
  };


/*
    scFunctions. (prop, this.state.company);
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
    let datez = moment(date).format('MMMDDYYYY');
    datez = parseInt(MonToNum(datez)) 
    var rentProperty1 = {...this.state.rentProperty}
    rentProperty1.start = datez
    this.setState({rentProperty: rentProperty1})
  }

  handleEndDateChange = date => {
    this.setState({
      endDate: date
    });
    let datez = moment(date).format('MMMDDYYYY');
    datez = parseInt(MonToNum(datez)) 
    var rentProperty1 = {...this.state.rentProperty}
    rentProperty1.end = datez
    this.setState({rentProperty: rentProperty1})
  
  }

  toMonth = (myProp) =>{

  }

  renderStatusButton = property => {
    if (property.status == 1){
      return <Button variant="danger"> Unavailable rented By Company {property.company} until {MonToStr(property.end)} </Button>
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
      propRow.push(<Col md={{ size:3, offset: 0.5}}> 
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
    if (propRow.length == 1){ // need to fill out the mpties
      propRow.push(<Col md={{ size:3, offset: 0.5}}></Col>)
      propRow.push(<Col md={{ size:3, offset: 0.5}}></Col>)
    } 
    if (propRow.length == 2){
      propRow.push(<Col md={{ size:3, offset: 0.5}}></Col>)
    } 
    properties.push(<Row>{ propRow }</Row>) // any remaining props
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
          <Modal.Header closeButton style={{backgroundImage: 'url(https://media1.tenor.com/images/318cab8d6fecd9181284239fffadf69e/tenor.gif?itemid=12316453)'}}>
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
    //const { data } = this.state;
    const show = this.state.show;
    return (
      <div style={{backgroundImage: 'url(' + require('./images/redlantern/5.jpg') + ')'}}>
        <Button onClick={()=>this.setState({showSearch: true})} style={{position: 'absolute', right:0, top:90}}> Search </Button>
        {this.showProcessingModal()}
        {this.showSearchModal()}
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
          <h1 style={{color:'grey'}}> <b>{this.state.company} </b></h1> 
        </div>
        <div>
          <button 
            onClick={() =>
              this.handleUpdateProperty() 
            }>
            Update Properties 
          </button>
        </div> 


        {this.renderProperties(this.state.data)} 

      <rentModal />; 

      </div>

    );
  }
}

export default App;