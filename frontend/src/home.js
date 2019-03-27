import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App.js'
import ControlledCarousel from './carousel.js'
import NavBar from './navbar.js'
import OwnerSubmit from './ownerSubmit.js'
import ChangeListing from './changeListing.js'
import submitProperty from './submitProperty.js'

function AppRouter() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={ControlledCarousel} />
        <Route exact path="/rent" component={NavBar} />
        <Route exact path="/rent" component={App} />
        <Route exact path="/submitRent" component={NavBar} />
        <Route exact path="/submitRent" component={OwnerSubmit} />
        <Route exact path="/submitProperty" component={NavBar} />
        <Route exact path="/submitProperty" component={submitProperty} />
        <Route exact path="/change" component={NavBar} />
        <Route exact path="/change" component={ChangeListing} />
      </div>
    </Router>
  );
}

export default AppRouter;