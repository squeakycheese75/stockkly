import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const data = [
  {
    id: 1,
    transtype: "Buy",
    quantity: 100,
    transdate: "01/01/2018",
    price: 1.15
  },
  {
    id: 2,
    transtype: "Sell",
    quantity: -50,
    transdate: "01/02/2018",
    price: 1.31
  }
];

function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
  return fieldValue < 0
    ? "td-column-price-down td-column-size bstable"
    : "td-column-price-up td-column-size bstable";
}

const TransactionHistory = props => {
  return (
    <div>
      <BootstrapTable
        data={data}
        // responsive
        striped
        bordered
        hover
        headerContainerClass="bstable bstable-header-bold"
        size="sm"
        version="4"
      >
        <TableHeaderColumn
          dataField="id"
          isKey
          columnClassName="bstable"
          width="20%"
        >
          Id
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="transdate"
          columnClassName="bstable"
          dataSort={true}
          width="20%"
        >
          Date
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="quantity"
          columnClassName={columnClassNameFormat}
          dataSort={true}
          width="20%"
        >
          Qty
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="price"
          dataSort={true}
          columnClassName="bstable"
          width="20%"
        >
          Price
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="transtype"
          dataSort={true}
          columnClassName="bstable"
          width="20%"
        >
          Type
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

export default TransactionHistory;
