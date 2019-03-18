
import React, { Component } from "react";
import axios from "axios";
import './App.css';
import '../node_modules/jquery/dist/jquery.min.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';


const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));


const scFunctions = require("./Components/scFunctions"); 
class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      data: [],
      company: "Homeaway", 
      id: 0,
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null
    };
    this.handleCompanySubmit = this.handleCompanySubmit.bind(this);
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
    /*
    for(let i = 0; i < rentals[0].length(); i++){
      console.log(rentals.status[i].toNumber());
      console.log(web3.toAscii(rentals.location[i]));
      console.log(web3.toAscii(rentals.company[i]));
      console.log(rentals.price[i].toNumber());
      console.log(rentals.start[i].toNumber());
      console.log(rentals.end[i].toNumber());
    }
    */
  };


  updateDB = (updateToApply) => {
    axios.post("http://localhost:3001/api/updateData", {
      update: updateToApply
    });
  };

  handleRentProperty = prop =>{
    scFunctions.scRent(prop, this.state.company);
    console.log("Added transaction to smart Contract");
    prop.status = 2; 
    this.updateDB(prop); 
  }


  handleUpdateProperty = () => {
    this.getDataBC(); 
//db.inventory.find( { status: "D" } )
  }
    

/*
  updateStatus = (id, status) => {
    axios.post("http://localhost:3001/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };
  */

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


  render() {
    const { data } = this.state;
    return (
      <div>
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

      <div class="container"> 

        <table class="table table-striped table-hover table-condensed">
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
          {data.length <= 0
            ? "No Properties..."
            : data.map(dat => (
                <tr>
                   <td> {this.figureOutStatus(dat.status)} </td>
                   <td> {dat.location} </td>
                   <td> {dat.rentee} </td>
                   <td> {dat.company} </td>
                   <td> {dat.price} </td>
                   <td> {dat.start} </td>
                   <td> {dat.end} </td>
                   <td> <button onClick={() => this.handleRentProperty(dat)}> Rent Property </button> </td> 
                </tr>
              ))}
        </table> 
      </div> 




      </div>

    );
  }
}

export default App;