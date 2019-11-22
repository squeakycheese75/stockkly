import React, { Component } from "react";
import { Alert, ButtonToolbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./ProductTable.css";

function msg() {
  return (
    <Alert size="sm">
      Woah, no results! Maybe a typo? Feel free to drop me an email to request a
      price you'd like!
    </Alert>
  );
}

class ProductTable extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  addItem(index) {
    console.log(index);
    this.props.onSubmit(index);
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
    const { data, history } = this.props;

    // row.total_change
    const options = {
      onRowClick: function(row) {
        history.push(`/product/${row.ticker.toString().toUpperCase()}`);
      },
      noDataText: msg()
    };
    const selectRowProps = {
      hideSelectColumn: true,
      mode: "checkbox",
      clickToSelect: true,
      bgColor: "rgb(178,214,225)"
    };

    return (
      <div className="searchtable">
        <BootstrapTable
          // ref="table"
          data={data}
          headerContainerClass="bstable bstable-header-bold"
          responsive
          striped
          bordered
          hover
          search
          pagination
          size="sm"
          version="4"
          options={options}
          selectRow={selectRowProps}
        >
          <TableHeaderColumn
            width="20%"
            dataField="displayTicker"
            isKey
            dataSort={true}
            columnClassName="bstable"
          >
            Ticker
          </TableHeaderColumn>
          <TableHeaderColumn
            width="20%"
            dataField="name"
            dataSort={true}
            columnClassName="bstable"
          >
            Name
          </TableHeaderColumn>
          <TableHeaderColumn
            width="20%"
            dataField="sector"
            dataSort={true}
            columnClassName="bstable"
          >
            Sector
          </TableHeaderColumn>
          <TableHeaderColumn
            width="20%"
            dataField="exchange"
            dataSort={true}
            columnClassName="bstable"
          >
            Exchange
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default withRouter(ProductTable);
