import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App.js'
import ControlledCarousel from './carousel.js'
import NavBar from './navbar.js'
import OwnerSubmit from './ownerSubmit.js'
import ChangeListing from './changeListing.js'
import submitProperty from './submitProperty.js'
import deleteProperty from './deleteProperty.js'

function AppRouter() {
  return (
    <Router >
      <div >
        <Route exact path="/" component={ControlledCarousel} />
        <div> 
          <Route exact path="/rent" component={NavBar} />
          <Route exact path="/rent" component={App} />
        </div>
        <Route exact path="/submitRent" component={NavBar} />
        <Route exact path="/submitRent" component={OwnerSubmit} />
        <div> 
          <Route exact path="/submitProperty" component={myImage} />
          <Route exact path="/submitProperty" component={NavBar} />
          <Route exact path="/submitProperty" component={submitProperty} />
        </div> 
        <Route exact path="/change" component={NavBar} />
        <Route exact path="/change" component={ChangeListing} />
        <Route exact path="/delete" component={NavBar} />
        <Route exact path="/delete" component={deleteProperty} />
      </div>
    </Router>
  );
}



function myImage() {
  return (<img src={require("./images/redlantern/1.jpg")} style= {{position: 'absolute',  top: "0%", left:"0%", width:"100%"}} />)
}

export default AppRouter;