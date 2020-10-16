import React from "react";
import { Helmet } from 'react-helmet'
import HomeHeader from "./common/HomeHeader";
import Splash from "./Splash";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Stockkly wealth tracker - Free, Real-Time, Wealth Tracker for the modern portfolio. (Crypto, Stocks, etc).</title>
        <meta name="description" content="A free, real-time, wealth-tracker that lets you track your portfolio of Stocks, Funds, Crypto, Fx, Gold, Silver and composites (FAANG)!" />
      </Helmet>
      <HomeHeader />
      <Splash />
    </div>
  );
};

export default HomePage;
