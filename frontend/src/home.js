import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App.js'
import ControlledCarousel from './carousel.js'

function AppRouter() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={ControlledCarousel} />
        <Route exact path="/rent" component={App} />
      </div>
    </Router>
  );
}

export default AppRouter;