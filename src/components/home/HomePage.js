import React from "react";
import HowToWallet from "../common/HowToWallet";
import HomeHeader from "./common/HomeHeader";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Stockkly wealth tracker</title>
        <meta
          name="description"
          content="Tracking your wealth live with stockkly, build you portfolio from Stocks, Funds, Crypto, Fx, Gold, Silver and composite prices."
        />
      </Helmet>
      <HomeHeader />
      <HowToWallet />
    </div>
  );
};

export default HomePage;
