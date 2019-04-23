import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "./WalletTable.css";

function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
  return fieldValue < 0
    ? "td-column-price-down td-column-size"
    : "td-column-price-up td-column-size";
}

function priceFormatter(cell, row) {
  return row.spot === 1 ? (
    `${row.symbol}` + cell.toLocaleString()
  ) : (
    <div>
      <ul>
        <li className="name">
          {row.symbol}
          {cell.toLocaleString()}
        </li>
        <li className="details">({row.spot})</li>
      </ul>
    </div>
  );
}

function qtyFormatter(cell, row) {
  return cell.toFixed(2).toLocaleString();
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

class WalletTable extends React.Component {
  render() {
    const { data, settings } = this.props;

    const openFormatterTotal = (cell, row) => {
      return `${settings.symbol}` + cell.toLocaleString();
    };

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
            width="25%"
            dataField="ticker"
            columnClassName="bstable"
            dataFormat={nameFormatter}
            dataSort={true}
          >
            TICKER
          </TableHeaderColumn>
          <TableHeaderColumn
            width="10%"
            dataField="qty"
            dataAlign="right"
            columnClassName="bstable"
            headerAlign="right"
            dataSort={true}
            dataFormat={qtyFormatter}
          >
            QTY
          </TableHeaderColumn>
          <TableHeaderColumn
            width="25%"
            dataField="price"
            dataAlign="right"
            columnClassName="bstable"
            headerAlign="right"
            dataSort={true}
            dataFormat={priceFormatter}
          >
            PRICE
          </TableHeaderColumn>
          <TableHeaderColumn
            width="25%"
            dataField="total"
            dataAlign="right"
            columnClassName="bstable bstable-header-bold"
            headerAlign="right"
            dataSort={true}
            dataFormat={openFormatterTotal}
          >
            TOTAL
          </TableHeaderColumn>
          <TableHeaderColumn
            width="15%"
            dataField="change"
            dataAlign="center"
            headerAlign="center"
            columnClassName={columnClassNameFormat}
            dataFormat={priceChangeFormatter}
            dataSort={true}
          />
        </BootstrapTable>
      </div>
    );
  }
}

export default WalletTable;
