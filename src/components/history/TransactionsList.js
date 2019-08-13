import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TransactionList = ({ transactions }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Product</th>
        <th>Category</th>
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
              <Link to={"/course/" + trans.slug}>{trans.title}</Link>
            </td>
            <td>{trans.productName}</td>
            <td>{trans.category}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired
};

export default TransactionList;
