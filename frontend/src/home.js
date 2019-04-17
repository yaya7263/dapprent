import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App.js'
import ControlledCarousel from './carousel.js'
import NavBar from './navbar.js'
import OwnerSubmit from './ownerSubmit.js'
import ChangeListing from './changeListing.js'
import submitProperty from './submitProperty.js'
import deleteProperty from './deleteProperty.js'
import successInfo from './successInfo.js'
function AppRouter() {
  return (
    <Router >
      <div >
        <Route exact path="/" component={ControlledCarousel} />
        <div> 
          <Route exact path="/rent" component={NavBar} />
          <Route exact path="/rent" component={App} />
        </div>
        <Route exact path="/submitRent" component={()=>myImage("2")} />
        <Route exact path="/submitRent" component={NavBar} />
        <Route exact path="/submitRent" component={OwnerSubmit} />
        <div> 
          <Route exact path="/submitProperty" component={()=>myImage("3")} />
          <Route exact path="/submitProperty" component={NavBar} />
          <Route exact path="/submitProperty" component={submitProperty} />
        </div> 
        <Route exact path="/change" component={()=>myImage("1")} />
        <Route exact path="/change" component={NavBar} />
        <Route exact path="/change" component={ChangeListing} />
        <Route exact path="/delete" component={()=>myImage("4")} />
        <Route exact path="/delete" component={NavBar} />
        <Route exact path="/delete" component={deleteProperty} />
        <Route exact path="/successInfo" component={()=>myImage("8")} />
        <Route exact path="/successInfo" component={NavBar} />
        <Route exact path="/successInfo" component={successInfo} />
      </div>
    </Router>
  );
}
//       / <Route exact path="/successInfo" component={()=>myImage("3")} />


function myImage(myValue) {
  let height = window.innerHeight
  let width = window.innerWidth
  return (<img src={require("./images/redlantern/" + myValue + ".jpg")} style= {{position: 'absolute',objectFit:'cover',  height: height, width:width}} />)
}

export default AppRouter;