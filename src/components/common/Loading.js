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

const seo = {
  title: "Stockkly wealth tracker",
  description:
    "A free, real-time, wealth tracker that lets you track a portfolio of Stocks, Funds, Crypto, Fx, Gold, Silver and composites (FAANG) live!",
  url: "https://stockkly.com/",
  image: "https://stockkly.com/images/stockkly.png"
};

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
        <Helmet
          title={seo.title}
          meta={[
            {
              name: "description",
              property: "og:description",
              content: seo.description
            },
            { property: "og:title", content: seo.title },
            { property: "og:url", content: seo.url },
            { property: "og:image", content: seo.image },
            { property: "og:image:type", content: "image/png" },
            { property: "twitter:image:src", content: seo.image },
            { property: "twitter:title", content: seo.title },
            { property: "twitter:description", content: seo.description }
          ]}
        />
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
