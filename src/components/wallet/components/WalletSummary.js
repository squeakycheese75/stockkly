import React from "react";
import { Jumbotron } from "react-bootstrap";
import "./WalletSummary.css";

const portfolioCcySymbol = "£";

// function priceChangeFormatter(change, movement) {
//   return (
//     <div>
//       <ul>
//         {change > 0 ? (
//           <>
//             <li className="name up">
//               <i className="material-icons vertical-align-middle up">
//                 arrow_drop_up
//               </i>
//               {change.toLocaleString(undefined, { minimumFractionDigits: 2 })}
//             </li>
//           </>
//         ) : (
//           <>
//             <li className="name down2">
//               <i className="material-icons vertical-align-middle down">
//                 arrow_drop_down
//               </i>
//               {change.toLocaleString(undefined, { minimumFractionDigits: 2 })}
//             </li>
//           </>
//         )}
//         {/* <li className="details">({movement}%)</li> */}
//         {/* <li className="details" /> */}
//       </ul>
//     </div>
//   );
// }

function priceChangeFormatter2(change) {
  return (
    <>
      {change >= 0 ? (
        <>
          <div className="up2">
            <i className="material-icons vertical-align-middle up2">
              arrow_drop_up
            </i>
            {change.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </>
      ) : (
        <>
          <div className="down2">
            <i className="material-icons vertical-align-middle down2">
              arrow_drop_down
            </i>
            {change.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </>
      )}
    </>
  );
}

function sum(data, key) {
  return data.reduce((a, b) => a + (b[key] || 0), 0);
}

function totalFormatter(cell) {
  return (
    `${portfolioCcySymbol}` +
    cell.toLocaleString(undefined, { minimumFractionDigits: 2 })
  );
}

class WalletSummary extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <Jumbotron>
          <h1 className="text-center">
            <table align="center" className="summary">
              <tbody>
                <tr>
                  <td>{totalFormatter(sum(data, "total"))}</td>
                  <td>{priceChangeFormatter2(sum(data, "total_change"))}</td>
                </tr>
              </tbody>
            </table>
          </h1>
        </Jumbotron>
      </div>
    );
  }
}

export default WalletSummary;
