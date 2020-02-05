import React from "react";
import { Jumbotron, Container, Carousel, Row, Col } from "react-bootstrap";
import styles from "./Splash.css";
import stockkly_wallet_img from "./stockkly_wallet.jpg";
import stockkly_price_img from "./stockkly_price.jpg";
import stockkly_watchlist_img from "./stockkly_watchlist.jpg";

const Splash = () => {
  return (
    <div className="jumboheader" styles={styles}>
      <Jumbotron>
        <Container>
          <Carousel>
            <Carousel.Item>
              <Row>
                <Col xs={10} md={4}>
                  <img
                    className="card-img-top"
                    src={stockkly_wallet_img}
                    alt="Watch your portfolio live"
                  />
                </Col>
                <Col xs={12} md={8}>
                  <div className="card-body">
                    <h4 className="card-title font-weight-bold">
                      Track your portfolio value in near real-time!
                    </h4>
                    {/* <p className="card-text"> */}
                    <ul>
                      Add shares (FTSE, NASDAQ), Crypto, Gold, Silver,
                      composites (FAANG)
                    </ul>
                    <ul>
                      Supports valuations in <b>EUR</b>, <b>USD</b> or{" "}
                      <b>GBP</b>.
                    </ul>
                    <ul>
                      Includes up-to-date forex prices, so you can get a single
                      valuation in the currency of you choice.
                    </ul>
                    {/* </p> */}
                  </div>
                </Col>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row>
                <Col xs={10} md={4}>
                  <img
                    className="card-img-top"
                    src={stockkly_watchlist_img}
                    alt="Build a watchlist of your favourites."
                  />
                </Col>
                <Col xs={12} md={8}>
                  <div className="card-body">
                    <h4 className="card-title font-weight-bold">
                      Build a watchlist of your favourites to keep an eye on
                      them.
                    </h4>
                    <ul>
                      Keep an eye on your favorites before you decide to add
                      them to your portfolio.
                    </ul>
                    <ul>
                      Ever increasing list of Shares, Crypto, Gold, Silver,
                      composites to watch.
                    </ul>
                  </div>
                </Col>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <div className="container-fluid">
                <Row>
                  <Col xs={10} md={4}>
                    <img
                      className="card-img-top"
                      src={stockkly_price_img}
                      alt="Dig into your prices."
                    />
                  </Col>
                  <Col xs={12} md={8}>
                    <div>
                      <h4 class="card-title font-weight-bold">
                        Dig into prices!
                      </h4>
                      <ul>
                        Keep an eye on your favorite shares, crypto, etc. before
                        you decide to add them to your portfolio.
                      </ul>
                      <ul>
                        Comprehensive list of Shares, Crypto, Gold, Silver,
                        composites to watch.
                      </ul>
                    </div>
                  </Col>
                </Row>
              </div>
            </Carousel.Item>
          </Carousel>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Splash;
