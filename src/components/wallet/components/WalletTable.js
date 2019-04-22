import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "./WalletTable.css";

function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
  return fieldValue < 0
    ? "td-column-price-down td-column-size"
    : "td-column-price-up td-column-size";
}

function openFormatter(cell, row) {
  return `${row.symbol}` + cell.toLocaleString();
}

function openFormatterTotal(cell, row) {
  return `${portfolioCcySymbol}` + cell.toLocaleString();
}

function priceChangeFormatter(cell, row) {
  return (
    <div>
      <ul>
        <li className="name">
          {cell}
          {cell > 0 ? (
            <i className="material-icons vertical-align-middle">
              arrow_drop_up
            </i>
          ) : (
            <i className="material-icons vertical-align-middle">
              arrow_drop_down
            </i>
          )}
        </li>
        <li className="details">({row.movement}%)</li>
      </ul>
    </div>
  );
}

function nameFormatter(cell, row) {
  return (
    <div>
      <ul>
        <li className="name">{row.ticker}</li>
        <li className="details">{row.name}</li>
      </ul>
    </div>
  );
}

const portfolioCcySymbol = "£";

class WalletTable extends React.Component {
  render() {
    const { data } = this.props;
    // const { portfolioCcySymbol} = "£";

    return (
      <div>
        <BootstrapTable
          data={data}
          striped
          hover
          condensed
          bordered
          size="sm"
          version="4"
          headerContainerClass="bstable"
        >
          <TableHeaderColumn
            isKey={true}
            width="10%"
            dataField="ticker"
            columnClassName="bstable"
            dataFormat={nameFormatter}
            dataSort={true}
          >
            TICKER
          </TableHeaderColumn>
          <TableHeaderColumn
            width="10%"
            dataField="total"
            dataAlign="center"
            columnClassName="bstable  bstable-header-bold"
            dataSort={true}
            dataFormat={openFormatterTotal}
          >
            TOTAL
          </TableHeaderColumn>
          <TableHeaderColumn
            width="10%"
            dataField="qty"
            dataAlign="center"
            columnClassName="bstable"
            dataSort={true}
          >
            QUANTITY
          </TableHeaderColumn>
          <TableHeaderColumn
            width="10%"
            dataField="price"
            dataAlign="center"
            columnClassName="bstable"
            dataSort={true}
            dataFormat={openFormatter}
          >
            PRICE
          </TableHeaderColumn>
          {/* <TableHeaderColumn
            width="10%"
            dataField="spot"
            dataAlign="center"
            columnClassName="bstable"
            dataSort={true}
          >
            SPOT
          </TableHeaderColumn> */}
          <TableHeaderColumn
            width="10%"
            dataField="change"
            dataAlign="center"
            columnClassName={columnClassNameFormat}
            dataFormat={priceChangeFormatter}
            dataSort={true}
          >
            CHANGE
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default WalletTable;
