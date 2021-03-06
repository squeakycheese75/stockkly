import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./WatchBar.css";
import { Collapse, Card } from "reactstrap";

function changeFormatter(change, movement) {
  return (
    <>
      {change >= 0 ? (
        <>
          <div className="up_watchbar move">
            {" "}
            <i className="material-icons vertical-align-middle up_watchbar">
              arrow_drop_up
            </i>
            {parseFloat(change).toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
            {/* {" "}
            ( +
            {parseFloat(movement).toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
            %) */}
          </div>
        </>
      ) : (
        <>
          <div className="down_watchbar move">
            {" "}
            <i className="material-icons vertical-align-middle down_watchbar">
              arrow_drop_down
            </i>
            {parseFloat(Math.abs(change)).toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
            {/* {" "}
            (
            {parseFloat(movement).toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
            %) */}
          </div>
        </>
      )}
    </>
  );
}

function priceFormatter(price, symbol) {
  return (
    <>
      {symbol}
      {parseFloat(price).toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}
    </>
  );
}

const WatchBar = ({ prices, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }}>
        Toggle
      </Button> */}

      <button
        className="btn btn-link"
        // onClick={() => setOpen(!open)}
        onClick={toggle}
      >
        {isOpen ? (
          <i className="material-icons">arrow_drop_up</i>
        ) : (
          <i className="material-icons">arrow_drop_down_circle</i>
        )}
      </button>

      <Collapse isOpen={isOpen}>
        <Card>
          {/* <CardBody> */}
          <div id="example-collapse-text">
            <div className="d-flex justify-content-center" style={styles}>
              <div className="d-flex flex-row w-100">
                {prices.map(p => (
                  <div
                    className="flex-column w-25"
                    key={"watchbaritem-" + p.ticker}
                  >
                    <h3 className="text-center">
                      <table align="center">
                        <tbody>
                          <tr>
                            <td colSpan="2" className="name-large ticker">
                              {p.displayTicker}
                            </td>
                          </tr>
                          <tr className="price">
                            <td className="pl2">
                              {priceFormatter(p.price, p.symbol)}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {changeFormatter(
                                parseFloat(p.change),
                                parseFloat(p.movement)
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* </CardBody> */}
        </Card>
      </Collapse>
    </div>
  );
};

// const WatchBar = ({ prices, error }) => {
//   const [open, setOpen] = useState(false);

//   return prices && prices.length > 0 ? (
//     <div>
//       <button
//         className="btn btn-link float-right"
//         onClick={() => setOpen(!open)}
//       >
//         {open ? (
//           <i className="material-icons">arrow_drop_up</i>
//         ) : (
//           <i className="material-icons">arrow_drop_down_circle</i>
//         )}
//       </button>
//       {/* <Button
//         className="float-right"
//         color="primary"
//         onClick={() => setOpen(!open)}
//         size="sm"
//         // style={{ marginBottom: "1rem" }}
//       >
//         {open ? (
//           <i className="material-icons">arrow_drop_up</i>
//         ) : (
//           <i className="material-icons">arrow_drop_down_circle</i>
//         )}
//       </Button> */}
//       <Collapse in={open}>
//         <div id="example-collapse-text">
//           <div className="d-flex justify-content-center" style={styles}>
//             <div className="d-flex flex-row w-100">
//               {prices.map(p => (
//                 <div
//                   className="flex-column w-25"
//                   key={"watchbaritem-" + p.ticker}
//                 >
//                   <h3 className="text-center">
//                     <table align="center">
//                       <tbody>
//                         <tr>
//                           <td colSpan="2" className="name-large ticker">
//                             {p.displayTicker}
//                           </td>
//                         </tr>
//                         <tr className="price">
//                           <td className="pl2">
//                             {priceFormatter(p.price, p.symbol)}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td>
//                             {changeFormatter(
//                               parseFloat(p.change),
//                               parseFloat(p.movement)
//                             )}
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </h3>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </Collapse>
//     </div>
//   ) : null;
// };

WatchBar.propTypes = {
  prices: PropTypes.array.isRequired,
  error: PropTypes.string
};

export default WatchBar;
