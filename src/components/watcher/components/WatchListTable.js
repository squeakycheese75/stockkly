import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { ButtonToolbar, OverlayTrigger, Tooltip, Toast } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import "./WatchListTable.css";

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
          {cell.toFixed(2)}
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
        <li className="name">{row.displayTicker}</li>
        <li className="details">{row.name}</li>
      </ul>
    </div>
  );
}

// function iconFormatter() {
//   function handleClick(e) {
//     e.preventDefault();
//     console.log("The link was clicked.");
//   }

//   return (
//     <i
//       className="mdc-icon-button material-icons md-12 orange600"
//       // onClick={() => this.removeItem(cell)}
//       onClick={handleClick}
//     >
//       {/* highlight_off */}
//       delete
//     </i>
//   );
// }

// function handleClick(e) {
//   e.preventDefault();
//   console.log("The link was clicked.");
// }

class WatchListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: "dummy",
      showToast: false
    };
  }

  removeItem = event => {
    // event.preventDefault();
    this.props.onSubmit(event);
    this.setState({ pid: event, showToast: true });
  };

  removeButton(cell) {
    return (
      <ButtonToolbar>
        <OverlayTrigger
          key="top"
          placement="top"
          overlay={<Tooltip id={`tooltip-top`}>Remove from watchlist.</Tooltip>}
        >
          {/* <Link to={`/product/${cell}`}> */}
          <i
            className="mdc-icon-button material-icons md-12 orange600"
            onClick={() => this.removeItem(cell)}
          >
            {/* highlight_off */}
            delete
          </i>
          {/* </Link> */}
        </OverlayTrigger>
      </ButtonToolbar>
    );
  }

  viewProductHelp(cell, row) {
    return (
      <ButtonToolbar>
        <OverlayTrigger
          key="top"
          placement="top"
          overlay={<Tooltip id={`tooltip-top`}>Details</Tooltip>}
        >
          <Link to={`/product/${cell.toString().toUpperCase()}`}>
            <i className="mdc-icon-button material-icons md-12 orange600">
              view_headline
            </i>
          </Link>
        </OverlayTrigger>
      </ButtonToolbar>
    );
  }

  render() {
    // const { data, history } = this.props;
    const { data } = this.props;
    const { showToast } = this.state;
    // const { pid } = this.state;

    const handleClose = () => this.setState({ showToast: false });

    const options = {
      // onRowClick: function(row) {
      //   history.push(`/product/${row.id}`);
      // },
      // onRowClick: this.removeButton.bind(this),
      // onRowClick: this.onSelectedRow.bind(this),
      noDataText: "Loading..."
    };
    // const selectRowProp = {
    //   hideSelectColumn: true,
    //   mode: "checkbox",
    //   clickToSelect: true,
    //   bgColor: "rgb(178,214,225)"
    // };

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
          // selectRow={selectRowProp}
          options={options}
        >
          <TableHeaderColumn
            width="25%"
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
            dataAlign="right"
          >
            PRICE
          </TableHeaderColumn>
          <TableHeaderColumn
            width="25%"
            dataField="change"
            columnClassName={columnClassNameFormat}
            dataSort={true}
            dataAlign="right"
            dataFormat={priceChangeFormatter}
            editable={false}
          >
            CHANGE
          </TableHeaderColumn>
          <TableHeaderColumn width="4%" />
          <TableHeaderColumn
            width="8%"
            dataField="ticker"
            columnClassName="bstable bstable-icon"
            dataAlign="center"
            dataFormat={this.viewProductHelp.bind(this)}
          />
          <TableHeaderColumn
            width="8%"
            dataField="ticker"
            columnClassName="bstable bstable-icon"
            dataAlign="center"
            dataFormat={this.removeButton.bind(this)}
            editable={false}
          />
        </BootstrapTable>
        <Toast
          onClose={handleClose}
          show={showToast}
          delay={3000}
          autohide
          style={{
            position: "absolute",
            bottom: 100,
            right: 25
          }}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Stockkly</strong>
            {/* <small>11 mins ago</small> */}
          </Toast.Header>
          <Toast.Body>Removed {this.state.pid} from watchList!</Toast.Body>
        </Toast>
      </div>
    );
  }
}
export default withRouter(WatchListTable);
