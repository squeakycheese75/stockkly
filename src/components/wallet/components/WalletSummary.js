import React from "react";
import { Jumbotron } from "react-bootstrap";
import "./WalletSummary.css";

const portfolioCcySymbol = "£";

// function avg(data, key) {
//   return data.reduce((a, b) => a + (b[key] || 0), 0);
// }

function sum(data, key) {
  return data.reduce((a, b) => a + (b[key] || 0), 0);
}

function totalFormatter(cell) {
  return `${portfolioCcySymbol}` + cell.toLocaleString();
}

// function priceChangeFormatter(cell, row) {
//   return (
//     <div>
//       <ul>
//         <li className="name">
//           {cell}
//           {cell > 0 ? (
//             <i className="material-icons vertical-align-middle">
//               arrow_drop_up
//             </i>
//           ) : (
//             <i className="material-icons vertical-align-middle">
//               arrow_drop_down
//             </i>
//           )}
//         </li>
//         <li className="details">({row.movement}%)</li>
//       </ul>
//     </div>
//   );
// }

class WalletSummary extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <Jumbotron>
        <h1 className="text-center"> {totalFormatter(sum(data, "total"))}</h1>
      </Jumbotron>
    );
  }
}

export default WalletSummary;
