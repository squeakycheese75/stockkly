import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
// import ObjectId from "bson-objectid";

const TransactionTable = ({ transactions, onDeleteClick, errors = {} }) => {
  const options = {
    noDataText: ""
  };

  function deleteFormatter(cell, row) {
    return (
      <button
        className="btn btn-outline-danger"
        onClick={() => onDeleteClick(row)}
      >
        Delete
      </button>
    );
  }

  function idFormatter(cell, row) {
    // cell["_id"] = cell["_id"].toString();
    // JSON.stringify(cell["_id"]);
    // console.log(cell["$oid"].toString());
    // var userId = JSON.stringify(cell);
    // console.log(userId);
    return (
      <>
        <Link to={"/transaction/" + cell}>#{cell}</Link>
      </>
    );
  }

  function dateFormatter(cell) {
    if (!cell) {
      return "";
    }
    return `${moment(cell).format("Do MMM YYYY")}`;
  }

  return (
    <div>
      <BootstrapTable
        data={transactions}
        headerContainerClass="bstable"
        striped
        // hover
        condensed
        hover={false}
        bordered={false}
        size="sm"
        version="4"
        options={options}
      >
        <TableHeaderColumn
          width="10%"
          dataField="id"
          dataSort={true}
          columnClassName="bstable"
          dataFormat={idFormatter}
          dataAlign="left"
          editable={false}
        ></TableHeaderColumn>
        <TableHeaderColumn
          width="15%"
          dataField="productName"
          isKey={true}
          dataSort={true}
          columnClassName="bstable"
          dataAlign="left"
          editable={false}
        >
          Name
        </TableHeaderColumn>
        <TableHeaderColumn
          width="15%"
          dataField="type"
          dataSort={true}
          columnClassName="bstable"
          dataAlign="left"
          editable={false}
        >
          Type
        </TableHeaderColumn>
        <TableHeaderColumn
          width="10%"
          dataField="quantity"
          dataSort={true}
          columnClassName="bstable"
          dataAlign="right"
          editable={false}
        >
          Qty
        </TableHeaderColumn>
        <TableHeaderColumn
          width="10%"
          dataField="trandate"
          dataSort={true}
          columnClassName="bstable"
          dataFormat={dateFormatter}
          dataAlign="right"
          editable={false}
        >
          Tran. Date
        </TableHeaderColumn>

        <TableHeaderColumn
          width="10%"
          dataField="id"
          columnClassName="bstable"
          dataFormat={deleteFormatter}
          editable={false}
          dataAlign="center"
        ></TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

TransactionTable.propTypes = {
  transactions: PropTypes.array.isRequired,
  errors: PropTypes.object,
  onDeleteClick: PropTypes.func.isRequired
};

export default TransactionTable;
