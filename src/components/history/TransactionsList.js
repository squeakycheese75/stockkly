import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TransactionList = ({ transactions, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Product</th>
        <th>Type</th>
        <th>Quantity</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {transactions.map(trans => {
        return (
          <tr key={trans.id}>
            <td>
              <a
                className="btn btn-light"
                href={"http://pluralsight.com/courses/" + trans.slug}
              >
                Watch
              </a>
            </td>
            <td>
              <Link to={"/transaction/" + trans.slug}>{trans.title}</Link>
            </td>
            <td>{trans.productName}</td>
            <td>{trans.type}</td>
            <td>{trans.quantity}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(trans)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default TransactionList;
