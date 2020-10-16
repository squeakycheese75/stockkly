import React from "react";
import { Helmet } from 'react-helmet'
import HowToWallet from "../components/common/HowToWallet";
import HowToWatchlist from "../components/common/HowToWatchlist";

const UserGuide = () => {
  return (
    <div>
      <Helmet>
        <title>Stockkly wealth tracker - User Guide</title>
        <meta name="description" content="A free, real-time, wealth-tracker that lets you track your portfolio of Stocks, Funds, Crypto, Fx, Gold, Silver and composites (FAANG)!" />
      </Helmet>
      <HowToWallet />
      <HowToWatchlist />
    </div>
  );
};

export default UserGuide;
