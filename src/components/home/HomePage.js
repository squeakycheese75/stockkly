// import React from "react";
import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
// import styles from "../common/Header.css";

// const HomePage = () => {
class HomePage extends Component {
  render() {
    // const { isAuthenticated, login, logout } = this.props.auth;
    // const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Jumbotron>
          <h4>Welcome to Stockkly</h4>

          <h6>
            A simple, mobile-friendly, wealth tracker for the modern portfolio.
          </h6>

          <ul>
            <li>
              {" "}
              Build you portfolio of Shares, Crypto, Funds, Fx and watch you
              wealth live.
            </li>
            <li>Or, add them to your watchlist to track to price.</li>
          </ul>

          <p>Stockkly Team</p>
          <p>
            <i>Coming soon.....</i> FX, more crypto, funds, derived data,
            historical charting
          </p>
          <b>
            * If you want to start tracking your wealth then you'll need to be
            logged in.{" "}
          </b>
        </Jumbotron>
      </div>
    );
  }
}

export default HomePage;
