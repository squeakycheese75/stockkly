import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

function columnClassNameFormat(fieldValue) {
  return fieldValue < 0
    ? "td-column-price-down td-column-size bstable"
    : "td-column-price-up td-column-size bstable";
}

const TransactionHistory = props => {
  const options = {
    noDataText: "No data.."
  };
  return (
    <div>
      <BootstrapTable
        data={props.data}
        // responsive
        striped
        bordered
        hover
        headerContainerClass="bstable bstable-header-bold"
        size="sm"
        version="4"
        options={options}
      >
        <TableHeaderColumn
          dataField="id"
          isKey
          columnClassName="bstable"
          width="20%"
          hidden={true}
        >
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="transdate"
          columnClassName="bstable"
          dataSort={true}
          width="20%"
        >
          DATE
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="quantity"
          columnClassName={columnClassNameFormat}
          dataSort={true}
          width="20%"
        >
          QTY
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="price"
          dataSort={true}
          columnClassName="bstable"
          width="20%"
        >
          PRICE
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="transtype"
          dataSort={true}
          columnClassName="bstable"
          width="20%"
        >
          TYPE
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

export default TransactionHistory;
