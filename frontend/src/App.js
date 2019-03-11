
import React, { Component } from "react";
import axios from "axios";
import './App.css';

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
      let interval = setInterval(this.getDataFromDb, 1000);
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


  handleRentProperty = prop =>{
    scFunctions.scRent(prop, this.state.company);
    console.log("Added transaction to smart Contract");  
    //updateStatus(prop._id, 1)
  }

  handleUpdateProperty = () => {
    scFunctions.getRents(); 
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

        <ul>
          {data.length <= 0
            ? "No Properties..."
            : data.map(dat => (
                <li key={data.location}>
                  <div className='rows' >
                   <div className='row' style={{ padding: "10px" }}> {this.figureOutStatus(dat.status)} </div>
                   <div className='row' style={{ padding: "10px" }}> {dat.location} </div>
                   <div className='row' style={{ padding: "10px" }}> {dat.rentee} </div>
                   <div className='row' style={{ padding: "10px" }}> {dat.company} </div>
                   <div className='row' style={{ padding: "10px" }}> {dat.price} </div>
                   <div className='row' style={{ padding: "10px" }}> {dat.start} </div>
                   <div className='row' style={{ padding: "10px" }}> {dat.end} </div>
                   <button onClick={() => this.handleRentProperty(dat)}> Rent Property </button>
                  </div>
                </li>
              ))}
        </ul>

      </div>
    );
  }
}

export default App;