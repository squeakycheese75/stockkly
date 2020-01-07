import React from "react";
import { css } from "@emotion/core";
// First way to import
import { ScaleLoader } from "react-spinners";
// Another way to import
// import ClipLoader from "react-spinners/ClipLoader";
// import styles from "./Loading.css";
import { Helmet } from "react-helmet";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
      //   color: "#000000"
      // css: {}
    };
  }
  render() {
    return (
      <div className="sweet-loading">
        <Helmet>
          <title>Stockkly Wealth tracker - Transactions</title>
          <meta
            name="description"
            content="Tracking your wealth live with stockkly, build you portfolio from Stocks, Funds, Crypto, Fx, Gold, Silver and composite prices."
          />
        </Helmet>
        <ScaleLoader
          css={override}
          sizeUnit={"px"}
          size={300}
          color={"#428BCA"}
          loading={this.state.loading}
        />
        {/* <Spinner animation="border" variant="primary" /> */}
      </div>
    );
  }
}

export default Loading;
