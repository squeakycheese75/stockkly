import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import PropTypes from "prop-types";
import moment from "moment";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const TransactionTable = ({ transactions, onDeleteClick, errors = {} }) => {
  const options = {
    noDataText: ""
  };

  function deleteFormatter(cell, row) {
    return (
      <button
        className="btn"
        // className="btn btn-outline-danger"

        onClick={() => onDeleteClick(row)}
      >
        <i className="material-icons vertical-align-middle">delete_outline</i>
      </button>
    );
  }

  function nameFormatter(cell, row) {
    return (
      <div>
        <ul>
          <li className="name">
            <Link to={`/product/${row.ticker.toString().toUpperCase()}`}>
              {row.ticker}
            </Link>
          </li>
          <li className="details">{row.productName}</li>
        </ul>
      </div>
    );
  }

  function idFormatter(cell, row) {
    return (
      <>
        <LinkContainer to={"/transaction/" + cell}>
          <Nav.Link>
            {/* <Button className="button" variant="outline-info" size="sm">
            <i className="material-icons vertical-align-middle">delete_forever</i>
            </Button> */}
            <i className="material-icons vertical-align-middle">edit</i>
          </Nav.Link>
        </LinkContainer>
      </>
    );
  }

  function dateFormatter(cell) {
    if (!cell) {
      return "";
    }
    return `${moment(cell).format("DD/MM/YYYY")}`;
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
          isKey={true}
          width="33%"
          dataField="ticker"
          columnClassName="bstable"
          dataAlign="left"
          dataFormat={nameFormatter}
          dataSort={true}
        >
          TICKER
        </TableHeaderColumn>
        <TableHeaderColumn
          width="15%"
          dataField="transtype"
          dataSort={true}
          columnClassName="bstable"
          dataAlign="right"
          editable={false}
        >
          Type
        </TableHeaderColumn>
        {/* <TableHeaderColumn
          width="40%"
          dataField="details"
          dataSort={false}
          columnClassName="bstable"
          dataAlign="left"
        >
          Details
        </TableHeaderColumn> */}
        <TableHeaderColumn
          width="20%"
          dataField="quantity"
          dataSort={true}
          columnClassName="bstable"
          dataAlign="right"
          editable={false}
        >
          Qty
        </TableHeaderColumn>
        <TableHeaderColumn
          width="20%"
          dataField="transdate"
          dataSort={true}
          columnClassName="bstable"
          dataFormat={dateFormatter}
          dataAlign="right"
          editable={false}
        >
          Date
        </TableHeaderColumn>
        <TableHeaderColumn
          width="6%"
          dataField="id"
          dataSort={true}
          columnClassName="bstable"
          dataFormat={idFormatter}
          dataAlign="right"
          editable={false}
        ></TableHeaderColumn>
        <TableHeaderColumn
          width="6%"
          dataField="id"
          columnClassName="bstable"
          dataFormat={deleteFormatter}
          editable={false}
          dataAlign="right"
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
