import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import PropTypes from "prop-types";
import moment from "moment";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./ProductTransactionTable.css";

const ProductTransactionTable = ({
  transactions,
  onDeleteClick,
  errors = {}
}) => {
  const options = {
    noDataText: ""
  };

  function deleteFormatter(cell, row) {
    return (
      <button className="btn" onClick={() => onDeleteClick(row)}>
        <i className="material-icons vertical-align-middle">delete_outline</i>
      </button>
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

  //   function rowStyleFormat(row, rowIdx) {
  //     // return { backgroundColor: rowIdx % 2 === 0 ? "red" : "blue" };
  //     if (row.transtype === "BUY") {
  //       return { backgroundColor: "#f0f0f0" };
  //     }
  //     return { backgroundColor: "#f4e1d2" };
  //   }

  return (
    <div>
      <h6 className="block__title">Transactions</h6>
      <BootstrapTable
        data={transactions}
        headerContainerClass="bstable"
        striped
        condensed
        hover={false}
        bordered={true}
        size="sm"
        version="4"
        options={options}
        // trStyle={rowStyleFormat}
      >
        <TableHeaderColumn
          width="0%"
          dataField="productName"
          isKey={true}
          columnClassName="bstable"
          editable={false}
          hidden={true}
        >
          Name
        </TableHeaderColumn>
        <TableHeaderColumn
          width="14%"
          dataField="transdate"
          dataSort={true}
          columnClassName="bstable"
          dataFormat={dateFormatter}
          dataAlign="left"
          editable={false}
        >
          Date
        </TableHeaderColumn>
        <TableHeaderColumn
          width="10%"
          dataField="transtype"
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
          width="60%"
          dataField="details"
          dataSort={false}
          columnClassName="bstable"
          dataAlign="left"
        >
          Details
        </TableHeaderColumn>
        <TableHeaderColumn
          width="3%"
          dataField="id"
          dataSort={true}
          columnClassName="bstable"
          dataFormat={idFormatter}
          dataAlign="right"
          editable={false}
        ></TableHeaderColumn>
        <TableHeaderColumn
          width="3%"
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

ProductTransactionTable.propTypes = {
  transactions: PropTypes.array.isRequired,
  errors: PropTypes.object,
  onDeleteClick: PropTypes.func.isRequired
};

export default ProductTransactionTable;
