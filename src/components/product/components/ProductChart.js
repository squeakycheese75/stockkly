import React from "react";
// import Plot from "react-plotly.js";
import Plotly from "plotly.js-basic-dist";

import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

class ProductChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: this.props.productId,
      x: [],
      y: [],
      start_date: "2000-01-01",
      end_date: "2001-02-01",
      message: ""
    };
  }

  componentDidMount() {
    // this.loadProductChartData();
  }

  render() {
    const { x, y } = this.props;

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: this.state.pid + " Open",
      x: x,
      y: y,
      line: { color: "#428bca" }
    };

    // var updatemenus = [
    //   {
    //     buttons: [
    //       {
    //         args: ["type", "surface"],
    //         label: "3D Surface",
    //         method: "restyle"
    //       },
    //       {
    //         args: ["type", "heatmap"],
    //         label: "Heatmap",
    //         method: "restyle"
    //       }
    //     ],
    //     direction: "left",
    //     pad: { r: 10, t: 10 },
    //     showactive: true,
    //     type: "buttons",
    //     x: 0.1,
    //     xanchor: "left",
    //     y: 1.1,
    //     yanchor: "top"
    //   }
    // ];

    return (
      <div className="container-fluid">
        {!Array.isArray(x) || !x.length ? (
          "No Data"
        ) : (
          <Plot
            data={[trace1]}
            layout={{
              title: this.state.pid + " Chart 30 day",
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
  }
}

export default ProductChart;
