import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { withRouter } from "react-router-dom";
import "./WatchListTable.css";
// import WatchListPage from "../WatchListPage";

function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
  return fieldValue < 0
    ? "td-column-price-down td-column-size"
    : "td-column-price-up td-column-size";
}

function priceFormatter(cell, row) {
  if (!cell) {
    return (
      `${row.symbol}` +
      parseFloat(row.price)
        .toFixed(2)
        .toLocaleString()
    );
  }
  return `${row.symbol}` + cell.toLocaleString();
}

function priceChangeFormatter(cell, row) {
  var movement = null;
  if (row.change == null) {
    return (
      <div>
        <ul>
          <li className="name">na</li>
        </ul>
      </div>
    );
  } else {
    movement = parseFloat(row.movement).toFixed(2);
  }

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
        <li className="details">({movement}%)</li>
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

class WatchListTable extends Component {
  removeItem = index => {
    this.props.onSubmit(index);
  };

  removeButton(cell) {
    return (
      <i
        className="mdc-icon-button material-icons md-12 orange600"
        onClick={() => this.removeItem(cell)}
      >
        {/* highlight_off */}
        delete
      </i>
    );
  }

  render() {
    const { data, history } = this.props;

    const options = {
      onRowClick: function(row) {
        history.push(`/product/${row.id}`);
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
        <BootstrapTable
          data={data}
          headerContainerClass="bstable"
          striped
          hover
          condensed
          bordered
          size="sm"
          version="4"
          selectRow={selectRowProp}
          options={options}
        >
          <TableHeaderColumn
            width="45%"
            dataField="ticker"
            isKey={true}
            dataSort={true}
            columnClassName="bstable"
            dataFormat={nameFormatter}
            editable={false}
          >
            NAME
          </TableHeaderColumn>
          <TableHeaderColumn
            width="25%"
            dataField="price"
            dataFormat={priceFormatter}
            dataSort={true}
            columnClassName="bstable bstable-header-bold"
            editable={false}
          >
            PRICE
          </TableHeaderColumn>
          <TableHeaderColumn
            width="25%"
            dataField="change"
            columnClassName={columnClassNameFormat}
            dataSort={true}
            dataFormat={priceChangeFormatter}
            editable={false}
          >
            CHANGE
          </TableHeaderColumn>
          <TableHeaderColumn
            width="5%"
            dataField="ticker"
            columnClassName="bstable bstable-icon"
            dataAlign="center"
            dataFormat={this.removeButton.bind(this)}
            editable={false}
          />
        </BootstrapTable>
      </div>
    );
  }
}
export default withRouter(WatchListTable);
