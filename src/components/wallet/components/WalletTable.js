import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { withRouter } from "react-router-dom";
import "./WalletTable.css";

function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
  return fieldValue < 0
    ? "td-column-price-down td-column-size"
    : "td-column-price-up td-column-size";
}

function priceFormatter(cell, row) {
  return row.spot === 1 ? (
    `${row.symbol}` + cell.toFixed(2).toLocaleString()
  ) : (
    <div>
      <ul>
        <li className="name">
          {row.symbol}
          {cell.toFixed(2).toLocaleString()}
        </li>
        <li className="details">({row.spot.toFixed(2)})</li>
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
          {cell.toFixed(2).toLocaleString()}
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
        <li className="details">
          ({row.movement.toFixed(2).toLocaleString()}%)
        </li>
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
    const { data, settings, history } = this.props;
    // const { data, history } = this.props;

    const openFormatterTotal = (cell, row) => {
      return (
        <div>
          <ul>
            <li className="name">
              {`${settings.symbol}` +
                cell.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </li>
            {row.total_change > 0 ? (
              <li className="details up">
                {`(` + row.total_change.toFixed(2).toLocaleString() + `)`}
              </li>
            ) : (
              <li className="details down">
                {`(` + row.total_change.toFixed(2).toLocaleString() + `)`}
              </li>
            )}
          </ul>
        </div>
      );
      // openFormatterTotal
    };

    // row.total_change
    const options = {
      onRowClick: function(row) {
        history.push(`/product/${row.ticker}`);
      },
      noDataText: "Loading..."
    };
    const selectRowProp = {
      hideSelectColumn: true,
      mode: "checkbox",
      clickToSelect: true,
      bgColor: "rgb(178,214,225)"
    };

    return (
      <div>
        {/* Portfolio */}
        <BootstrapTable
          data={data}
          striped
          hover
          condensed
          bordered
          size="sm"
          version="4"
          headerContainerClass="bstable"
          selectRow={selectRowProp}
          options={options}
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
            width="20%"
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
            width="20%"
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

export default withRouter(WalletTable);
