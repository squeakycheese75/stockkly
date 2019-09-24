import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import moment from "moment";
import { Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

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
    return (
      <>
        <LinkContainer to={"/transaction/" + cell}>
          <Nav.Link>
            <Button className="button" variant="outline-info" size="sm">
              Edit
            </Button>
          </Nav.Link>
        </LinkContainer>
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
          dataField="transtype"
          dataSort={true}
          columnClassName="bstable"
          dataAlign="left"
          editable={false}
        >
          Type
        </TableHeaderColumn>
        <TableHeaderColumn
          width="20%"
          dataField="details"
          dataSort={false}
          columnClassName="bstable"
          dataAlign="left"
        >
          Details
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
          dataField="transdate"
          dataSort={true}
          columnClassName="bstable"
          dataFormat={dateFormatter}
          dataAlign="right"
          editable={false}
        >
          Tran. Date
        </TableHeaderColumn>
        <TableHeaderColumn
          width="8"
          dataField="id"
          dataSort={true}
          columnClassName="bstable"
          dataFormat={idFormatter}
          dataAlign="left"
          editable={false}
        ></TableHeaderColumn>
        <TableHeaderColumn
          width="10"
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
