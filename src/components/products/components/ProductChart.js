import React from "react";
// import Plot from "react-plotly.js";
import Plotly from "plotly.js-basic-dist";
import PropTypes from "prop-types";

import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

const ProductChart = ({ chartData, errors = {} }) => {
  var trace1 = {
    type: "scatter",
    mode: "lines",
    name: chartData.pid + " Open",
    x: chartData.x,
    y: chartData.y,
    line: { color: "#428bca" }
  };

  return (
    <div className="container">
      {/* <div className="container-fluid"></div> */}
      {!Array.isArray(chartData.x) || !chartData.x.length ? (
        "No Data"
      ) : (
        <Plot
          data={[trace1]}
          layout={{
            title: chartData.pid + " Chart 30 day",
            height: 320
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

ProductChart.propTypes = {
  chartData: PropTypes.object.isRequired,
  error: PropTypes.string
};

export default ProductChart;
