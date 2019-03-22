import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App.js'
import ControlledCarousel from './carousel.js'
import NavBar from './navbar.js'
import OwnerSubmit from './ownerSubmit.js'

function AppRouter() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={ControlledCarousel} />
        <Route exact path="/rent" component={NavBar} />
        <Route exact path="/rent" component={App} />
        <Route exact path="/submit" component={NavBar} />
        <Route exact path="/submit" component={OwnerSubmit} />
      </div>
    </Router>
  );
}

export default AppRouter;