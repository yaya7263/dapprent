import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Carousel,  Button } from 'react-bootstrap/dist/react-bootstrap.js'

//help from https://react-bootstrap.github.io/components/carousel/
class ControlledCarousel extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            index: 0,
            direction: null,
        };
    }

    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction,
        });
    }
    outerCarousel = {
        position: "absolute",
        left: 50
    }

    /*
                      <Carousel.Caption style={{ top: '45%'}}>
            <Button
         	style = {{
            width: 300,
            height: 100, 
            opacity: 0.5,
            borderColor: "white",
            borderStyle: 'solid',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            left: 200
        }}
    rounded > 
    <Link to="/rent">
        <h1 style={{ color: 'lightblue' }}> BookAway </h1> 
    </Link> 
</Button>
<h3><i> Book your dream vacation today </i> </h3> 
</Carousel.Caption>
*/

    render() {
        const { index, direction } = this.state;

        return (
    <div> 
      <Carousel
        activeIndex={index}
        direction={direction}
        onSelect={this.handleSelect}
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("./images/nancy.jpg")}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("./images/nancy2.jpg")}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("./images/pokemon.gif")}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <div style={{position: "absolute", textAlign: "center", top: "50%", left:"35%"}}> 
         <Button
         	    style = {{
                          width: 300,
                          height: 100, 
                          opacity: 0.5,
                          borderColor: "white",
                          borderStyle: 'solid',
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                          borderBottomRightRadius: 20,
                          borderBottomLeftRadius: 20,
                          left: 200
                      }}
        rounded > 
        <Link to="/rent">
            <h1 style={{ color: 'lightblue' }}> BookAway </h1> 
        </Link> 
        </Button>
        <h3 style={{ color: 'lightblue' }}><i> Book your dream vacation today </i> </h3> 
    </div> 
    </div> 
    );
  }
}


export default ControlledCarousel; 