import React from "react";
import { Jumbotron, Container, Carousel } from "react-bootstrap";
import styles from "./Splash.css";
import stockkly_wallet_path from "./stockkly_wallet.png";
import stockkly_price_path from "./stockkly_price.png";

const Splash = () => {
  return (
    <div className="jumboheader" styles={styles}>
      <Jumbotron>
        <Container>
          <Carousel>
            <Carousel.Item>
              <div className="d-block w-100">
                <img
                  className="d-block w-25"
                  src={stockkly_wallet_path}
                  alt="First slide"
                />
                <div className="d-block w-75">
                  <p>Some text</p>
                </div>
              </div>

              <Carousel.Caption>
                <div className="d-block w-75">
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-25"
                src={stockkly_price_path}
                alt="First slide"
              />
              <Carousel.Caption color="#black;">
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Splash;
