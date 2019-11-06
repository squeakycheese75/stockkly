import React from "react";
import Plotly from "plotly.js-basic-dist";
import PropTypes from "prop-types";

import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

const WalletChart = ({ chartData, profile, errors = {} }) => {
  var trace1 = {
    type: "bar",
    // mode: "lines",
    name: "Wealth Tracker",
    x: chartData.x,
    y: chartData.y,
    line: { color: "#428bca" }
  };

  return (
    <div>
      {/* <div className="container-fluid"></div> */}
      {!Array.isArray(chartData.x) || !chartData.x.length ? (
        "No Data"
      ) : (
        <Plot
          data={[trace1]}
          layout={{
            title: "£",
            height: 640
            // updatemenus: updatemenus
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
          config={{ displaylogo: false, showlegend: false }}
        />
      )}
    </div>
  );
};

WalletChart.propTypes = {
  chartData: PropTypes.object.isRequired,
  error: PropTypes.string
};

export default WalletChart;
