import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import PropTypes from "prop-types";
// import { ButtonToolbar, OverlayTrigger, Tooltip, Toast } from "react-bootstrap";
// import { withRouter, Link } from "react-router-dom";

const TransactionTable = ({ transactions, onDeleteClick, errors = {} }) => {
  const options = {
    //   onRowClick: function(row) {
    //     history.push(`/product/${row.ticker}`);
    //   },
    noDataText: "Loading..."
  };
  const selectRowProp = {
    hideSelectColumn: true,
    mode: "checkbox",
    clickToSelect: true,
    bgColor: "rgb(178,214,225)"
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
        selectRow={selectRowProp}
        options={options}
      >
        <TableHeaderColumn
          width="10%"
          dataField="id"
          dataSort={true}
          columnClassName="bstable"
          // dataFormat={nameFormatter}
          dataAlign="left"
          editable={false}
        >
          #
        </TableHeaderColumn>
        <TableHeaderColumn
          width="15%"
          dataField="productName"
          isKey={true}
          dataSort={true}
          columnClassName="bstable"
          // dataFormat={nameFormatter}
          editable={false}
        >
          NAME
        </TableHeaderColumn>
        <TableHeaderColumn
          width="15%"
          dataField="type"
          dataSort={true}
          columnClassName="bstable"
          // dataFormat={nameFormatter}
          editable={false}
        >
          TYPE
        </TableHeaderColumn>
        <TableHeaderColumn
          width="10%"
          dataField="quantity"
          dataSort={true}
          columnClassName="bstable"
          // dataFormat={nameFormatter}
          dataAlign="right"
          editable={false}
        >
          QTY
        </TableHeaderColumn>
        <TableHeaderColumn
          width="10%"
          dataField="trandate"
          dataSort={true}
          columnClassName="bstable"
          // dataFormat={nameFormatter}
          editable={false}
        >
          trandate
        </TableHeaderColumn>

        <TableHeaderColumn
          width="10%"
          dataField="id"
          columnClassName="bstable"
          dataFormat={deleteFormatter}
          editable={false}
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
